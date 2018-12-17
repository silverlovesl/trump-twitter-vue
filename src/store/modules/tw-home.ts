import { ActionContext, ActionTree, GetterTree, Module, MutationTree } from 'vuex';
import { RootState } from '..';
import { StatisticType1, StatisticType2, StatisticType3 } from '@/models/statistic';
import { statService } from '@/service/api/statistic.service';

interface State {
  anualTwitterCount: StatisticType1[];
  monthlyTwitterCount: StatisticType2[];
  hourlyTwitterCount: StatisticType3[];
}

const stateOfModule: State = {
  anualTwitterCount: [],
  monthlyTwitterCount: [],
  hourlyTwitterCount: [],
};

const gettersOfModule: GetterTree<State, RootState> = {};

const mutations: MutationTree<State> = {
  anualTwitterCount: (state: State, value: StatisticType1[]) => {
    state.anualTwitterCount = value;
  },
  monthlyTwitterCount: (state: State, value: StatisticType2[]) => {
    state.monthlyTwitterCount = value;
  },
  hourlyTwitterCount: (state: State, value: StatisticType3[]) => {
    state.hourlyTwitterCount = value;
  },
};

const actions: ActionTree<State, RootState> = {
  async fetchData(ctx: ActionContext<State, RootState>) {
    // var _anualTwitterCount = require('@/assets/data/stat-type1.json').data.map((d: any) => new StatisticType1().deserialize(d));
    var _hourlyTwitterCount = await statService.getHourlyStatistic();
    var _monthlyTwitterCount = await statService.getMonthlyStatistic();
    var _anualTwitterCount = await statService.getAnnualStatistic();
    ctx.commit('anualTwitterCount', _anualTwitterCount);
    ctx.commit('monthlyTwitterCount', _monthlyTwitterCount);
    ctx.commit('hourlyTwitterCount', _hourlyTwitterCount);
  },
};

export const TWHomeModule: Module<State, RootState> = {
  namespaced: true,
  state: stateOfModule,
  getters: gettersOfModule,
  mutations,
  actions,
};
