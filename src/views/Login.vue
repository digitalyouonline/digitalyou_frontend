<template>
  <v-row>
    loggin in
  </v-row>
</template>

<script>
import config from "../../public/config/config"
import CryptoService from "../services/CryptoService"
var randomstring = require("randomstring")

export default {
  name: "App",

  components: {},
  methods: {
    async login() {
      var state = randomstring.generate()
      window.localStorage.setItem("state", state)
      var keys = await CryptoService.generateKeys(config.seedPhrase)
      var appid = config.appId
      var scope = JSON.stringify({
        doubleName: true,
        email: false,
      })
      this.redirect(state, scope, appid, keys.publicKey, config.redirect_url)
    },
    async redirect(state, scope, appid, publicKey, redirectUrl) {
      window.location.href = `${
        config.botFrontEnd
      }?state=${state}&scope=${scope}&appid=${appid}&publickey=${encodeURIComponent(
        CryptoService.getEdPkInCurve(publicKey)
      )}&redirecturl=${encodeURIComponent(redirectUrl)}`
    },
  },
  mounted() {
    this.login()
  },
}
</script>
