<template>
  <v-container class="fill-height d-flex flex-column justify-center align-center text-center" fluid>
    <div>
      <v-img
        class="mb-4"
        max-height="200"
        src="@/assets/IPD-Buddy.png"
      />

      <div class="mb-8 text-center">
        <div class="text-body-2 font-weight-light mb-n1">Welcome to</div>
        <h1 class="text-h2 font-weight-bold">IPD Buddy</h1>
        <p class="text-subtitle-1 font-weight-light mb-8"> Track. Submit. Get Paid</p>
        <v-btn
          class="text-white text-h6 px-10 py-4"
          color="orange-darken-2"
          size="large"
          @click="redirectToCognito"
        >
          Log in
        </v-btn>
      </div>
    </div>
  </v-container>
</template>

<script setup lang="ts">
  const redirectToCognito = () => {
    const clientId = '4eb6ni1ndmiavn52qf00itpeal'
    const domain = 'us-east-1cx6hm6gdc.auth.us-east-1.amazoncognito.com'
    const redirectUri = 'https://d84l1y8p4kdic.cloudfront.net'
    const responseType = 'code'

    const cognitoUrl = `${domain}/login?client_id=${clientId}&response_type=${responseType}&scope=email+openid+phone&redirect_uri=${redirectUri}`
    console.log(cognitoUrl)
    window.location.href = 'https://us-east-1cx6hm6gdc.auth.us-east-1.amazoncognito.com/login?client_id=4eb6ni1ndmiavn52qf00itpeal&response_type=code&scope=email+openid+phone&redirect_uri=https%3A%2F%2Fd84l1y8p4kdic.cloudfront.net'
  }
</script>

<style scoped>
.v-container {
  background-color: #121212; /* charcoal dark */
}
</style>
