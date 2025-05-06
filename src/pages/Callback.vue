<template>
  <v-container class="fill-height d-flex justify-center align-center">
    <v-progress-circular color="orange-darken-2" indeterminate size="64" />
  </v-container>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  const route = useRoute()
  const router = useRouter()

  onMounted(async () => {
    //? Grabbing the code from the url
    const code = route.query.code as string

    if (!code) { //? Redirects back to log in if there is no code.
      router.push('/')
      return
    }

    try{
      //? Sending code to the Spring Boot server for a token exchange
      const response = await fetch('http://localhost:8080/oauth2/exchange-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      })

      if (!response.ok) {
        throw new Error('Token exchange failed')
      }

      const data = await response.json()
      localStorage.setItem('token', data.token)

    } catch (error) {
      console.error(error)
      router.push('/')
      return
    }


  })
</script>

<style scoped lang="sass">

</style>
