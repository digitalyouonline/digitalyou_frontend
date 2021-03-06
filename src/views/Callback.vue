<template>
  <section class="login">
    <v-card style="min-width: 300px;">
      <v-toolbar class="primary">
        <h1 class="headline white--text text-xs-center fw">
          Verifying auth for {{ username }}
        </h1>
      </v-toolbar>
      <v-form>
        <v-card-text>
          <v-layout column align-center v-if="!verified && !error">
            <v-progress-circular
              :size="100"
              :width="15"
              color="accent"
              indeterminate
            >
            </v-progress-circular>
          </v-layout>
          <v-layout class="text-xs-center" align-center v-if="error">
            <v-icon left color="orange">info</v-icon>
            <span v-if="error">{{ error }}</span>
          </v-layout>
          <v-layout column align-center v-if="verified">
            <v-icon>check</v-icon>
            <p>Ok</p>
          </v-layout>
        </v-card-text>
      </v-form>
    </v-card>
  </section>
</template>

<script>
import config from "../../public/config/config";
import cryptoService from "../services/CryptoService";
import threebotService from "../services/threebotService";
import {mapActions} from "vuex";

export default {
  name: "callback",
  data() {
    return {
      username: null,
      verified: false,
      error: null,
    };
  },
  methods: {
    ...mapActions([
      "setUser"
    ])
  },
  async mounted() {
    let url = new URL(window.location.href);

    let error = url.searchParams.get("error");

    if (error) {
      console.log("Error: ", error);
      return;
    }

    let signedAttemptObject = JSON.parse(url.searchParams.get("signedAttempt"));
    let user = signedAttemptObject["doubleName"];
    let userPublicKey = (await threebotService.getUserData(user)).data
      .publicKey;

    console.log(signedAttemptObject);
    console.log("user: " + user);
    console.log("userPublicKey: " + userPublicKey);

    let verifiedSignedAttempt;

    try {
      var utf8ArrayToStr = (function() {
        var charCache = new Array(128);
        var charFromCodePt = String.fromCodePoint || String.fromCharCode;
        var result = [];

        return function(array) {
          var codePt, byte1;
          var buffLen = array.length;

          result.length = 0;

          for (var i = 0; i < buffLen; ) {
            byte1 = array[i++];

            if (byte1 <= 0x7f) {
              codePt = byte1;
            } else if (byte1 <= 0xdf) {
              codePt = ((byte1 & 0x1f) << 6) | (array[i++] & 0x3f);
            } else if (byte1 <= 0xef) {
              codePt =
                ((byte1 & 0x0f) << 12) |
                ((array[i++] & 0x3f) << 6) |
                (array[i++] & 0x3f);
            } else if (String.fromCodePoint) {
              codePt =
                ((byte1 & 0x07) << 18) |
                ((array[i++] & 0x3f) << 12) |
                ((array[i++] & 0x3f) << 6) |
                (array[i++] & 0x3f);
            } else {
              codePt = 63;
              i += 3;
            }

            result.push(
              charCache[codePt] || (charCache[codePt] = charFromCodePt(codePt))
            );
          }

          return result.join("");
        };
      })();
      verifiedSignedAttempt = JSON.parse(
        utf8ArrayToStr(
          await cryptoService.validateSignedAttempt(
            signedAttemptObject["signedAttempt"],
            userPublicKey
          )
        )
      );

      if (!verifiedSignedAttempt) {
        console.log("The signedAttempt could not be verified.");
        return;
      }

      let state = window.localStorage.getItem("state");

      if (verifiedSignedAttempt["signedState"] !== state) {
        console.log("The state cannot be matched.");
        return;
      }

      if (verifiedSignedAttempt["doubleName"] !== user) {
        console.log("The name cannot be matched.");
        return;
      }
    } catch (e) {
      console.log("The signedAttempt could not be verified.");
      return;
    }

    console.log(verifiedSignedAttempt);

    let encryptedData = verifiedSignedAttempt["data"];

    // Keys from the third party app itself, or a temp keyset if it is a front-end only third party app.
    let keys = await cryptoService.generateKeys(config.seedPhrase);

    console.log("seedphraze: " + config.seedPhrase);

    let decryptedData = JSON.parse(
      await cryptoService.decrypt(
        encryptedData.ciphertext,
        encryptedData.nonce,
        keys.privateKey,
        userPublicKey
      )
    );
    decryptedData["name"] = user;

    // SEI = Signed Email Identifier, this is used to link the email to the doubleName and verify it.
    if (!decryptedData.email || !decryptedData.email.sei) {
      console.log(
        "No sei was given from the app, if your app requires email, the flow stops here."
      );
    } else {
      // To verify the SEI, you could use the function implemented by openKYC or verify it yourself using openKYC his publicKey.
      let seiVerified = await threebotService.verifySignedEmailIdentifier(
        decryptedData.email.sei
      );

      if (!seiVerified || seiVerified.status !== 200) {
        console.log(
          "sei could not be verified, something went wrong or someone is trying to forge his email verification."
        );
        return;
      }

      console.log(
        "We verified that " +
          seiVerified.data.email +
          " belongs to " +
          seiVerified.data.identifier +
          " and has a valid verification."
      );
    }
    this.setUser(decryptedData)
    window.localStorage.setItem("profile", JSON.stringify(decryptedData));
    this.$router.push({ name: "Home" });
  },
};
</script>
