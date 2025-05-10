<script setup lang="ts">
  defineProps(['activeTab', 'navigateTo'])
  // import { useRouter } from 'vue-router'
  // import { ref } from 'vue'

  // const router = useRouter()
  // const activeTab = ref('dashboard');
  //
  // const navigateTo = (tab: string) => {
  //   activeTab.value = tab;
  //   if (tab === 'dashboard') router.push('/dashboard');
  //   else if (tab === 'profile') router.push('/profile');
  //   else if (tab === 'past-jobs') router.push('/past-jobs');
  // }
</script>

<template>
  <v-bottom-navigation :elevation="24" grow mode="shift">
    <v-btn value="recent" @click="navigateTo('dashboard')">
      <v-icon>mdi-home</v-icon>

      <span>Dashboard</span>
    </v-btn>

    <v-btn value="favorites" @click="navigateTo('profile')">
      <v-icon>mdi-account</v-icon>

      <span>Profile</span>
    </v-btn>

    <!--    <v-btn value="nearby">-->
    <!--      <v-icon>mdi-map-marker</v-icon>-->

    <!--      <span>Past Jobs</span>-->
    <!--    </v-btn>-->
  </v-bottom-navigation>
</template>

<style scoped lang="sass">

</style>
