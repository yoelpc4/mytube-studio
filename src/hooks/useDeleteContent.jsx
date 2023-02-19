import { useDispatch } from 'react-redux'
import { useState } from 'react'
import ContentService from '../services/ContentService.js'
import { openAlert } from '../store/alert.js'

const contentService = new ContentService()

export default function useDeleteContent({ onReload }) {
  const dispatch = useDispatch()

  const [contentToDelete, setContentToDelete] = useState(null)

  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false)

  async function onOpenDeleteContentDialog(content) {
    setIsOpenDeleteDialog(true)

    setContentToDelete(content)
  }

  async function onDeleteContentConfirmed() {
    try {
      await contentService.deleteContent(contentToDelete.id)

      onReload()
    } catch (error) {
      if (import.meta.env.MODE === 'development') {
        console.log(error)
      }

      dispatch(openAlert({
        type: 'error',
        message: 'An error occurred while deleting content'
      }))
    } finally {
      onDeleteContentCancelled()
    }
  }

  function onDeleteContentCancelled() {
    setContentToDelete(null)

    setIsOpenDeleteDialog(false)
  }

  return {
    contentToDelete,
    isOpenDeleteDialog,
    onOpenDeleteContentDialog,
    onDeleteContentConfirmed,
    onDeleteContentCancelled,
  }
}
