import { Scene } from 'phaser';
import { SCENE_KEYS, ASSETS_KEYS } from '../consts';

export class PreloaderScene extends Scene {
  constructor() {
    // Aqui se define el ID / key de la escena
    // Es un string que se utiliza para identificar la escena
    super(SCENE_KEYS.PRELOADER);
  }

  preload() {
    // En esta funcion se agregan los assets necesarios para la escena
    this.load.setPath('/');
    this.load.image(ASSETS_KEYS.GRASS_IMG, 'room/images/GRASS TILE - DAY.png');
    this.load.image(ASSETS_KEYS.STAIR_IMG, 'room/images/STAIRS - DAY.png');
    this.load.image(
      ASSETS_KEYS.TERRAIN_SET3_IMG,
      'room/images/TERRAIN SET 3 - DAY.png'
    );
    this.load.image(ASSETS_KEYS.HOUSE_IMG, 'room/images/HOUSE 1 - DAY.png');
    this.load.tilemapTiledJSON(ASSETS_KEYS.MAP, 'room/room.json');
    /* 
    Ejemplo de como cargar un Sprite
    */
    this.load.spritesheet(ASSETS_KEYS.PLAYER, 'images/sprites/walk.png', {
      frameWidth: 80,
      frameHeight: 80,
      startFrame: 0,
    });
  }

  create() {
    // En esta funcion se define las funciones que tiene la escena

    // En este caso la escena "Preloader" sirve para precargar sprites una vez que termina
    // Se inicia la escena "Game"
    this.scene.start(SCENE_KEYS.GAME);
  }
}
