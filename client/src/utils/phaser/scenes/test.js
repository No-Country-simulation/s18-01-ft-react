import { Scene, Input, Display } from 'phaser';
import { ASSETS_KEYS, SCENE_KEYS, PLAYER_KEYS } from '../consts';
import { EventBus } from '../EventBus';
import { socket } from '../../functions/socket';

export class GameScene extends Scene {
  player;
  keys;
  idleFrame;
  otherPlayers;
  groundHouse;
  grassLayer;
  constructor() {
    super(SCENE_KEYS.GAME);
    this.idleFrame = {
      down: 23,
      left: 10,
      right: 2,
      up: 31,
    };
  }
  init() {
    this.scale.parentIsWindow = false;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    this.scale.scaleMode = 3;
    this.scale.refresh();
    this.otherPlayers = this.physics.add.group();
  }
  create() {
    const map = this.make.tilemap({ key: ASSETS_KEYS.MAP });
    const grassTs = map.addTilesetImage(
      ASSETS_KEYS.GRASS_TILE,
      ASSETS_KEYS.GRASS_IMG
    );
    const stairTs = map.addTilesetImage(
      ASSETS_KEYS.STAIR_TILE,
      ASSETS_KEYS.STAIR_IMG
    );
    const terrainSet3Ts = map.addTilesetImage(
      ASSETS_KEYS.TERRAIN_SET3_TILE,
      ASSETS_KEYS.TERRAIN_SET3_IMG
    );
    const houseTs = map.addTilesetImage(
      ASSETS_KEYS.HOUSE_TILE,
      ASSETS_KEYS.HOUSE_IMG
    );
    this.grassLayer = map.createLayer(ASSETS_KEYS.GRASS_LAYER, grassTs, 0, 0);
    this.groundHouse = map.createLayer(
      ASSETS_KEYS.GROUND_HOUSE_LAYER,
      [stairTs, terrainSet3Ts, houseTs],
      0,
      0
    );
    this.grassLayer.setCollisionByProperty({ collides: true });
    this.groundHouse.setCollisionByProperty({ collides: true });
    this.groundHouse.setCollisionFromCollisionGroup(true, false, terrainSet3Ts);
    this.groundHouse.setCollisionFromCollisionGroup(true, false, houseTs);
    socket.connect();
    socket.on('currentPlayers', function (players) {
      Object.keys(players).forEach(function (id) {
        if (players[id].playerId === socket.id) {
          console.log('Me ejecuto?');
          this.addPlayer(players[id]);
        } else {
          self.addOtherPlayers(players[id]);
        }
      });
    });
    socket.on('newPlayer', function (playerInfo) {
      this.addOtherPlayers(playerInfo);
    });
    socket.on('disconnectPlayer', function (playerId) {
      self.otherPlayers.getChildren().forEach(function (otherPlayer) {
        if (playerId === otherPlayer.playerId) {
          otherPlayer.destroy();
        }
      });
    });
    socket.on('playerMoved', function (playerInfo) {
      self.otherPlayers.getChildren().forEach(function (otherPlayer) {
        if (playerInfo.playerId === otherPlayer.playerId) {
          otherPlayer.setPosition(playerInfo.x, playerInfo.y);
        }
      });
    });
    this.physics.enableUpdate();
    this.physics.world.setBounds(0, 0, this.scale.width, this.scale.height);
    this.cameras.main.setBounds(0, 0, this.scale.width, this.scale.height);
    this.startAnim();
    const { LEFT, RIGHT, UP, DOWN, W, A, S, D } = Input.Keyboard.KeyCodes;
    this.keys = this.input.keyboard.addKeys({
      left: LEFT,
      right: RIGHT,
      up: UP,
      down: DOWN,
      w: W,
      a: A,
      s: S,
      d: D,
    });
    EventBus.emit(SCENE_KEYS.SCENE_READY, this);
  }
  startAnim() {
    this.anims.create({
      key: PLAYER_KEYS.WALK_TO_LEFT,
      frames: this.anims.generateFrameNumbers(ASSETS_KEYS.PLAYER, {
        frames: [10, 11, 12, 13, 14, 15, 8, 9],
      }),
      frameRate: 16,
      repeat: -1,
    });
    this.anims.create({
      key: PLAYER_KEYS.WALK_TO_RIGHT,
      frames: this.anims.generateFrameNumbers(ASSETS_KEYS.PLAYER, {
        frames: [2, 3, 4, 5, 6, 7, 0, 1],
      }),
      frameRate: 16,
      repeat: -1,
    });
    this.anims.create({
      key: PLAYER_KEYS.WALK_TO_DOWN,
      frames: this.anims.generateFrameNumbers(ASSETS_KEYS.PLAYER, {
        frames: [23, 16, 17, 18, 19, 20, 21, 22],
      }),
      frameRate: 16,
      repeat: -1,
    });
    this.anims.create({
      key: PLAYER_KEYS.WALK_TO_UP,
      frames: this.anims.generateFrameNumbers(ASSETS_KEYS.PLAYER, {
        frames: [31, 24, 25, 26, 27, 28, 29, 30],
      }),
      frameRate: 16,
      repeat: -1,
    });
  }
  update(time, delta) {
    const { keys } = this;
    const speed = 125;
    //const previousVelocity = this.player.body.velocity.clone();
    this.player.body.setVelocity(0);
    if (keys.left.isDown || keys.a.isDown) {
      this.player.body.setVelocityX(-speed);
      this.player.anims.play(PLAYER_KEYS.WALK_TO_LEFT, true);
    } else if (keys.right.isDown || keys.d.isDown) {
      this.player.body.setVelocityX(speed);
      this.player.anims.play(PLAYER_KEYS.WALK_TO_RIGHT, true);
    } else if (keys.up.isDown || keys.w.isDown) {
      this.player.body.setVelocityY(-speed);
      this.player.anims.play(PLAYER_KEYS.WALK_TO_UP, true);
    } else if (keys.down.isDown || keys.s.isDown) {
      this.player.body.setVelocityY(speed);
      this.player.anims.play(PLAYER_KEYS.WALK_TO_DOWN, true);
    } else {
      this.player.anims.stop();
    }
    this.player.body.velocity.normalize().scale(speed);
    // Emitir el movimiento del jugador
    const x = this.player.x;
    const y = this.player.y;
    if (
      this.player.oldPosition &&
      (x !== this.player.oldPosition.x || y !== this.player.oldPosition.y)
    ) {
      this.socket.emit('playerMovement', { x, y });
    }
    // Guardar la antigua posición
    this.player.oldPosition = {
      x: this.player.x,
      y: this.player.y,
    };
  }
  addPlayer(playerInfo) {
    console.log('Añado el player');
    this.player = this.physics.add
      .sprite(playerInfo.x, playerInfo.y, ASSETS_KEYS.PLAYER)
      .setOrigin(0, 1)
      .setCollideWorldBounds(true)
      .setGravityY(0)
      .setSize(15.5, 16)
      .setOffset(32.25, 32)
      .setScale(1.8, 1.8);

    this.physics.add.collider(this.player, this.grassLayer);
    this.physics.add.collider(this.player, this.groundHouse);
    this.cameras.main.startFollow(this.player, true, 0.8, 0.8);
    this.player.setFrame(this.idleFrame.down);
  }
  addOtherPlayers(playerInfo) {
    const otherPlayer = this.add
      .sprite(playerInfo.x, playerInfo.y, ASSETS_KEYS.PLAYER)
      .setOrigin(0, 1)
      .setCollideWorldBounds(true)
      .setGravityY(0)
      .setSize(15.5, 16)
      .setOffset(32.25, 32)
      .setScale(1.8, 1.8);
    otherPlayer.playerId = playerInfo.playerId;
    otherPlayer.setFrame(this.idleFrame.down);
    this.physics.add.collider(otherPlayer, this.grassLayer);
    this.physics.add.collider(otherPlayer, this.groundHouse);
    this.otherPlayers.add(otherPlayer);
  }
}
