<style lang="less">

</style>

<template>
  <div><h1>hello vue_cordova</h1></div>
</template>

<script>
  export default {
    mounted () {
      console.dir(this.$ons)
      this.$ons.ready(() => {
        navigator.camera.getPicture(() => {
          alert('success')
        }, () => {
          alert('success')
        }, {quality: 50})
        document.addEventListener('offline', () => {
          alert('offLine')
        }, false)
        document.addEventListener('online', () => {
          alert('online')
        }, false)
        console.dir(this.$ons)
        navigator.notification.alert(
          'You are the winner!',  // message
          false,         // callback
          'Game Over',            // title
          'Done'                  // buttonName
        )
      })
    }
  }
</script>
