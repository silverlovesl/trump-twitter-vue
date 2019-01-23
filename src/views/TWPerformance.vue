<template>
  <div>Performance Test</div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import { UIMixin } from '@/mixins/UIMixin';
@Component({
  name: 'TWPerformance',
  components: {},
  computed: {},
})
export default class TWHome extends mixins(UIMixin) {}
</script>
<style lang="scss" scoped>
</style>
