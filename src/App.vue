<template>
  <div id="app">
    <a-layout id="components-layout-demo-custom-trigger">
      <a-layout-sider :trigger="null" collapsible v-model="collapsed">
        <div class="logo">
          <img src="@/assets/image/logo_small.png">
        </div>
        <a-menu theme="dark" mode="inline" :defaultSelectedKeys="['1']">
          <a-menu-item key="1">
            <a-icon type="bar-chart"/>
            <span>Twitter every day</span>
          </a-menu-item>
          <a-menu-item key="2">
            <a-icon type="cloud"/>
            <span>Your are fired</span>
          </a-menu-item>
          <a-menu-item key="3">
            <a-icon type="pie-chart"/>
            <span>nav 1</span>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <a-icon class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="collapsed = !collapsed"/>
        </a-layout-header>
        <a-layout-content :style="{ margin: '6px', padding: '4px', minHeight: '280px' }">
          <router-view/>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'TWApp',
  components: {},
  computed: {},
})
export default class TWApp extends Vue {
  get collapsed(): boolean {
    return this.$store.state.collapsed;
  }
  set collapsed(value: boolean) {
    this.$store.commit('collapsed', value);
  }
}
</script>

<style lang="scss">
#app {
  height: 100vh;
}

#components-layout-demo-custom-trigger {
  height: 100%;
  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
    height: 100%;
  }
  .logo {
    margin: 6px 0px;
    text-align: center;
    width: 100%;
    > img {
      height: 48px;
    }
  }
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}
</style>
