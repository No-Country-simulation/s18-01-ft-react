import { Scene, Input } from 'phaser';
import { ASSETS_KEYS, SCENE_KEYS, PLAYER_KEYS } from '../consts';
import { SOCKET_URL } from '../../functions/socket';
import { io } from 'socket.io-client';
import { Joystick } from '../utils/joystick';

export class GameScene extends Scene {
  player;
  keys;
  map;
  background;
  idleFrame;
  otherPlayers;
  groundHouse;
  grassLayer;
  socket;
  joystick;

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
    /*this.background = this.add.tileSprite(
      0,
      0,
      this.scale.width,
      this.scale.height,
      ASSETS_KEYS.BACKGROUND
    );
    this.background.setOrigin(0, 0).setScale(1);
    */
    this.scale.parentIsWindow = false;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    this.scale.scaleMode = 3;
    this.scale.refresh();
    this.otherPlayers = this.physics.add.group();
    this.socket = io(SOCKET_URL, { autoConnect: true });
  }

  create() {
    /*const render = this.textures.get(ASSETS_KEYS.BACKGROUND).getSourceImage();
    const backgroundScale = calcBackgroundScale({
      bgWidth: render.width,
      bgHeight: render.height,
      scaleWidth: this.scale.width,
      scaleHeight: this.scale.height,
    });
    this.background.setScale(backgroundScale).setScrollFactor(0);*/

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
    if (this.game.device.input.touch) {
      this.joystick = new Joystick(this, 100, this.scale.height - 100, 50);
    }
    this.setupSocketListeners();

    // Create Grass Layer
    this.physics.enableUpdate();
    this.physics.world.setBounds(0, 0, this.scale.width, this.scale.height);
    this.cameras.main.setBounds(0, 0, this.scale.width, this.scale.height);

    /* 
    this.player = this.physics.add
      .sprite(350, 500, ASSETS_KEYS.PLAYER)
      .setOrigin(0, 1)
      .setCollideWorldBounds(true)
      .setGravityY(0)
      .setSize(15.5, 16)
      .setOffset(32.25, 32)
      .setScale(1.8, 1.8);
    // TINTE: Con este se "tinta" el sprite para cambiarlo de color
    //this.player.setTint(0xff0000);
    this.cameras.main.startFollow(this.player, true, 0.8, 0.8);
    this.player.setFrame(this.idleFrame.down);
        this.physics.add.collider(this.player, this.grassLayer);
    this.physics.add.collider(this.player, this.groundHouse);
    //this.physics.add.collider(this.player, this.background);
    */

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
    // Modd DEBUG
    /* 
    // Habilitar debug para el mundo
    this.physics.world.createDebugGraphic();
    const debugGraphics = this.add.graphics().setAlpha(0.7);
     groundHouse.renderDebug(debugGraphics, {
      tileColor: null,
      collidingTileColor: new Display.Color(243, 134, 48, 255),
      faceColor: new Display.Color(40, 39, 37, 255),
    });

    // Habilitar debug para el jugador
    this.player.setDebug(true, true, 0x00ff00);

    // Habilitar debug para el groundLayer
    
    groundLayer.renderDebug(debugGraphics, {
      tileColor: null,
      collidingTileColor: new Display.Color(243, 134, 48, 255),
      faceColor: new Display.Color(40, 39, 37, 255),
    });
    */
    // EventBus.emit(SCENE_KEYS.SCENE_READY, this);
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

  setupSocketListeners() {
    this.socket.on('currentPlayers', players => {
      Object.keys(players).forEach(id => {
        if (players[id].playerId === this.socket.id) {
          this.addPlayer(players[id]);
        } else {
          this.addOtherPlayers(players[id]);
        }
      });
    });

    this.socket.on('newPlayer', playerInfo => {
      this.addOtherPlayers(playerInfo);
    });

    this.socket.on('disconnectPlayer', playerId => {
      this.otherPlayers.getChildren().forEach(otherPlayer => {
        if (playerId === otherPlayer.playerId) {
          otherPlayer.destroy();
        }
      });
    });

    this.socket.on('playerMoved', playerInfo => {
      this.otherPlayers.getChildren().forEach(otherPlayer => {
        if (playerInfo.playerId === otherPlayer.playerId) {
          otherPlayer.setPosition(playerInfo.x, playerInfo.y);
          switch (playerInfo.lastMoveTo) {
            case 'left':
              otherPlayer.anims.play(PLAYER_KEYS.WALK_TO_LEFT, true);
              break;
            case 'right':
              otherPlayer.anims.play(PLAYER_KEYS.WALK_TO_RIGHT, true);
              break;
            case 'up':
              otherPlayer.anims.play(PLAYER_KEYS.WALK_TO_UP, true);
              break;
            case 'down':
              otherPlayer.anims.play(PLAYER_KEYS.WALK_TO_DOWN, true);
              break;
            default:
              otherPlayer.anims.stop();
              if (playerInfo.prevMoveTo === 'left') {
                this.player.setFrame(this.idleFrame.left);
              } else if (playerInfo.prevMoveTo === 'right') {
                this.player.setFrame(this.idleFrame.right);
              } else if (playerInfo.prevMoveTo === 'up') {
                this.player.setFrame(this.idleFrame.up);
              } else if (playerInfo.prevMoveTo === 'down') {
                this.player.setFrame(this.idleFrame.down);
              }
          }
        }
      });
    });
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
    const otherPlayer = this.physics.add
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

  update(time, delta) {
    if (this.player) {
      const { keys } = this; //output: this.keys
      const speed = 125;
      const previousVelocity = this.player.body.velocity.clone();
      let moved = false;
      let direction = '';

      this.player.body.setVelocity(0);

      if (keys.left.isDown || keys.a.isDown || this.joystick?.isMovingLeft()) {
        //walk to left
        this.player.body.setVelocityX(-speed);
        this.player.anims.play(PLAYER_KEYS.WALK_TO_LEFT, true);
        moved = true;
        direction = 'left';
      } else if (
        keys.right.isDown ||
        keys.d.isDown ||
        this.joystick?.isMovingRight()
      ) {
        //walk to right
        this.player.body.setVelocityX(speed);
        this.player.anims.play(PLAYER_KEYS.WALK_TO_RIGHT, true);
        moved = true;
        direction = 'right';
      } else if (keys.up.isDown || keys.w.isDown || this.joystick?.isMovingUp()) {
        //walk to up
        this.player.body.setVelocityY(-speed);
        this.player.anims.play(PLAYER_KEYS.WALK_TO_UP, true);
        moved = true;
        direction = 'up';
      } else if (
        keys.down.isDown ||
        keys.s.isDown ||
        this.joystick?.isMovingDown()
      ) {
        //walk to down
        this.player.body.setVelocityY(speed);
        this.player.anims.play(PLAYER_KEYS.WALK_TO_DOWN, true);
        moved = true;
        direction = 'down';
      }
      this.player.body.velocity.normalize().scale(speed);
      if (!moved) {
        this.player.anims.stop();
      }

      // Emitir el movimiento del jugador
      const x = this.player.x;
      const y = this.player.y;
      if (
        this.player.oldPosition &&
        (x !== this.player.oldPosition.x ||
          y !== this.player.oldPosition.y ||
          direction !== this.player.oldPosition.direction)
      ) {
        this.socket.emit('playerMovement', {
          x,
          y,
          direction,
          prevDirection: this.player.oldPosition.direction,
        });
      }

      // Guardar la antigua posición
      this.player.oldPosition = {
        x: this.player.x,
        y: this.player.y,
        direction: direction,
      };

      if (this.player.body.velocity.x === 0 && this.player.body.velocity.y === 0) {
        if (previousVelocity.x < 0) {
          this.player.setFrame(this.idleFrame.left);
        } else if (previousVelocity.x > 0) {
          this.player.setFrame(this.idleFrame.right);
        } else if (previousVelocity.y < 0) {
          this.player.setFrame(this.idleFrame.up);
        } else if (previousVelocity.y > 0) {
          this.player.setFrame(this.idleFrame.down);
        }
      }
    }
  }
}
