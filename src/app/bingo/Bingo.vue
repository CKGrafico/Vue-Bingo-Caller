<template>
  <section class="bingo">
    <img class="bingo-logo" src="/assets/images/logo.png" @dblclick="onClickLogo" />
    <h1 class="bingo-title" :class="{'is-destroying': destroying}">BINGO!</h1>
    <div class="bingo-list" :class="{'is-destroying': destroying}">
      <Number class="bingo-number" v-for="number in numberValues" :key="number" :value="number + 1" />
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Number from "./Number.vue";

@Component({
  components: {
    Number
  }
})
export default class extends Vue {
  public name = "Bingo";
  public numbersCount = 90;
  public numberValues = [];
  public destroying = false;

  public created(): void {
    this.initBingo();
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
    this.numberValues = [...Array(this.numbersCount).keys()];
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
      }, 2000);
    });
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