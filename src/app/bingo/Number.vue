<template>
  <section class="number" @click="toggle" :class="{'is-on': state}">
    {{value}}
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';


@Component({
  components: {
  }
})
export default class extends Vue {
  public name = 'Number';
  public state = false;

  @Prop({ type: Number, required: true }) value: number;

  public toggle(): void {
    this.state = !this.state;
  }
}
</script>

<style lang="scss" scoped>
@import '~styles/variables';

.number {
  $size: 6rem;

  align-items: center;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  font-size: $size * .5;
  height: $size;
  margin: .25rem;
  justify-content: center;
  opacity: .15;
  width: $size;

  &.is-on {
    background-color: $color-primary;
    opacity: 1;
  }
}
</style>