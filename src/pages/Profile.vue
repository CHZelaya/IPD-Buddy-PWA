<script setup lang="ts">
  import { useContractorStore } from '@/stores/contractorStore';
  import { onMounted } from 'vue';
  import { computed } from 'vue';
  import { ref } from 'vue';

  const contractorStore = useContractorStore();
  const showSnackbar = ref(false);
  const snackbarText = ref('');
  const snackbarColor = ref('green'); //default color

  const taxRatePercent = computed({
    get: () => contractorStore.profile.taxRate * 100,
    set: (value: number) => contractorStore.profile.taxRate = value /100,
  });

  const savingsRatePercent = computed({
    get: () => contractorStore.profile.savingsRate * 100,
    set: (value: number) => contractorStore.profile.savingsRate = value /100,
  });

  onMounted(() => {
    contractorStore.fetchProfile(contractorStore.profile.email);
  });


  const handleSave = async () => {
    try{
      const result = await contractorStore.saveProfile(contractorStore.profile.email);
      console.log('Saved contractor profile:', result);
      // Snackbar on success
      snackbarText.value = 'Profile Updated Successfully!';
      snackbarColor.value = 'green';
      showSnackbar.value = true;

    } catch (err) {
      console.error('Save failed:', err);
      //Snackbar on failure
      snackbarText.value = 'Failed to update profile, please try again later'
      snackbarColor.value = 'red';
      showSnackbar.value = true;

    }
  }

</script>

<template>
  <v-container>
    <v-card class="pa-4">
      <v-card-title>Edit Profile </v-card-title>
      <v-card-text>
        <v-text-field
          hint="This information cannot be changed"
          label="First Name"
          :model-value="contractorStore.profile.firstName"
          readonly
          variant="underlined"
        />
        <v-text-field
          hint="This information cannot be changed"
          label="Last Name"
          :model-value="contractorStore.profile.lastName"
          readonly
          variant="underlined"
        />
        <v-text-field
          hint="This information cannot be changed"
          label="Email"
          :model-value="contractorStore.profile.email"
          readonly
          variant="underlined"
        />
        <v-text-field v-model="contractorStore.profile.phoneNumber" label="Phone Number" />
        <v-text-field v-model="taxRatePercent" label="Tax Rate (%)" min="0" type="number" />
        <v-text-field v-model="savingsRatePercent" label="Savings Rate (%)" min="0" type="number" />
      </v-card-text>
      <v-card-actions>
        <v-btn
          block
          class="my-2"
          color="primary"
          size="large"
          @click="handleSave"
        >
          Save Changes
        </v-btn>
      </v-card-actions>
    </v-card>

    <!--    Snack Bar-->
    <v-snackbar
      v-model="showSnackbar"
      :color="snackbarColor"
      location="top"
      :timeout="3000"
    >
      {{ snackbarText }}
    </v-snackbar>

  </v-container>
</template>

<style scoped lang="sass">

</style>
