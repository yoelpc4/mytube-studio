import { configureStore } from '@reduxjs/toolkit'
import auth from './auth.js'
import alert from './alert.js'
import createContent from './createContent.js'
import csrf from './csrf.js';
import editContent from './editContent.js'

export default configureStore({
  reducer: {
    auth,
    alert,
    createContent,
    csrf,
    editContent,
  }
})
