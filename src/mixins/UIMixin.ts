import { Component, Vue } from 'vue-property-decorator';

@Component
export class UIMixin extends Vue {
  get cardBody() {
    return { height: '360px', padding: '12px' };
  }

  get cardTagBody() {
    return { height: '360px', padding: '8px' };
  }
}
