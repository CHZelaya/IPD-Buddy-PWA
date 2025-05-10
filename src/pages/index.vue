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
    window.location.href = 'http://localhost:8080/oauth2/authorization/cognito'
  }
</script>

<style scoped>
.v-container {
  background-color: #121212; /* charcoal dark */
}
</style>
