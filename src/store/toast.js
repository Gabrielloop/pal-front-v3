import { defineStore } from 'pinia'
import Toastify from 'toastify-js'
import 'toastify-js/src/toastify.css'

export const useToastStore = defineStore('toast', {
  actions: {
    success(msg) {
        Toastify({
            text: msg,
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            className: 'toast-success',
          }).showToast()
          
    },
    warn(msg) {
      Toastify({
        text: msg,
        duration: 4000,
        close: true,
        gravity: 'top',
        position: 'right',
        className: "toast-warn", 
      }).showToast()
    },
    error(msg) {
      Toastify({
        text: msg,
        duration: 4000,
        close: true,
        gravity: 'top',
        position: 'right',
        className: "toast-error", 
      }).showToast()
    },
    info(msg) {
      Toastify({
        text: msg,
        duration: 3000,
        close: true,
        gravity: 'top',
        position: 'right',
        className: "toast-info", 
      }).showToast()
    },
  }
})
