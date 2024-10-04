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

    /* 
       En esta funcion se define el "path" desde donde se sacaran los assets
        Por este motivo en los ejemplos hacia abajo se omite la ruta completa
       */
    this.load.setPath('/');
    this.load.tilemapTiledJSON(ASSETS_KEYS.MAP, 'example-room.json');

    /* 
        Ejemplo de como cargar un Sprite
        */
    this.load.spritesheet(ASSETS_KEYS.PLAYER, 'images/sprites/walk.png', {
      frameWidth: 25,
      frameHeight: 25,
      startFrame: 20,
    });
    this.cameras.main.setBackgroundColor(0x9900e3);

    /* 
        Ejemplo de como subir una imagen
        this.load.image(
          RetroRunnerMedia.FLOORGRASS_START,
          'scenery/overworld/floorgrassStart.png'
        );
        */

    /*
        Ejemplo de como subir un audio
        this.load.audio(RetroRunnerMedia.BIT_JUMP, 'sound/effects/bit-jump.mp3');
        */
  }

  create() {
    // En esta funcion se define las funciones que tiene la escena

    // En este caso la escena "Preloader" sirve para precargar sprites una vez que termina
    // Se inicia la escena "Game"
    this.scene.start(SCENE_KEYS.GAME);
  }
}
