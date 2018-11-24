<template>
  <section class="bingo">
    <img class="bingo-logo" src="/assets/images/logo.png" @dblclick="onClickLogo"/>
    <div class="bingo-list" :class="{'is-destroying': destroying}">
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
  public destroying = false;

  public created(): void {
    this.initBingo();
  }

  public async onClickLogo(): Promise<void> {
    try {
      const confirmed = await this.$dialog.confirm('¿BINGO?');
      await this.resetBingo();
    } catch (e) {
      // ok
    }
  }

  private initBingo(): void {
    this.numberValues = [...Array(this.numbersCount).keys()]
  }

  private async resetBingo(): Promise<void> {
    await this.destroyBingoUI();
    this.numberValues = [];
    await this.$nextTick();
    this.initBingo();
  }

  private async destroyBingoUI(): Promise<{}> {
    return new Promise(resolve => {
      this.destroying = true;
      setTimeout(() => {
        this.destroying = false;
        resolve();
      }, 3000);
    });
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

    &.is-destroying {
      // Magic happens
      background-color: pink;
    }
  }
}
</style>