import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

export const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi'
  },
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        dark: false,
        colors: {
          primary: '#695497',
          secondary: '#A79DCB',
          abu_muda: '#D9D9D9',
          hitam: '#383838'
        }
      }
    }
  }
})
