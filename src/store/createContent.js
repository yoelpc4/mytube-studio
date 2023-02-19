import { createSlice } from '@reduxjs/toolkit'

const createContentSlice = createSlice({
  name: 'createContent',
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

export default createContentSlice.reducer
