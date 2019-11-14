<template>
  <section class="bingo">
    <img
      class="bingo-logo"
      src="/assets/images/logo.png"
      @dblclick="onClickLogo"
    />
    <div class="bingo-serie">{{ls.bingoSerie}}</div>
    <h1
      class="bingo-title"
      :class="{'is-destroying': destroying}"
    >BINGO!</h1>
    <div
      class="bingo-list"
      :class="{'is-destroying': destroying}"
    >
      <Number
        class="bingo-number"
        v-for="number in numberValues"
        :key="number.value"
        :state.sync="number.state"
        :value="number.value + 1"
      />
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Number from './Number.vue';
import { LOCAL_STORAGE_BINGO_NUMBER_KEY, LOCAL_STORAGE_BINGO_SERIE_KEY, LOCAL_STORAGE_BINGO_RESET_KEY } from '../shared';

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
  public ls = {
    bingoNumber: -1,
    bingoSerie: '-'
  };

  public created(): void {
    this.initBingo();
    this.watchForMessages();
  }

  public async onClickLogo(): Promise<void> {
    try {
      const options = {
        okText: '👍🏻',
        cancelText: '🚫'
      };
      const confirmed = await this.$dialog.confirm('', options);
      await this.resetBingo();
    } catch (e) {
      // ok
    }
  }

  private initBingo(): void {
    this.numberValues = [...Array(this.numbersCount).keys()].map(x => ({
      value: x,
      state: false
    }));
  }

  private async resetBingo(): Promise<void> {
    await this.destroyBingoUI();
    this.numberValues = [];
    localStorage.setItem(LOCAL_STORAGE_BINGO_SERIE_KEY, '-');
    localStorage.setItem(LOCAL_STORAGE_BINGO_NUMBER_KEY, '0');
    this.ls.bingoNumber = 0;
    this.ls.bingoSerie = '-';
    await this.$nextTick();
    this.initBingo();
  }

  private async destroyBingoUI(): Promise<{}> {
    return new Promise(resolve => {
      this.destroying = true;
      setTimeout(() => {
        this.destroying = false;
        resolve();
      }, 2000);
    });
  }

  private watchForMessages(): void {
    // TODO strategy my goood!!

    // Bingo number
    const lsBingoNumber = parseInt(
      localStorage.getItem(LOCAL_STORAGE_BINGO_NUMBER_KEY),
      10
    );
    if (lsBingoNumber !== this.ls.bingoNumber) {
      const positive = lsBingoNumber > 0;
      this.ls.bingoNumber = lsBingoNumber;

      const found = this.numberValues.find(
        x => x.value === Math.abs(lsBingoNumber) - 1
      );
      
      if (!found) {
        return;
      }

      found.state = positive;
    }

    // Bingo serie
    const lsBingoSerie = localStorage.getItem(LOCAL_STORAGE_BINGO_SERIE_KEY);
    if (lsBingoSerie !== this.ls.bingoSerie) {
      this.ls.bingoSerie = lsBingoSerie;
    }

    // Bingo reset
    const lsBingoReset = parseInt(localStorage.getItem(LOCAL_STORAGE_BINGO_RESET_KEY), 10);
    if (lsBingoReset === 1) {
      localStorage.setItem(LOCAL_STORAGE_BINGO_RESET_KEY, '0');
      this.resetBingo();
    }

    requestAnimationFrame(() => this.watchForMessages());
  }
}
</script>

<style lang="scss" scoped>
@import "~styles/variables";

// Ugly css we know! one day to do that you know :P

.bingo {
  padding-top: 2vh;
  height: 100vh;

  &-logo {
    margin-left: 2rem;
  }

  &-serie {
    font-size: 3rem;
    position: absolute;
    top: 1.5rem;
    right: 1rem;
  }

  &-title {
    color: $color-primary;
    display: none;
    font-size: 11rem;
    top: 15vh;
    position: fixed;
    text-align: center;
    width: 100%;
    z-index: 10;

    &.is-destroying {
      animation: blink $animation-speed-default infinite;
      display: block;
    }
  }

  &-list {
    align-content: flex-start;
    align-items: flex-start;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  &-list.is-destroying &-number {
    // Magic happens
    &:nth-child(2n) {
      animation: number1 3s forwards;
    }

    &:nth-child(2n + 1) {
      animation: number2 3s forwards;
    }
  }

  @keyframes number1 {
    0% {
      transform: translateY(0);
    }

    100% {
      transform: translateY(-120vh);
    }
  }

  @keyframes number2 {
    0% {
      transform: translateY(0);
    }

    100% {
      transform: translateY(120vh);
    }
  }

  @keyframes blink {
    0% {
      opacity: 0;
    }

    50% {
      opacity: 1;
    }

    100% {
      opacity: 0;
    }
  }
}
</style>