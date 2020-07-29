import { encodeBase64, decodeBase64, encodeUTF8 } from 'tweetnacl-util'

const sodium = require('libsodium-wrappers')
const bip39 = require('bip39')

export default ({
  async validateSignature (message, signature, publicKey) {
    await sodium.ready;

    return new Promise((resolve) => {
      publicKey = decodeBase64(publicKey)
      signature = decodeBase64(signature)

      var result = sodium.crypto_sign_open(signature, publicKey)

      console.log(result)
      resolve(result)
    })
  },
  async validateSignedAttempt (signedAttempt, publicKey) {
    await sodium.ready;

    return new Promise((resolve, reject) => {
    
      publicKey = decodeBase64(publicKey)
      signedAttempt = decodeBase64(signedAttempt)

      var signResult = sodium.crypto_sign_open(signedAttempt, publicKey)

      if(!signResult) {
        reject('Invalid signature.')
      }

      resolve(signResult)
    })
  },
  async decrypt (message, nonce, privateKey, pubkey) {
    await sodium.ready;

    console.log('message :>> ', message);
    console.log('nonce :>> ', nonce);
    console.log('privateKey :>> ', privateKey);
    console.log('pubkey :>> ', pubkey);

    return new Promise((resolve) => {
      message = decodeBase64(message)
      privateKey = sodium.crypto_sign_ed25519_sk_to_curve25519(decodeBase64(privateKey))
      pubkey = sodium.crypto_sign_ed25519_pk_to_curve25519(decodeBase64(pubkey))
      nonce = decodeBase64(nonce)

      var decrypted = sodium.crypto_box_open_easy(message, nonce, pubkey, privateKey)
      decrypted = encodeUTF8(decrypted)

      resolve(decrypted)
    })
  },
  async encrypt (message, privateKey, pubkey) {
    await sodium.ready;

    return new Promise((resolve) => {
      message = new TextEncoder().encode(message)
      privateKey = sodium.crypto_sign_ed25519_sk_to_curve25519(decodeBase64(privateKey))
      pubkey = sodium.crypto_sign_ed25519_pk_to_curve25519(decodeBase64(pubkey))

      var nonce = sodium.randombytes_buf(sodium.crypto_secretbox_NONCEBYTES)
      var encrypted = sodium.crypto_box_easy(message, nonce, pubkey, privateKey)
      resolve({
        encrypted: encodeBase64(encrypted),
        nonce: encodeBase64(nonce)
      })
    })
  },
  async generateKeys (phrase) {
    await sodium.ready;

    return new Promise((resolve) => {
      
      if (!phrase) phrase = bip39.entropyToMnemonic(sodium.randombytes_buf(sodium.crypto_box_SEEDBYTES / 2))
      var ken = new TextEncoder().encode(bip39.mnemonicToEntropy(phrase))
      var keys = sodium.crypto_sign_seed_keypair(ken)
      resolve({
        phrase,
        privateKey: encodeBase64(keys.privateKey),
        publicKey: encodeBase64(keys.publicKey)
      })
    })
  },
  getEdPkInCurve (pubkey) {
    return encodeBase64(sodium.crypto_sign_ed25519_pk_to_curve25519(decodeBase64(pubkey)))
  }
})
