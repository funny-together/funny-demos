<template>
  <div id="train-number-input" class="train-input-block">
    <div :class="className" @click.stop="onFocus">
      <div class="train-input-text">
        <span v-for="(key, index) in textList" :key="index" :data-index="index">{{key}}</span>
      </div>
      <div v-if="!textList.length" class="train-input-placeholder">{{placeholder}}</div>
      <div class="train-input-cursor" v-show="cursorActive" :style="cursorStyle"></div>
    </div>

    <transition name="slide-bottom">
      <train-keyboard id="train-keyboard" v-show="showKeyboard" @onKeyPress="onKeyPress"></train-keyboard>
    </transition>
  </div>
</template>

<script>
import TrainKeyboard from './Keyboard.vue'

const contains = 
  document.contains && typeof document.contains === 'function' 
  ? function(parent, node) {
    return parent === node || parent.contains(node)
  }
  : function(parent, node) {
    while(node && node.parentNode) {
      if(node === parent) {
        return true
      }
      node = node.parent
    }
  }

const height = document.body.style.height

export default {
  model: {
    prop: 'initValue',
    event: 'onInput'
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: '请输入'
    },
    initValue: {
      type: String,
      default: ''
    },
    // 获焦时页面上推的高度
    scrollHeight: {
      type: Number,
      default: 0
    }
  },

  components: {
    TrainKeyboard
  },

  data() {
    return {
      textList: [],
      cursorPosition: 0,
      cursorActive: false,
      showKeyboard: false,
      cursorStyle: {
        // TODO:光标样式应该符合字体样式
      }
    }
  },

  computed: {
    className() {
      return `train-input${this.disabled ? ' train-input-disabled' : ''}${this.readonly ? ' train-input-readonly': ''}`
    }
  },

  watch: {
    autofocus(newVal) {
      if(newVal) {
        this.showKeyboard = true
      }
    }
  },

  mounted() {
    this.addCloseEventListener()
    if(this.initValue) {
      this.textList = this.initValue.split('')
    }
    if(!this.disabled && !this.readonly && this.autofocus) {
      this.$nextTick(() => {
        this.showKeyboard = true
        this.cursorActive = true
        this.onFocus()
      })
    }
  },

  beforeDestroy() {
    document.removeEventListener('click', this.closeKeyboard)
  },

  methods: {
    addCloseEventListener() {
      document.addEventListener('click', this.closeKeyboard)
    },

    onFocus(el) {
      el && el.stopPropagation()
      if(this.disabled || this.readonly) {
        return
      }
      this.showKeyboard = true
      this.$nextTick(() => {
        this.calcScrollHeight()
        this.cursorActive = true
      })
      const cursorPosition = el ? +el.target.dataset.index : this.textList.length
      this.cursorPosition = isNaN(cursorPosition) ? this.textList.length : cursorPosition
      this.moveCursor()
    },

    calcScrollHeight() {
      if(this.cursorActive) {
        return
      }
      const screenHeight = screen.height // 屏幕高度
      const pageHeight = document.body.clientHeight // 页面高度
      const input = document.querySelector('.train-input-block')
      const keyboardHeight = document.querySelector('#train-keyboard').offsetHeight // 键盘高度
      const inputBottom = input.getBoundingClientRect().bottom // 输入框底部距离页面高度
      const inputScrollTop = input.offsetTop // 输入框实际距离顶部高度
      const inputHeight = input.offsetHeight // 输入框自身高度
      const inputToBottomHeight = screenHeight - inputBottom // 输入框距离底部高度
      if(inputToBottomHeight < keyboardHeight) {
        const scrollHeight = keyboardHeight + this.scrollHeight - inputToBottomHeight
        if(inputScrollTop + scrollHeight + keyboardHeight + inputHeight > pageHeight) { // 如果页面自身高度不够滚动
          document.body.style.height = `${pageHeight + scrollHeight + keyboardHeight + inputHeight}px` // 增长页面使其可以滚动
        }
        window.scrollTo(0, window.pageYOffset + scrollHeight)
      }
    },

    closeKeyboard(e) {
      const dom = document.querySelector('#train-number-input')
      if(!contains(dom, e.target)) {
        this.finishInput()
      }
    },

    moveCursor() {
      const cursor = this.$el.querySelector('.train-input-cursor')
      const text = this.$el.querySelector('.train-input-text')
      const charactor = text.querySelector(`span:nth-child(${this.cursorPosition})`)
      const firstCharactor = text.querySelector('span:first-child')
      if (!charactor) {
        cursor.style.transform = `translate(0, -50%)`
        return
      }
      // 偏移量 = 字符左边距 + 字符自身宽度 - 第一个字符偏移量(padding-left)
      const cursorOffset = charactor.offsetLeft + charactor.offsetWidth - firstCharactor.offsetLeft
      const maxVisibleWidth = text.offsetWidth
      cursor.style.transform = `translate(${Math.min(maxVisibleWidth - 1, cursorOffset)}px, -50%)`
      text.style.transform = `translateX(${Math.min(0, maxVisibleWidth - cursorOffset)}px)`
    },

    onKeyPress({ key, value }) {
      switch(key) {
        case 'delete':
          this.deleteValue()
        break
        case 'enter' || 'esc':
          this.finishInput()
        break
        default:
          this.addValue(value)
      }
      this.$emit('onInput', this.textList.join(''))
    },

    deleteValue() {
      if(this.cursorPosition) {
        this.textList.splice(--this.cursorPosition, 1)
        this.$nextTick(() => {
          this.moveCursor()
        })
      }
    },

    finishInput() {
      this.showKeyboard = false
      this.cursorActive = false
      this.afterFinish()
    },

    afterFinish() {
      document.body.style.height = height
    },

    addValue(value) {
      this.textList.splice(this.cursorPosition++, 0, value)
      this.$nextTick(() => {
        this.moveCursor()
      })
    }
  }
}
</script>

<style lang="less">
body {
  transition: margin-top .2s;
}

.train-input {
  position: relative;
  height: 2.2rem;
  font-size: .75rem;
  line-height: 2.2rem;
  padding: 0 .4rem;
  border-top: .5px solid #eee;
  border-bottom: .5px solid #eee;
}

.train-input-placeholder {
  color: #ccc;
  font-weight: bold;
}

.train-input-text {
  width: 100%;
}

.train-input-cursor {
  pointer-events: none;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 1px;
  height: calc(100% - .75rem);
  background: #000;
  animation: blink 1s step-start infinite;
}

@keyframes blink {
  from, to { background: transparent; }
  50% { background: #000; }
}

.slide-bottom-enter-active {
  animation: slideBottomUp 0.2s;
}

.slide-bottom-leave-active {
  animation: slideBottomDown 0.2s;
}

@keyframes slideBottomUp {
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes slideBottomDown {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(100%);
  }
}
</style>