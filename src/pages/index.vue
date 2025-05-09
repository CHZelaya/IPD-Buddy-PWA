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
// // 🚧 TEMPORARY: Debug Cognito Auth Code on Splash Load
//   onMounted(() => {
//     const params = new URLSearchParams(window.location.search)
//     const code = params.get('code')
//
//     if (code) {
//       console.log('🔐 [DEBUG] Cognito OAuth2 Code:', code)
//       alert(`🔐 Auth Code Detected:\n${code}`)
//
//       // Optional: Clean up the URL
//       const url = new URL(window.location.href)
//       url.searchParams.delete('code')
//       window.history.replaceState({}, '', url.pathname)
//     }
//   })
//   // 🚧 END TEMP BLOCK — Comment this out when done testing


  const redirectToCognito = () => {
    // const clientId = '3rpecs9vhd5rsunmpncohc86t'
    // const domain = 'https://us-east-1cx6hm6gdc.auth.us-east-1.amazoncognito.com'
    // const redirectUri = 'http://localhost:3000' // <- updated for splash redirect
    // const responseType = 'code'

    // const cognitoUrl = `${domain}/login?client_id=${clientId}&response_type=${responseType}&scope=email+openid+profile&redirect_uri=${redirectUri}`
    // window.location.href = cognitoUrl
    window.location.href = 'http://localhost:8080/oauth2/authorization/cognito'
    // window.location.href = 'https://us-east-1cx6hm6gdc.auth.us-east-1.amazoncognito.com/login?client_id=...&redirect_uri=...&prompt=login'

  }
</script>

<style scoped>
.v-container {
  background-color: #121212; /* charcoal dark */
}
</style>
