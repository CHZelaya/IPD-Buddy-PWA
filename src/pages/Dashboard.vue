<template>
  <v-container fluid class="py-5">
    <v-banner v-if="!isOnline" color="warning" icon="mdi-wifi-off" class="mb-4">
      You are currently offline. Some features may be unavailable.
    </v-banner>

    <v-row justify="center">
      <v-col cols="12" md="10" lg="8">
        <!-- Profile Section -->
        <v-sheet elevation="1" rounded="lg" class="pa-6 mb-6" color="surface" width="100%">
          <v-row justify="space-between" align="center" class="flex-wrap">
            <!-- Left Side: Greeting + Info -->
            <div class="d-flex flex-column">
              <h1 class="text-h5 font-weight-bold mb-3">
                Welcome back, {{ contractorStore.profile.firstName }}!
              </h1>

              <v-divider class="mb-3" />

              <p class="text-body-2 text-medium-emphasis d-flex align-center mb-2">
                <v-icon start icon="mdi-phone" size="18" class="me-2" />
                {{ contractorStore.profile.phoneNumber }}
              </p>

              <p class="text-body-2 text-medium-emphasis d-flex align-center mb-2">
                <v-icon start icon="mdi-email" size="18" class="me-2" />
                {{ contractorStore.profile.email }}
              </p>

              <p class="text-body-2 text-medium-emphasis d-flex align-center">
                <v-icon start icon="mdi-calendar" size="18" class="me-2" />
                {{ today }}
              </p>
            </div>

            <!-- Right Side: Avatar/Icon -->
            <v-avatar size="64" class="mt-4 mt-sm-0">
              <v-icon icon="mdi-account-circle" size="64" color="primary" />
            </v-avatar>
          </v-row>
        </v-sheet>

        <!-- Earnings Summary Section -->
        <v-sheet class="pa-4 mb-4" color="surface">
          <h2 class="text-h5 mb-4">Earnings Summary</h2>

          <v-row dense>
            <v-col cols="6" sm="4">
              <v-sheet class="pa-3" color="surface" elevation="2" rounded>
                <p class="text-h5">
                  <count-up
                    :decimal-places="2"
                    :start-val="0"
                    :end-val="contractorStore.profile.earningsSummary.totalEarnings"
                    :duration="2.5"
                    :options="{
                      prefix: '$',
                      useEasing: true,
                    }"
                  >
                  </count-up>
                </p>
                <small>Total Earnings</small>
              </v-sheet>
            </v-col>
            <v-col cols="6" sm="4">
              <v-sheet class="pa-3" color="surface" elevation="2" rounded>
                <p class="text-h5">
                  <count-up
                    :decimal-places="2"
                    :start-val="0"
                    :end-val="contractorStore.profile.earningsSummary.highestJobValue"
                    :duration="2.5"
                    :options="{
                      prefix: '$',
                      useEasing: true,
                    }"
                  >
                  </count-up>
                </p>
                <small>Highest Job</small>
              </v-sheet>
            </v-col>
            <v-col cols="6" sm="4">
              <v-sheet class="pa-3" color="surface" elevation="2" rounded>
                <p class="text-h5">
                  <count-up
                    :decimal-places="2"
                    :start-val="0"
                    :end-val="contractorStore.profile.earningsSummary.earnedThisYear"
                    :duration="2.5"
                    :options="{
                      prefix: '$',
                      useEasing: true,
                    }"
                  >
                  </count-up>
                </p>
                <small>Earned This Year</small>
              </v-sheet>
            </v-col>
            <v-col cols="6" sm="4">
              <v-sheet class="pa-3" color="surface" elevation="2" rounded>
                <p class="text-h5">
                  <count-up
                    :decimal-places="2"
                    :start-val="0"
                    :end-val="contractorStore.profile.earningsSummary.earnedThisMonth"
                    :duration="2.5"
                    :options="{
                      prefix: '$',
                      useEasing: true,
                    }"
                  >
                  </count-up>
                </p>
                <small>Earned This Month</small>
              </v-sheet>
            </v-col>

            <v-col cols="6" sm="4">
              <v-sheet class="pa-3" color="surface" elevation="2" rounded>
                <p class="text-h5">
                  <count-up
                    :decimal-places="2"
                    :start-val="0"
                    :end-val="contractorStore.profile.earningsSummary.earnedThisWeek"
                    :duration="2.5"
                    :options="{
                      prefix: '$',
                      useEasing: true,
                    }"
                  >
                  </count-up>
                </p>
                <small>Earned This Week</small>
              </v-sheet>
            </v-col>

            <v-col cols="6" sm="4">
              <v-sheet class="pa-3" color="surface" elevation="2" rounded>
                <p class="text-h5">
                  <count-up
                    :decimal-places="2"
                    :start-val="0"
                    :end-val="contractorStore.profile.earningsSummary.averageJobValue"
                    :duration="2.5"
                    :options="{
                      prefix: '$',
                      useEasing: true,
                    }"
                  >
                  </count-up>
                </p>
                <small> Average Job</small>
              </v-sheet>
            </v-col>
          </v-row>
        </v-sheet>

        <!-- Primary Actions -->
        <v-sheet class="pa-4 mb-4" color="surface">
          <v-row justify="center">
            <v-col cols="12" sm="6">
              <v-btn block class="mb-2" color="primary" size="large" @click="navigateTo('newJob')">
                START NEW JOB
              </v-btn>
              <v-btn
                block
                class="mb-2"
                color="secondary"
                size="large"
                @click="navigateTo('pastJobs')"
              >
                VIEW PAST JOBS
              </v-btn>
            </v-col>
          </v-row>
        </v-sheet>

        <!-- Recent Activity
        <v-sheet class="pa-4" color="surface">
          <h2 class="text-h5 mb-2">Recent Activity</h2>
          <p>🚧🚜🔧 Under Construction 🚧🚜🔧</p>
        </v-sheet> -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useContractorStore } from '@/stores/contractorStore';
import { useRouter } from 'vue-router';
const router = useRouter();
import { getAuth } from 'firebase/auth';
import { useNetworkStatus } from '@/composables/useNetworkStatus';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import CountUp from 'vue-countup-v3';

const { isOnline } = useNetworkStatus();
const activeTab = ref('dashboard');

function getCurrentUserEmail() {
  const auth = getAuth();
  const user = auth.currentUser;
  return user?.email || '';
}

function navigateTo(tab: string) {
  if (tab === 'newJob') router.push('/newJob');
  else if (tab === 'pastJobs') router.push('/pastJobs');
}

const contractorStore = useContractorStore();

onMounted(() => {
  const email = getCurrentUserEmail();
  contractorStore.fetchProfile(email);
});

const today = new Date().toLocaleDateString();
</script>
