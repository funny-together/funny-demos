<template>
  <div id="app">
    <customer-input v-model="value"></customer-input>
  </div>
</template>

<script>
import CustomerInput from './components/input' 

export default {
  name: 'App',
  components: {
    CustomerInput
  },
  
  data() {
    return {
      value: ''
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
