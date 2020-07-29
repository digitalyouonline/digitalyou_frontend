<template>
<v-row class="fill-height">
  <iframe :src=meetingsUrl frameBorder="0" allow="camera *;microphone *" >
  </iframe>
</v-row>
</template>

<script>
import config from "../../public/config/config.js";

export default {
  name: "Home",
  components: {
  },
  computed: {
    meetingsUrl(){
      return config.meetingsUrl;
    }
  }
};
</script>
