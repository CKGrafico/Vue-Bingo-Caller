<template>
  <section class="admin">
    <div class="admin-section">
      <h3>Toggle bingo number (1 - 90)</h3>
      <input class="admin-input" type="number" v-model="numberInput" @focus="onFocusNumberInput">
      <button class="admin-button" @click="onClickChangeSignButton">-X</button>
      <button class="admin-button"  @click="onClickSendNumberInput">Send</button>
    </div>

    <div class="admin-section">
      <h3>Change Serie value</h3>
      <input class="admin-input" type="text" v-model="serieInput" @focus="onFocusSerieInput">
      <button class="admin-button"  @click="onClickChangeSerieInput">Change</button>
    </div>

    <div class="admin-section">
      <h3>Reset the bingo</h3>
      <button class="admin-button" @dblclick="onClickResetBingo">RESET!</button>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { LOCAL_STORAGE_BINGO_NUMBER_KEY, LOCAL_STORAGE_BINGO_SERIE_KEY, LOCAL_STORAGE_BINGO_RESET_KEY } from '../shared';

@Component
export default class extends Vue {
  public name = 'Admin';
  public numbersCount = 90;
  public numberValues = [];
  public destroying = false;

  public numberInput = '1';
  public serieInput = '-';

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
    localStorage.setItem(LOCAL_STORAGE_BINGO_RESET_KEY, '1');
  }

  public onFocusNumberInput(): void {
    this.numberInput = '';
  }

  public onFocusSerieInput(): void {
    this.serieInput = '';
  }
}
</script>