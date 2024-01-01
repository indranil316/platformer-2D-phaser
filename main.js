import './src/styles/index.scss';
import Phaser from 'phaser';
import Preload from './src/scenes/Preload';
import PlayScene from './src/scenes/PlayScene';
import { size } from './src/constants';

const config = {
  type: Phaser.WEBGL,
  width: size.width,
  height: size.height,
  pixelArt: true,
  physics:{
    default: 'arcade'
  },
  scene: [Preload, PlayScene]
}

const game = new Phaser.Game(config);