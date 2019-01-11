<template>
  <div class="tw-home">
    <a-row :gutter="16" class="row-spacing">
      <a-col :span="6">
        <a-card :loading="isLoading" hoverable class="card-tag" :bodyStyle="cardTagBody">
          <h4>2018年</h4>
          <p v-if="annualTwitterTotal" class="annual-twitter-count">
            <ICountUp :startVal="0" :endVal="annualTwitterTotal" :duration="2"/>件
          </p>
          <p v-if="annualTwitterAvg" class="annual-twitter-count-avg">
            <span>一日あたり {{annualTwitterAvg}} 件</span>
          </p>
          <a-icon type="twitter"/>
        </a-card>
      </a-col>
    </a-row>
    <a-row :gutter="16">
      <a-col :span="8">
        <a-card hoverable :bodyStyle="{'height':'115px'}">
          <img alt="trump" src="@/assets/image/trump-avator.png" slot="cover" style="height:300px;border-bottom:1px solid silver;">
          <a-card-meta title="Donald J. Trump">
            <template slot="description" style="height:60px">
              <a target="_blank" href="https://twitter.com/realDonaldTrump">The 45th and current President of the United States.</a>
            </template>
          </a-card-meta>
        </a-card>
      </a-col>
      <a-col :span="8" class="row-spacing">
        <a-card title="年度別Twitter数" :loading="isLoading" :bodyStyle="cardBody">
          <v-chart :options="annualTwitteStatChartOptions" :auto-resize="true"/>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card title="トランプが何を言った" :loading="isLoading" :bodyStyle="cardBody">
          <v-chart :options="wordCloudChartOptions" :auto-resize="true"/>
        </a-card>
      </a-col>
    </a-row>
    <a-row :gutter="16">
      <a-col :span="12">
        <a-card title="月度別Twitter数" :loading="isLoading" :bodyStyle="cardBody">
          <v-chart :options="monthlyTwitterStatChartOptions" :auto-resize="true"/>
        </a-card>
      </a-col>
      <a-col :span="12">
        <a-card title="時間別Twitter数" :loading="isLoading" :bodyStyle="cardBody">
          <v-chart :options="hourlyTwitterStatChartOptions" :auto-resize="true"/>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import { Action, Getter, State, namespace } from 'vuex-class';
import { StatisticType1, StatisticType2, StatisticType3 } from '@/models/statistic';
import { mapGetters, ActionContext } from 'vuex';
import ICountUp from 'vue-countup-v2';
import { WordCloud } from '@/models/word-cloud';
import { TWEnum } from '@/models/tw-enum';
import { UIMixin } from '@/mixins/UIMixin';

@Component({
  name: 'TWHome',
  components: {
    ICountUp,
  },
  computed: {},
})
export default class TWHome extends mixins(UIMixin) {
  public annualTwitteStatChartOptions: any = {};
  public monthlyTwitterStatChartOptions: any = {};
  public hourlyTwitterStatChartOptions: any = {};
  public wordCloudChartOptions: any = {};
  public isLoading: boolean = true;
  public currentYear: number = new Date().getFullYear();
  @State(state => state.home.annualTwitterStat) annualTwitterStat: StatisticType1[];
  @State(state => state.home.monthlyTwitterStat) monthlyTwitterStat: StatisticType2[];
  @State(state => state.home.hourlyTwitterStat) hourlyTwitterStat: StatisticType3[];
  @Getter('collapsed') collapsed: boolean;
  @Action('home/fetchData') featchData: () => Promise<void>;
  @Action('home/fetchWordCloud') fetchWordCloud: (category: TWEnum.WordCategory) => Promise<void>;

  async mounted() {
    this.isLoading = true;
    await this.featchData();
    await this.fetchWordCloud(TWEnum.WordCategory.Noun);

    setTimeout(() => {
      this.initannualTwitterStatChart();
      this.initMonthTwitterCountChart();
      this.initHourTwitterCountChart();
      this.initWordCloud();
      this.isLoading = false;
    }, 1000);
  }
  /**
   * 年度別Twitter統計
   */
  private initannualTwitterStatChart() {
    this.annualTwitteStatChartOptions = {
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'line' },
        formatter: (params: any) => {
          const axisValue = params[0].axisValue;
          return axisValue == '2017' ? '大統領元年' : '';
        },
      },
      grid: { left: '5%', right: '10%', bottom: '5%', top: '10%', containLabel: true },
      xAxis: { type: 'category', name: '年度', data: this.annualTwitterStat.map(d => d.year) },
      yAxis: { type: 'value', name: '件数' },
      series: [
        {
          data: this.annualTwitterStat.map(d => d.count),
          type: 'line',
          label: { offset: [-5, -5], show: true, position: 'bottom', color: '#C23431' },
        },
      ],
    };
  }

  /**
   * 月度別Twitter統計
   */
  private initMonthTwitterCountChart() {
    const years = this.monthlyTwitterStat.map(d => d.yearWithUnit);
    this.monthlyTwitterStatChartOptions = {
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
      series: this.monthlyTwitterStat.map(d => {
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
  private initHourTwitterCountChart() {
    let timeline = [];
    for (let i = 0; i <= 23; i++) {
      timeline.push(`${i}時`);
    }
    this.hourlyTwitterStatChartOptions = {
      baseOption: {
        title: { text: 'Trump一日最初の打ち合わせは午前11時より' },
        timeline: {
          axisType: 'category',
          autoPlay: true,
          playInterval: 5000,
          data: this.hourlyTwitterStat.map(d => `${d.year}年`),
          symbol: `image://${this.twitterIcon}`,
          symbolSize: 15,
        },
        // backgroundColor: '#1b1b1b',
        grid: { left: '2%', right: '2%', bottom: '15%', top: '10%', containLabel: true },
        tooltip: { trigger: 'axis' },
        xAxis: [
          {
            type: 'category',
            data: timeline,
            nameTextStyle: { color: '#fff' },
            axisLabel: { textStyle: { fontSize: 12 }, interval: 0 },
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
            barWidth: '20%',
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
      options: this.hourlyTwitterStat.map(d => {
        return { series: { data: d.data.map(v => v.count) } };
      }),
    };
  }

  /**
   * WordCloud
   */
  private initWordCloud() {
    var maskImage = new Image();

    maskImage.onload = e => {
      this.wordCloudChartOptions = {
        series: [
          {
            type: 'wordCloud',
            sizeRange: [10, 100],
            rotationRange: [-90, 90],
            rotationStep: 45,
            gridSize: 1,
            width: '100%',
            height: '100%',
            maskImage: e.target,
            shape: 'pentagon',
            textStyle: {
              normal: {
                color: function() {
                  return 'rgb(' + [Math.round(Math.random() * 160), Math.round(Math.random() * 160), Math.round(Math.random() * 160)].join(',') + ')';
                },
              },
            },
            data: this.wordCloud.map(d => {
              return { name: d.word, value: d.value };
            }),
          },
        ],
      };
    };

    maskImage.src = require('@/assets/image/word-cloud-frame.png');
  }

  get wordCloud(): WordCloud[] {
    return this.$store.state.home.wordCloud as WordCloud[];
  }

  get annualTwitterTotal(): number {
    if (this.annualTwitterStat) {
      const index = this.annualTwitterStat.findIndex(d => d.year === 2018);
      if (index > -1) {
        return this.annualTwitterStat[index].count;
      }
    }
    return undefined;
  }

  get annualTwitterAvg(): number {
    if (this.annualTwitterTotal) {
      return Math.ceil(this.annualTwitterTotal / 365);
    }
    return undefined;
  }

  get twitterIcon(): string {
    return require('@/assets/image/twitter.svg');
  }
}
</script>
<style lang="scss">
.card-tag {
  height: 130px;
  padding-left: 10px;
  position: relative;
  background: linear-gradient(240deg, #00aadf 0%, #0071bc 100%);
  color: white;
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 4px;
    color: white;
  }
  p {
    margin: 2px;
  }
  .annual-twitter-count {
    font-size: 2.4rem;
    &-avg {
      font-size: 0.8rem;
    }
  }

  overflow: hidden;
  i {
    color: #81c8e9;
    position: absolute;
    font-size: 4rem;
    right: 5px;
    bottom: -5px;
  }
}
</style>

