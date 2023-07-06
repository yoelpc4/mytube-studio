import { createSlice } from '@reduxjs/toolkit'

const name = 'auth'

const authSlice = createSlice({
  name,
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload
    },
    unsetUser: (state) => {
      state.user = null
    },
  },
})

export const { setUser, unsetUser } = authSlice.actions

export const selectUser = state => state[name].user

export default authSlice.reducer
