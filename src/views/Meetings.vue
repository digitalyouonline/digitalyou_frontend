<template>
<v-row class="fill-height">
  <iframe :src="meetingsUrl" frameBorder="0" allow="camera *;microphone *" >
  </iframe>
</v-row>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "Home",
  components: {
  },
  computed: {
    ...mapGetters(["serviceUrls","user"]),
    meetingsUrl(){
      return `${this.serviceUrls.meetingsUrl}?${this.user.name}`
    }
  },
};
</script>
