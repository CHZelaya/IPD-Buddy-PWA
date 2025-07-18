<template>
  <v-container class="fill-height d-flex flex-column justify-center align-center text-center" fluid>
    <div>
      <v-img class="mb-4" max-height="200" src="@/assets/IPD-Buddy.png" />

      <div class="mb-8 text-center">
        <div class="text-body-2 font-weight-light mb-n1">Welcome to</div>
        <h1 class="text-h2 font-weight-bold">IPD Buddy</h1>
        <p class="text-subtitle-1 font-weight-light mb-8">Track. Submit. Get Paid</p>

        <v-text-field
          v-model="email"
          class="mb-4"
          color="orange-darken-2"
          label="Email"
          required
          type="email"
          variant="outlined"
        />
        <v-text-field
          v-model="password"
          :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
          class="mb-4"
          color="orange-darken-2"
          label="Password"
          :type="showPassword ? 'text' : 'password'"
          variant="outlined"
          @click:append-inner="showPassword = !showPassword"
        />

        <v-btn
          class="text-white text-h6 px-10 py-4 mb-2"
          color="orange-darken-2"
          size="large"
          @click="login"
        >
          Log In
        </v-btn>

        <div v-if="errorMessage" class="text-red mt-2">{{ errorMessage }}</div>
      </div>
    </div>
  </v-container>
  <AppFooter />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { auth } from '@/services/firebase-init';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router';
import AppFooter from '@/components/AppFooter.vue';

const email = ref('');
const password = ref('');
const errorMessage = ref('');
const showPassword = ref(false);
const router = useRouter();

const login = async () => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
    const user = userCredential.user;

    // Grabbing the token from Firebase
    const token = await user.getIdToken();

    //Storing it in localStorage
    localStorage.setItem('jwt', token);
    console.log('Logged in successfully!');
    router.push('/dashboard');
  } catch (error: any) {
    errorMessage.value = error.message;
  }
};
</script>

<style scoped>
.v-container {
  background-color: #121212; /* charcoal dark */
}
.text-red {
  color: #ff5252;
}
</style>
