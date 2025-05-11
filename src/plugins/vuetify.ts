/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'ipdBuddyTheme',
    themes: {
      ipdBuddyTheme: {
        dark: true,
        colors: {
          background: '#121212',
          surface: '#1E1E1E',
          primary: '#FF8C00',
          secondary: '#FFB347',
          onPrimary: '#FFFFFF',
          onSurface: '#FFFFFF',
        },
      },
    },
  },
})
