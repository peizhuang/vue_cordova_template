<style lang="less">
    * {
        margin: 0;
        padding: 0;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0); /* make transparent link selection, adjust last value opacity 0 to 1.0 */
    }

    html, body {
        height: 100%;
        width: 100%;
        -webkit-touch-callout: none; /* prevent callout to copy image, etc when tap to hold */
        -webkit-text-size-adjust: none; /* prevent webkit from resizing text to fit */
        -webkit-user-select: none; /* prevent copy paste, to allow, change 'none' to 'text' */
    }

    #app {
        height: 100%;
        width: 100%;
    }
</style>

<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
  export default {
    data () {
      return {}
    }
  }
</script>
