declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}

declare module 'ant-design-vue/lib' {
  const antD: any;
  export default antD;
}

declare module 'vue-echarts/components/ECharts' {
  const ECharts: any;
  export default ECharts;
}
