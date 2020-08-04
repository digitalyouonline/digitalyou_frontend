<template>
  <v-row class="fill-height">
    <iframe frameBorder="0" :src="serviceUrls.browserUrl"> </iframe>
  </v-row>
</template>

<script>
import {mapGetters} from "vuex"

export default {
  name: "Home",
  components: {},
  computed: {
    ...mapGetters(["serviceUrls"])
  },
};
</script>
