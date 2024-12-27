import { pixiPipes } from '@assetpack/core/pixi'

export default {
  entry: './src/assets',
  output: './public/assets',
  pipes: [
    ...pixiPipes({
      // PixiJS configuration options
    })
  ]
}
