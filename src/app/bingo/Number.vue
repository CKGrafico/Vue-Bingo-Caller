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

  @Prop({ type: Number, required: true }) value: number;
  @Prop({ type: Boolean, default: false }) state: boolean;

  public toggle(): void {
    this.$emit('update:state', !this.state);
  }
}
</script>

<style lang="scss" scoped>
@import '~styles/variables';

.number {
  $size: 6rem;

  align-items: center;
  background: $color-background-darker;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  font-size: $size * .5;
  height: $size;
  margin: .25rem;
  justify-content: center;
  opacity: .15;
  transition: $animation-speed-default;
  width: $size;

  &.is-on {
    background: radial-gradient(ellipse at top left, $color-primary-brighter 0%,$color-primary 100%); 
    opacity: 1;
  }
}
</style>