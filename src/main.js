// src/main.js

import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

const app = createApp(App)
// mount returns the root component instance
const vm = app.mount('#app')

//
// ─── IDLE AUTO-LOGOUT SETUP ───────────────────────────────────────────────────
//

const IDLE_TIMEOUT = 5 * 60 * 1000  // 5 minutes in milliseconds
let idleTimer = null

function resetIdleTimer() {
  clearTimeout(idleTimer)
  // only start counting down if the user is logged in
  if (vm.isAuthenticated) {
    idleTimer = setTimeout(() => {
      vm.logout()  // calls your App.vue logout method
      alert('You’ve been logged out due to 5 minutes of inactivity.')
    }, IDLE_TIMEOUT)
  }
}

// listen for any user interaction to reset the timer
;[
  'mousemove', 'mousedown', 'keypress',
  'scroll',    'touchstart'
].forEach(evt => document.addEventListener(evt, resetIdleTimer))

// kick things off on page load
resetIdleTimer()
