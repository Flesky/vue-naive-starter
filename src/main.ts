import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { addMethod } from 'yup'
import App from './App.vue'

import './assets/main.css'

const meta = document.createElement('meta')
meta.name = 'naive-ui-style'
document.head.appendChild(meta)

axios.defaults.baseURL = import.meta.env.VITE_API_URL

// Extend yup with time() method that validates 12 hour time format using regex
addMethod(string, 'time', function () {
  // eslint-disable-next-line @typescript-eslint/no-invalid-this
  return this.test({
    name: 'time',
    test: (value) => {
      return /^(0?[1-9]|1[012])(:[0-5]\d) [AP]M$/.test(String(value))
    },
    message: 'Invalid time format',
    exclusive: true,
  })
})

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.use(router)
app.mount('#app')
