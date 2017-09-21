<template>
  <div>
    <test></test>
  </div>
</template>

<script>
  import test from './test.vue'
  export default {
    name: 'home',
    data () {
      return {
        test: true
      }
    },
    components: {
      test
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
