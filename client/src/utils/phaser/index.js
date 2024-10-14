import { AUTO, Game } from 'phaser';
import { SCENE_MAX_HEIGHT, SCENE_MAX_WIDTH } from './consts';
import { PreloaderScene } from './scenes/PreloaderScene';
import { GameScene } from './scenes/GameScene';

const config = {
  type: AUTO,
  width: Math.min(window.innerWidth, SCENE_MAX_WIDTH),
  height: Math.min(window.innerHeight, SCENE_MAX_HEIGHT),
  backgroundColor: '#049cd8',
  parent: 'room',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
    },
  },
  input: {
    keyboard: true,
    mouse: true,
    touch: true,
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  pixelArt: true,
  scene: [PreloaderScene, GameScene],
};

/**
 * Con esta funcion se inicia Phaser
 * El parametro "parent" necesitas pasar el elemento html que contendra la escena
 */
const StartGame = parent => {
  return new Game({ ...config, parent });
};

export default StartGame;
