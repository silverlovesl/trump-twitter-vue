<template>
  <div class="tw-home">
    <a-row :gutter="8">
      <a-col :span="8">
        <a-card title="年度別Twitter数" :loading="isLoading" :bodyStyle="cardBody">
          <v-chart :options="annualTwitterCountChartOptions" :auto-resize="true"/>
        </a-card>
      </a-col>
      <a-col :span="16">
        <a-card title="月度別Twitter数" :loading="isLoading" :bodyStyle="cardBody">
          <v-chart :options="monthlyTwitterCountChartOptions" :auto-resize="true"/>
        </a-card>
      </a-col>
    </a-row>
    <a-row :gutter="4" style="margin-top:8px;">
      <a-col :span="24">
        <a-card title="時間別Twitter数" :loading="isLoading" :bodyStyle="cardBody">
          <v-chart :options="hourlyTwitterCountChartOptions" :auto-resize="true"/>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { StatisticType1, StatisticType2, StatisticType3 } from '@/models/statistic';
import { mapGetters } from 'vuex';

@Component({
  name: 'TWHome',
  components: {},
  computed: {
    ...mapGetters(['collapsed']),
  },
})
export default class TWHome extends Vue {
  public a: any = {};
  public annualTwitterCountChartOptions: any = {};
  public monthlyTwitterCountChartOptions: any = {};
  public hourlyTwitterCountChartOptions: any = {};
  public isLoading: boolean = true;
  public currentYear: number = new Date().getFullYear();
  mounted() {
    this.isLoading = true;
    this.$store.dispatch('home/fetchData');
    this.isLoading = true;
    setTimeout(() => {
      this.initAnnualTwitterCountChartOptions();
      this.initMonthTwitterCountChartOptions();
      this.initHourTwitterCountChartOptions();
      this.isLoading = false;
    }, 1000);
  }
  /**
   * 年度別Twitter統計
   */
  private initAnnualTwitterCountChartOptions() {
    this.annualTwitterCountChartOptions = {
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'line' },
        formatter: (params: any) => {
          const axisValue = params[0].axisValue;
          return axisValue == '2017' ? '大統領元年' : '';
        },
      },
      grid: { left: '5%', right: '10%', bottom: '5%', top: '10%', containLabel: true },
      xAxis: { type: 'category', name: '年度', data: this.annualTwitterCount.map(d => d.year) },
      yAxis: { type: 'value', name: '件数' },
      series: [
        {
          data: this.annualTwitterCount.map(d => d.count),
          type: 'line',
          label: { offset: [-5, -5], show: true, position: 'bottom', color: '#C23431' },
        },
      ],
    };
  }

  /**
   * 月度別Twitter統計
   */
  private initMonthTwitterCountChartOptions() {
    const years = this.monthlyTwitterCount.map(d => d.yearWithUnit);
    this.monthlyTwitterCountChartOptions = {
      legend: {
        data: years,
        selected: { '2015年': false, '2016年': false },
      },
      grid: { left: '5%', right: '10%', bottom: '5%', top: '20%', containLabel: true },
      xAxis: {
        type: 'category',
        name: '月度',
        data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(d => `${d}月`),
      },
      yAxis: { type: 'value', name: '件数' },
      series: this.monthlyTwitterCount.map(d => {
        return {
          name: d.yearWithUnit,
          data: d.data.map(v => v.count),
          type: 'bar',
          barWidth: 10,
          markLine: { data: [{ type: 'average', name: '平均值' }] },
          markPoint: {
            data: [{ type: 'max', name: '最大値' }, { type: 'min', name: '最小値' }],
          },
        };
      }),
    };
  }

  /**
   * 時間帯別Twitter統計
   */
  private initHourTwitterCountChartOptions() {
    console.log(this.twitterIcon);
    let timeline = [];
    for (let i = 0; i <= 23; i++) {
      timeline.push(`${i}:00`);
    }
    this.hourlyTwitterCountChartOptions = {
      baseOption: {
        timeline: {
          axisType: 'category',
          autoPlay: true,
          playInterval: 5000,
          data: this.hourlyTwitterCount.map(d => `${d.year}年`),
          symbol: `image://${this.twitterIcon}`,
          symbolSize: 15,
        },
        backgroundColor: '#1b1b1b',
        grid: { left: '2%', right: '2%', bottom: '15%', top: '4%', containLabel: true },
        tooltip: { trigger: 'axis' },
        xAxis: [
          {
            type: 'category',
            data: timeline,
            nameTextStyle: { color: '#fff' },
            axisLabel: { textStyle: { fontSize: 12, color: '#56617b' }, interval: 0 },
            axisLine: { lineStyle: { color: '#56617b' } },
            splitLine: { show: true, lineStyle: { color: '#2e3547' } },
          },
        ],
        yAxis: [
          {
            type: 'value',
            name: '',
            splitNumber: 8,
            nameTextStyle: { color: '#56617b' },
            axisLine: { lineStyle: { color: '#56617b' } },
            axisLabel: { formatter: '{value}' },
            // splitLine: { show: true, lineStyle: { color: '#56617b' } },
          },
        ],
        series: [
          {
            type: 'bar',
            barWidth: '30%',
            itemStyle: {
              normal: {
                color: function(params: any) {
                  // build a color map as your need.
                  var colorList = [
                    '#eb4848',
                    '#eb6449',
                    '#eb7f49',
                    '#eb9a49',
                    '#ebb549',
                    '#ebd049',
                    '#ebeb49',
                    '#d0eb49',
                    '#b5eb49',
                    '#9aeb49',
                    '#7feb49',
                    '#64eb49',
                    '#49eb49',
                    '#49eb64',
                    '#49eb7f',
                    '#49eb9a',
                    '#49ebb5',
                    '#49ebd0',
                    '#49ebeb',
                    '#49d0eb',
                    '#49b5eb',
                    '#499aeb',
                    '#497feb',
                    '#4964eb',
                    '#4949eb',
                    '#6449eb',
                    '#7f49eb',
                    '#9a49eb',
                    '#b549eb',
                    '#d049eb',
                    '#eb49eb',
                    '#eb49d0',
                  ];
                  return colorList[params.dataIndex];
                },
              },
            },
          },
        ],
      },
      options: this.hourlyTwitterCount.map(d => {
        return { series: { data: d.data.map(v => v.count) } };
      }),
    };
  }

  get annualTwitterCount(): StatisticType1[] {
    return this.$store.state.home.anualTwitterCount as StatisticType1[];
  }

  get monthlyTwitterCount(): StatisticType2[] {
    return this.$store.state.home.monthlyTwitterCount as StatisticType2[];
  }

  get hourlyTwitterCount(): StatisticType3[] {
    return this.$store.state.home.hourlyTwitterCount as StatisticType3[];
  }

  get cardBody() {
    return { height: '360px', padding: '12px' };
  }

  get twitterIcon(): string {
    return require('@/assets/image/twitter.svg');
  }
}
</script>
<style lang="scss">
</style>

