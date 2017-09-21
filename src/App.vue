<template>
  <!--<v-ons-page id="app">
    <v-ons-splitter>
      <v-ons-splitter-side swipeable collapse width="250px"
        :animation="$ons.platform.isAndroid() ? 'overlay' : 'reveal'"
        :open.sync="menuIsOpen">
        <menu-page></menu-page>
      </v-ons-splitter-side>

      <v-ons-splitter-content>
        <home-page></home-page>
      </v-ons-splitter-content>
    </v-ons-splitter>
  </v-ons-page>-->
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
