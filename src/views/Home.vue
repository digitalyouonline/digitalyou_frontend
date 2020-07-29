<template>
  <section class="home fill-height">
    <v-row class="fill-height" align="center">
      <v-col align="center" justify="center">
        <v-row justify="center" class="my-10"> logo </v-row>
        <v-row justify="center">
          <div
            v-for="item in navigation"
            :key="item.logo"
            align="center"
            class="mx-5"
            @click="$router.push({ name: item.name })"
          >
            <v-icon>{{ item.icon }}</v-icon><br/>
            <span class="title text-capitalize">
              {{ item.name }}
            </span>
          </div>
        </v-row>
      </v-col>
    </v-row>
  </section>
</template>

<script>
import { mapGetters } from "vuex"
export default {
  name: "Home",
  components: {},
  computed: {
    ...mapGetters(["navigation"]),
  },
}
</script>
