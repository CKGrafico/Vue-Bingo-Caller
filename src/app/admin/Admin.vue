<template>
  <section class="admin">
    <div class="admin-section">
      <h3>Toggle bingo number (1 - 90)</h3>
      <input
        class="admin-input"
        type="number"
        v-model="numberInput"
        @focus="onFocusNumberInput"
      >
      <button
        class="admin-button"
        @click="onClickSendNumberInput"
      >Send</button>
      <button
        class="admin-button"
        @click="onClickChangeSignButton"
      >-X</button>
    </div>

    <div class="admin-section">
      <h3>Change Serie value</h3>
      <input
        class="admin-input"
        type="text"
        v-model="serieInput"
        @focus="onFocusSerieInput"
      >
      <button
        class="admin-button"
        @click="onClickChangeSerieInput"
      >Change</button>
    </div>

    <div class="admin-section">
      <h3>Reset the bingo (click twice)</h3>
      <button
        class="admin-button"
        @dblclick="onClickResetBingo"
      >BINGO!</button>
      <button class="admin-button is-disabled">----</button>
      <button
        class="admin-button"
        @dblclick="onClickLine"
      >LINE!</button>
    </div>

    <div class="admin-section">
      <h3>Line</h3>
    </div>

    <iframe
      ref="frame"
      class="admin-frame"
      src="/"
      frameborder="0"
      @load="onLoadFrame"
    ></iframe>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {
  LOCAL_STORAGE_BINGO_NUMBER_KEY,
  LOCAL_STORAGE_BINGO_SERIE_KEY,
  LOCAL_STORAGE_BINGO_RESET_KEY,
  LOCAL_STORAGE_BINGO_LINE_KEY,
} from "../shared";

@Component
export default class extends Vue {
  public name = "Admin";
  public numbersCount = 90;
  public numberValues = [];
  public destroying = false;

  public numberInput = "1";
  public serieInput = "-";

  public onLoadFrame(): void {
    (this.$refs.frame as HTMLIFrameElement).contentDocument
      .querySelectorAll(".number")
      .forEach((element: HTMLElement) => {
        element.style.fontSize = "1rem";
        element.style.height = "1rem";
        element.style.width = "1rem";
      });
  }

  public onClickSendNumberInput(): void {
    localStorage.setItem(LOCAL_STORAGE_BINGO_NUMBER_KEY, `${this.numberInput}`);
  }

  public onClickChangeSignButton(): void {
    this.numberInput = `${Number(this.numberInput) * -1}`;
  }

  public onClickChangeSerieInput(): void {
    localStorage.setItem(LOCAL_STORAGE_BINGO_SERIE_KEY, `${this.serieInput}`);
  }

  public onClickResetBingo(): void {
    localStorage.setItem(LOCAL_STORAGE_BINGO_RESET_KEY, "1");
    setTimeout(() => this.onLoadFrame(), 5000);
  }

  public onClickLine(): void {
    localStorage.setItem(LOCAL_STORAGE_BINGO_LINE_KEY, "1");
  }

  public onFocusNumberInput(): void {
    this.numberInput = "";
  }

  public onFocusSerieInput(): void {
    this.serieInput = "";
  }
}
</script>

<style lang="scss" scoped>
.admin {
  &-section {
    border: 1px solid rgba(#ffffff, 0.25);
    margin: 0.5rem;
    padding: 0.5rem;
  }

  &-input {
    font-size: 1.5rem;
  }

  &-button {
    font-size: 1.5rem;
    padding: 0.5rem;
  }

  &-frame {
    height: 35vh;
    width: 90vw;
  }
}
</style>