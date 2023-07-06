import { createSlice } from '@reduxjs/toolkit'

const name = 'createContent'

const createContentSlice = createSlice({
  name,
  initialState: {
    isCreateContentDialogOpen: false,
    createdContent: null,
  },
  reducers: {
    openCreateContentDialog: (state) => {
      state.isCreateContentDialogOpen = true
    },
    closeCreateContentDialog: (state) => {
      state.isCreateContentDialogOpen = false

      state.createdContent = null
    },
    setCreatedContent: (state, { payload }) => {
      state.createdContent = payload
    },
  },
})

export const { openCreateContentDialog, closeCreateContentDialog, setCreatedContent } = createContentSlice.actions

export const selectIsCreateContentDialogOpen = state => state[name].isCreateContentDialogOpen

export const selectCreatedContent = state => state[name].createdContent

export default createContentSlice.reducer
