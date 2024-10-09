import { Scene, Input, Math } from 'phaser';
import { ASSETS_KEYS, SCENE_KEYS, PLAYER_KEYS } from '../consts';
import { SOCKET_URL } from '../../functions/socket';
import { io } from 'socket.io-client';
import { Joystick } from '../utils/joystick';

export class OfficeScene extends Scene {
  player;
  keys;
  map;
  background;
  idleFrame;
  otherPlayers;
  groundHouseLayer;
  grassLayer;
  socket;
  joystick;
  playerName;
  otherPlayerNames;

  constructor() {
    super(SCENE_KEYS.GAME);
    // El idleFrame son los frames del sprite que tiene que usar cuando esta quieto segun la direccion que mira
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
    this.otherPlayerNames = new Map();
    this.socket = io(SOCKET_URL, { autoConnect: true });
  }

  create() {
    console.log('HolA');
    this.joystick = new Joystick(this, 50);
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
    this.groundHouseLayer = map.createLayer(
      ASSETS_KEYS.GROUND_HOUSE_LAYER,
      [stairTs, terrainSet3Ts, houseTs],
      0,
      0
    );
    this.grassLayer.setScale(1);
    this.groundHouseLayer.setScale(1);
    this.grassLayer.setCollisionByProperty({ collides: true });
    this.groundHouseLayer.setCollisionByProperty({ collides: true });
    this.groundHouseLayer.setCollisionFromCollisionGroup(true, false, terrainSet3Ts);
    this.groundHouseLayer.setCollisionFromCollisionGroup(true, false, houseTs);
    this.setupSocketListeners();

    // Create Grass Layer
    this.physics.enableUpdate();
    this.physics.world.setBounds(0, 0, this.scale.width, this.scale.height);
    this.cameras.main.setBounds(0, 0, this.scale.width, this.scale.height);
    this.cameras.main.zoom = 1;
    this.createAnimations();
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
    // Actualiza la escala de la camara al redimensionar, ademas verifica el joystick
    this.scale.on('resize', this.resize, this);

    // Los eventos wheel y pinch, se utilizan para manejar el "zoom"
    this.input.on('wheel', (pointer, gameObjects, deltaX, deltaY, deltaZ) => {
      this.handleZoom(deltaY);
    });
    this.input.on('pinch', pinch => {
      // El factor de escala del pinch
      let scaleFactor = pinch.scaleFactor;
      // Convertir el factor de escala a un valor delta similar al de la rueda
      let delta = (1 - scaleFactor) * 200;
      this.handleZoom(delta);
    });
    //this.input.on('mousemove', this.onMouseMove.bind(this));

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

  handleZoom(delta) {
    let zoom = this.cameras.main.zoom;
    // Zoom in (acercar)
    if (delta > 0 && zoom < 1.75) {
      console.log('Acercando', zoom);
      this.cameras.main.zoom = Math.RoundTo(zoom + 0.05, -2);
    }
    // Zoom out (alejar)
    else if (delta < 0 && zoom > 1) {
      console.log('Alejando', zoom);
      this.cameras.main.zoom = Math.RoundTo(zoom - 0.05, -2);
    }
  }

  createAnimations() {
    const createAnim = (key, frames) => {
      this.anims.create({
        key,
        frames: this.anims.generateFrameNumbers(ASSETS_KEYS.PLAYER, { frames }),
        frameRate: 16,
        repeat: -1,
      });
    };

    createAnim(PLAYER_KEYS.WALK_TO_LEFT, [10, 11, 12, 13, 14, 15, 8, 9]);
    createAnim(PLAYER_KEYS.WALK_TO_RIGHT, [2, 3, 4, 5, 6, 7, 0, 1]);
    createAnim(PLAYER_KEYS.WALK_TO_DOWN, [23, 16, 17, 18, 19, 20, 21, 22]);
    createAnim(PLAYER_KEYS.WALK_TO_UP, [31, 24, 25, 26, 27, 28, 29, 30]);
  }

  setupSocketListeners() {
    this.socket.on('currentPlayers', players => {
      Object.keys(players).forEach(id => {
        if (players[id].playerId === this.socket.id) {
          this.createPlayer(players[id]);
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
          this.otherPlayerNames.get(playerId).destroy();
          this.otherPlayerNames.delete(playerId);
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
                otherPlayer.setFrame(this.idleFrame.left);
              } else if (playerInfo.prevMoveTo === 'right') {
                otherPlayer.setFrame(this.idleFrame.right);
              } else if (playerInfo.prevMoveTo === 'up') {
                otherPlayer.setFrame(this.idleFrame.up);
              } else if (playerInfo.prevMoveTo === 'down') {
                otherPlayer.setFrame(this.idleFrame.down);
              }
              break;
          }
          if (this.otherPlayerNames.has(playerInfo.playerId)) {
            this.otherPlayerNames
              .get(playerInfo.playerId)
              .setPosition(playerInfo.x, playerInfo.y);
          }
        }
      });
    });
  }

  createPlayer(playerInfo) {
    this.player = this.physics.add
      .sprite(playerInfo.x, playerInfo.y, ASSETS_KEYS.PLAYER)
      .setOrigin(0, 1)
      .setCollideWorldBounds(true)
      .setGravityY(0)
      .setSize(15.5, 16)
      .setOffset(32.25, 32)
      .setScale(1.8, 1.8);
    this.player.playerId = playerInfo.playerId;
    this.playerName = this.add
      .text(playerInfo.x, playerInfo.y, playerInfo.username, {
        font: '16px Arial',
        fill: '#ffffff',
        stroke: '#000000',
        strokeThickness: 4,
      })
      .setOrigin(-1.13, 2.5);

    this.physics.add.collider(this.player, this.grassLayer);
    this.physics.add.collider(this.player, this.groundHouseLayer);
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
    otherPlayer.setTint(playerInfo.color);
    const otherPlayerName = this.add
      .text(playerInfo.x, playerInfo.y, playerInfo.username, {
        font: '16px Arial',
        fill: '#ffffff',
        stroke: '#000000',
        strokeThickness: 4,
      })
      .setOrigin(-1.13, 2.5);
    otherPlayerName.playerId = playerInfo.playerId;
    otherPlayer.playerId = playerInfo.playerId;
    otherPlayer.setFrame(this.idleFrame.down);
    this.physics.add.collider(otherPlayer, this.grassLayer);
    this.physics.add.collider(otherPlayer, this.groundHouseLayer);
    this.otherPlayerNames.set(playerInfo.playerId, otherPlayerName);
    this.otherPlayers.add(otherPlayer);
  }

  onMouseMove() {
    if (
      this.touchAvailable &&
      !('ontouchstart' in window) &&
      navigator.maxTouchPoints === 0
    ) {
      this.joystick.destroy();
    } else {
      this.joystick.create(100, this.scale.height - 100);
    }
  }

  resize(gameSize) {
    if (this.cameras.main) {
      this.cameras.main.setViewport(0, 0, gameSize.width, gameSize.height);
    }
    if (this.player) {
      this.cameras.main.startFollow(this.player, true);
    }
    if (
      !!this.joystick &&
      (this.game.device.input.touch ||
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0)
    ) {
      this.joystick.create(100, this.scale.height - 100);
    } else {
      this.joystick.destroy();
    }
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
      } else {
        this.playerName.x = this.player.x;
        this.playerName.y = this.player.y;
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
  shutdown() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }

    if (this.joystick) {
      this.joystick.destroy();
      this.joystick = null;
    }

    if (this.player) {
      this.player.destroy();
      this.player = null;
    }

    if (this.player) {
      this.player.destroy();
      this.player = null;
    }

    if (this.playerName) {
      this.playerName.destroy();
      this.playerName = null;
    }

    if (this.otherPlayers) {
      this.otherPlayers.clear(true, true);
      this.otherPlayers.destroy();
      this.otherPlayers = null;
    }

    if (this.otherPlayerNames) {
      this.otherPlayerNames.forEach((value, key) => {
        if (value && typeof value.destroy === 'function') {
          value.destroy();
        }
      });
      this.otherPlayerNames.clear();
      this.otherPlayerNames = null;
    }
    // Eliminar todos los eventos de escena
    this.events.removeAllListeners();
  }
}
