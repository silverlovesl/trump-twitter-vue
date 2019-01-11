import { ActionContext, ActionTree, GetterTree, Module, MutationTree } from 'vuex';
import { RootState } from '..';
import { StatisticType1, StatisticType2, StatisticType3 } from '@/models/statistic';
import { statService } from '@/service/api/statistic.service';
import { WordCloud } from '@/models/word-cloud';
import { TWEnum } from '@/models/tw-enum';

interface State {
  annualTwitterStat: StatisticType1[];
  monthlyTwitterStat: StatisticType2[];
  hourlyTwitterStat: StatisticType3[];
  wordCloud: WordCloud[];
}

const stateOfModule: State = {
  annualTwitterStat: [],
  monthlyTwitterStat: [],
  hourlyTwitterStat: [],
  wordCloud: [],
};

const gettersOfModule: GetterTree<State, RootState> = {};

const mutations: MutationTree<State> = {
  annualTwitterStat: (state: State, value: StatisticType1[]) => {
    state.annualTwitterStat = value;
  },
  monthlyTwitterStat: (state: State, value: StatisticType2[]) => {
    state.monthlyTwitterStat = value;
  },
  hourlyTwitterStat: (state: State, value: StatisticType3[]) => {
    state.hourlyTwitterStat = value;
  },
  wordCloud: (state: State, value: WordCloud[]) => {
    state.wordCloud = value;
  },
};

const actions: ActionTree<State, RootState> = {
  async fetchData(ctx: ActionContext<State, RootState>) {
    let _hourlyTwitterStat = await statService.getHourlyStatistic();
    let _monthlyTwitterStat = await statService.getMonthlyStatistic();
    let _annualTwitterStat = await statService.getAnnualStatistic();
    ctx.commit('annualTwitterStat', _annualTwitterStat);
    ctx.commit('monthlyTwitterStat', _monthlyTwitterStat);
    ctx.commit('hourlyTwitterStat', _hourlyTwitterStat);
  },

  async fetchWordCloud(ctx: ActionContext<State, RootState>, category: TWEnum.WordCategory) {
    let _wordCloud = await statService.getWordCloud(category);
    ctx.commit('wordCloud', _wordCloud);
  },
};

export const TWHomeModule: Module<State, RootState> = {
  namespaced: true,
  state: stateOfModule,
  getters: gettersOfModule,
  mutations,
  actions,
};
