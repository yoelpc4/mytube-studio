import { configureStore } from '@reduxjs/toolkit'
import auth from './auth.js'

export default configureStore({
  reducer: {
    auth,
  }
})
