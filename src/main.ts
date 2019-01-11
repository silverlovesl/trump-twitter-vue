import Vue from 'vue';
import App from './App.vue';
import router from './router';
import antD from 'ant-design-vue/lib';
import 'ant-design-vue/dist/antd.css';
import { sync } from 'vuex-router-sync';
import { store } from './store';

Vue.config.productionTip = false;
//Echart===============================================================
import ECharts from 'vue-echarts/components/ECharts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/gauge';
import 'echarts/lib/chart/custom';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/markLine';
import 'echarts/lib/component/markPoint';
import 'echarts/lib/component/timeline';
import 'echarts/lib/theme/dark';
import 'echarts/lib/util/symbol';
require('echarts-wordcloud');

Vue.component('v-chart', ECharts);
Vue.use(antD);

sync(store, router);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
