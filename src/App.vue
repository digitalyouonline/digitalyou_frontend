<template>
  <v-app>
    <v-navigation-drawer app mini-variant dark class="secondary">
      <v-list dense nav class="py-0" >
        <v-list-item two-line class="mini px-0" align="center" to="/">
          <v-list-item-avatar>
            <img src="./assets/logo.png"/>
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
      <router-view v-if="loaded"></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import axios  from "axios";

export default {
  name: "App",

  components: {},

  data: () => ({
    loaded: false
  }),
  methods: {
    ...mapActions([
      "setServiceURLs"
    ])
  },
  computed: {
    ...mapGetters(["navigation"])
  },
  created: function () {
    axios.get("config/serviceUrls.json").then(response => {
      this.setServiceURLs(response.data)
      this.loaded = true
      console.log(this.loaded)
    });
  }
};
</script>

<style>
iframe {
  width: 100%;
}
</style>
