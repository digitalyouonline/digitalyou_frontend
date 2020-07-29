<template>
  <v-app>
    <v-navigation-drawer app mini-variant dark class="secondary">
      <v-list dense nav class="py-0" >
        <v-list-item two-line class="mini" align="center" to="/">
          <v-list-item-avatar>
            avatar
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Digital you</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>
        <v-list-item
          class="px-0 "
          v-for="item in navigation"
          :key="item.name"
          :to="item.name"
        >
          <v-list-item-avatar>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title class="title text-capitalize">{{
              item.name
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "App",

  components: {},

  data: () => ({
    // navigation: [{
    //   i: 'e'
    // }]
  }),
  computed: {
    ...mapGetters(["navigation"])
  }
};
</script>

<style>
iframe {
  width: 100%;
}
</style>
