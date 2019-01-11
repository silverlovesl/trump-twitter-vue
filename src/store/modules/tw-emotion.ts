import { ActionContext, ActionTree, GetterTree, Module, MutationTree } from 'vuex';
import { RootState } from '..';
import { Emotion } from '@/models/statistic';
import { statService } from '@/service/api/statistic.service';

interface State {
  emotion: Emotion;
}

const stateOfModule: State = {
  emotion: undefined,
};

const gettersOfModule: GetterTree<State, RootState> = {};

const mutations: MutationTree<State> = {
  emotion: (state: State, value: Emotion) => {
    state.emotion = value;
  },
};

const actions: ActionTree<State, RootState> = {
  async fetchData(ctx: ActionContext<State, RootState>) {
    let _emotion = await statService.getEmotion();
    ctx.commit('emotion', _emotion);
  },
};

export const TWEmotionModule: Module<State, RootState> = {
  namespaced: true,
  state: stateOfModule,
  getters: gettersOfModule,
  mutations,
  actions,
};
