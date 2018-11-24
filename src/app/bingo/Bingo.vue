<template>
  <section class="bingo">
    Hello!!
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';


@Component({
  components: {
  }
})
export default class extends Vue {
  public name = 'Bingo';
}
</script>

<style lang="scss" scoped>
@import '~styles/variables';

.bingo {
  align-content: center;
  align-items: center;
  display: flex;
  justify-content: center;
  height: 100vh;
}
</style>