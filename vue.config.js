const path = require('path');//引入path模块
function resolve(dir) {
  return path.join(__dirname, dir)//path.join(__dirname)设置绝对路径
}

module.exports = {
  publicPath: "./",
  outputDir: "docs",
  css: {
    loaderOptions: {
      scss: {
        // @/ is an alias to src/
        // so this assumes you have a file named `src/variables.scss`
        //   prependData: `@import "./src/common/css/colorful.scss";@import "./src/common/css/reset.scss";`
      }
    }
  },
  chainWebpack: (config) => {
    config.resolve.alias
      //set第一个参数：设置的别名，第二个参数：设置的路径
      .set('@', resolve('./src'))
      .set('api', resolve('./src/api'))
      .set('assets', resolve('./src/assets'))
      .set('base', resolve('./src/base'))
      .set('common', resolve('./src/common'))
      .set('components', resolve('./src/components'))
      .set('router', resolve('./src/router'))
      .set('store', resolve('./src/store'))
      .set('views', resolve('./src/views'))
      .set('utils', resolve('./src/utils'))
      .set('testJSON', resolve('./src/testJSON'))
      .set('filter', resolve('./src/filter'))
      .set('icons', resolve('./src/icons'))
      .set('svg', resolve('./src/icons/svg'))
    config.module
      .rule('svg')
      .exclude.add(resolve('./src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('./src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
}
