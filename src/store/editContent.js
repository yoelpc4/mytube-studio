import { createSlice } from '@reduxjs/toolkit'

const name = 'editContent'

const editContentSlice = createSlice({
  name,
  initialState: {
    contentToEdit: null,
    isEditContentDialogOpen: false,
    updatedContent: null,
  },
  reducers: {
    openEditContentDialog: (state, { payload }) => {
      state.contentToEdit = payload

      state.isEditContentDialogOpen = true
    },
    closeEditContentDialog: (state) => {
      state.isEditContentDialogOpen = false

      state.contentToEdit = null

      state.updatedContent = null
    },
    setUpdatedContent: (state, { payload }) => {
      state.updatedContent = payload
    },
  },
})

export const { openEditContentDialog, closeEditContentDialog, setUpdatedContent } = editContentSlice.actions

export const selectIsEditContentDialogOpen = state => state[name].isEditContentDialogOpen

export const selectUpdatedContent = state => state[name].updatedContent

export const selectContentToEdit = state => state[name].contentToEdit

export default editContentSlice.reducer
