<template>
  <v-row class="fill-height">
    <iframe frameBorder="0" :src="browserUrl"> </iframe>
  </v-row>
</template>

<script>
import config from "../../public/config/config.js";

export default {
  name: "Home",
  components: {},
  computed: {
    browserUrl() {
      return config.browserUrl;
    }
  }
};
</script>
