import Vue from 'vue';
import Vuex, { ActionTree, GetterTree, MutationTree } from 'vuex';
import { TWHomeModule } from './modules/tw-home';
import { TWEmotionModule } from './modules/tw-emotion';

Vue.use(Vuex);

export interface RootState {
  collapsed: boolean;
  route: {
    path: string;
    params: { [key: string]: string };
    query: { [key: string]: string };
    fullPath: string;
  };
}

const stateOfModule: RootState = {
  collapsed: true,
  route: {
    path: '',
    params: {},
    query: {},
    fullPath: '',
  },
};

const gettersOfModule: GetterTree<RootState, RootState> = {
  collapsed(state: RootState): boolean {
    return state.collapsed;
  },
};

const mutations: MutationTree<RootState> = {
  collapsed: (state: RootState, value: boolean) => {
    state.collapsed = value;
  },
};

const actions: ActionTree<RootState, RootState> = {};

export const store = new Vuex.Store<RootState>({
  state: stateOfModule,
  getters: gettersOfModule,
  mutations,
  actions,
  modules: {
    home: TWHomeModule,
    emotion: TWEmotionModule,
  },
});
