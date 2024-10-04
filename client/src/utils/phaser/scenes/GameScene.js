import { Scene, Input, Display, Tilemap } from 'phaser';
import { ASSETS_KEYS, SCENE_KEYS, MAP_KEYS } from '../consts';
import { EventBus } from '../EventBus';

export class GameScene extends Scene {
  player;
  keys;
  map;

  constructor() {
    super(SCENE_KEYS.GAME);
  }

  preload() {
    this.load.image(MAP_KEYS.GRASS, 'tileset-example-room/GRASS TILE - DAY.png');
    this.load.image(MAP_KEYS.FENCE_ONE, 'tileset-example-room/FENCE 1 - DAY.png');
    this.load.image(MAP_KEYS.FENCE_TWO, 'tileset-example-room/FENCE 2 - DAY.png');
  }

  init() {}

  create() {
    this.add
      .rectangle(0, 0, 850, 600)
      .setOrigin(0)
      .setStrokeStyle(2, 0xff0000)
      .setFillStyle(0x000000, 0)
      .setDepth(1000);

    /*
        const json = this.cache.tilemap.get(ASSETS_KEYS.MAP);
    //const json = this.cache.tilemap.get(ASSETS_KEYS.MAP);
    this.map = this.make.tilemap({
      key: ASSETS_KEYS.MAP,
      tileWidth: json.data.tilewidth,
      tileHeight: json.data.tileheight,
      width: json.data.width,
      height: json.data.height,
    });

    const tilsetGrass = this.map.addTilesetImage(
      'GRASS TILE - DAY',
      MAP_KEYS.GRASS,
      16,
      16,
      0,
      0,
      1
    );

    const tilesetFrenceOTwo = this.map.addTilesetImage(
      'FENCE 2',
      MAP_KEYS.FENCE_TWO,
      16,
      16,
      0,
      0,
      2
    );
    // Create Grass Layer
    const grassData = json.data.layers[0].layers[0];
    const grassLayer = this.map.createBlankLayer(
      grassData.name,
      [tilsetGrass],
      grassData.x,
      grassData.y,
      grassData.width,
      grassData.height,
      16,
      16
    );
    grassLayer?.setData(grassData.data);
    grassLayer?.setVisible(true);

    // Create Ground Layer
    const groundData = json.data.layers[0].layers[1];
    const groundLayer = this.map.createBlankLayer(
      groundData.name,
      [tilesetFrenceOTwo],
      groundData.x,
      groundData.y,
      groundData.width,
      groundData.height,
      16,
      16
    );
    groundLayer?.setData(groundData.data);
    groundLayer?.setVisible(true);

    console.log({ groundLayer });

    // Create Grass Layer
    this.physics.enableUpdate();
    this.physics.world.setBounds(
      0,
      0,
      this.map.widthInPixels,
      this.map.heightInPixels
    );
    this.cameras.main.setBounds(
      0,
      0,
      this.map.widthInPixels,
      this.map.heightInPixels
    );


    // Player
    this.player = this.physics.add
      .sprite(100, 100, ASSETS_KEYS.PLAYER)
      .setCollideWorldBounds(true)
      .setScale(1);
    this.physics.add.collider(this.player, grassLayer);
    this.cameras.main.startFollow(this.player, true, 0.8, 0.8);

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

    const debugGraphics = this.add.graphics().setAlpha(0.7);
    this.map.renderDebug(debugGraphics, {
      tileColor: null,
      collidingTileColor: new Display.Color(243, 134, 48, 255),
      faceColor: new Display.Color(40, 39, 37, 255)
    });

    this.add.rectangle(0, 0, this.map.widthInPixels, this.map.heightInPixels)
      .setOrigin(0)
      .setStrokeStyle(2, 0xff0000)
      .setFillStyle(0x000000, 0)
      .setDepth(1000);

    // Este BUS DE phaser lo que hace es enviar una señal de que la Scena ya se ha iniciado
    // Te suscribes al evento y obtendras el estado actual de esta clase
    EventBus.emit(SCENE_KEYS.SCENE_READY, this);*/
  }

  update(time, delta) {
    const { keys } = this; //output: this.keys
    const speed = 100;
    // const previousVelocity = this.player.body.velocity.clone();

    // this.player.body.setVelocity(0);
  }
}
