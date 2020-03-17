<template>
  <div class="train-keyboard"
    @click.stop="onKeyboardPress"
    @touchmove="onTouchmove">
    <div class="train-keyboard-key"
      v-for="(key, index) in Keys"
      :data-key="key.key"
      :data-value="key.value"
      :key="index">{{key.key}}
    </div>
  </div>
</template>

<script>
import Keys from './keys'

export default {
  data () {
    return {
      Keys
    }
  },

  methods: {
    onKeyboardPress (el) {
      const { key, value } = el.target.dataset
      this.$emit('onKeyPress', {
        key, value
      })
    },

    onTouchmove(e) {
      e.preventDefault()
      e.stopPropagation()
    } 
  }
}
</script>

<style lang="less" scoped>
.train-keyboard {
  position: fixed;
  z-index: 10000;
  bottom: 0;
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  background: #fff;
  border-top: 0.5px solid #eee;
}

.train-keyboard-key {
  width: 33%;
  line-height: 3.33rem;
  text-align: center;
  border: 0.5px solid #eee;
  border-top: none;
  border-right: none;
}
</style>