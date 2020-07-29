<template>
  <v-row class="fill-height">
    <iframe frameBorder="0" :src="filebrowserUrl"> </iframe>
  </v-row>
</template>

<script>
import config from "../../public/config/config.js";

export default {
  name: "Home",
  components: {},
  computed: {
    filebrowserUrl() {
      return config.filebrowserUrl;
    }
  }
};
</script>
