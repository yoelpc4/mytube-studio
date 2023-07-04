import { createSlice } from '@reduxjs/toolkit'

const editContentSlice = createSlice({
  name: 'editContent',
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

export const selectIsEditContentDialogOpen = state => state.editContent.isEditContentDialogOpen

export const selectUpdatedContent = state => state.editContent.updatedContent

export const selectContentToEdit = state => state.editContent.contentToEdit

export default editContentSlice.reducer
