module.exports = {
  productionSourceMap: false,
  configureWebpack: {
    entry: ['./src/main.ts'],
  },
  transpileDependencies: [/\bvue-echarts\b/, /\bresize-detector\b/],
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/assets/style/app.scss";
          @import "@/assets/style/_global.scss";
        `,
      },
    },
  },
};
