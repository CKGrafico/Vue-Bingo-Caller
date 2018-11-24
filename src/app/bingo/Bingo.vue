<template>
  <section class="bingo">
    <img class="bingo-logo" src="/assets/images/logo.png"/>
    <div class="bingo-list">
      <Number v-for="number in numberValues" :key="number" :value="number + 1" />
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Number from './Number.vue';

@Component({
  components: {
    Number
  }
})
export default class extends Vue {
  public name = 'Bingo';
  public numbersCount = 90;
  public numberValues = [];

  public created(): void {
    this.initBingo();
  }

  private initBingo(): void {
    this.numberValues = [...Array(this.numbersCount).keys()]
  }
}
</script>

<style lang="scss" scoped>
@import '~styles/variables';

.bingo {
  padding-top: 2vh;
  height: 100vh;

  &-logo {
    margin-left: 2rem;
  }

  &-list {
    align-content: flex-start;
    align-items: flex-start;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
}
</style>