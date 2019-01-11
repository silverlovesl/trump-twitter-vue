<template>
  <div class="tw-emotion">
    <a-row :gutter="16">
      <a-col :span="8">
        <a-card title="感情分析" :loading="isLoading" :bodyStyle="cardBody">
          <v-chart :options="sentimentIntensityOption" :auto-resize="true"/>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import { Action, Getter, State, namespace } from 'vuex-class';
import { mapGetters, ActionContext } from 'vuex';
import { TWEnum } from '@/models/tw-enum';
import { UIMixin } from '@/mixins/UIMixin';
import { Emotion } from '@/models/statistic';

@Component({
  name: 'TWEmotion',
  components: {},
  computed: {},
})
export default class TWEmotion extends mixins(UIMixin) {
  public sentimentIntensityOption: any = {};
  public isLoading: boolean = true;
  @State(state => state.emotion.emotion) emotion: Emotion;
  @Action('emotion/fetchData') featchData: () => Promise<Emotion>;

  async mounted() {
    this.isLoading = true;
    await this.featchData();
    setTimeout(() => {
      this.isLoading = false;
      this.initEmotionOption();
    }, 1000);
  }

  private initEmotionOption() {
    this.sentimentIntensityOption = {
      grid: { left: '5%', right: '10%', bottom: '5%', top: '20%', containLabel: true },
      series: [
        {
          name: 'Positive',
          type: 'gauge',
          z: 3,
          center: ['48%', '40%'],
          min: 0,
          max: 100,
          splitNumber: 5,
          radius: '50%',
          axisLine: { lineStyle: { width: 5 } },
          axisTick: { length: 15, lineStyle: { color: 'auto' } },
          splitLine: { length: 10, lineStyle: { color: 'auto' } },
          data: [{ value: this.emotion.positive, name: 'Positive' }],
        },
        {
          name: 'Negative',
          type: 'gauge',
          center: ['15%', '40%'],
          min: 0,
          max: 100,
          splitNumber: 5,
          radius: '35%',
          axisLine: { lineStyle: { width: 5 } },
          axisTick: { length: 15, lineStyle: { color: 'auto' } },
          splitLine: { length: 10, lineStyle: { color: 'auto' } },
          data: [{ value: this.emotion.negative, name: 'Negative' }],
        },
        {
          name: 'Neutral',
          type: 'gauge',
          center: ['80%', '40%'],
          min: 0,
          max: 100,
          splitNumber: 5,
          radius: '35%',
          axisLine: { lineStyle: { width: 5 } },
          axisTick: { length: 15, lineStyle: { color: 'auto' } },
          splitLine: { length: 10, lineStyle: { color: 'auto' } },
          data: [{ value: this.emotion.neutral, name: 'Neutral' }],
        },
      ],
    };
  }
}
</script>