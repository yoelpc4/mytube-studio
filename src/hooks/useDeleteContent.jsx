import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { openAlert } from '@/store/alert.js'
import client from '@/utils/client.js';

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
      await client.delete(`contents/${contentToDelete.id}`)

      onReload()

      dispatch(openAlert({
        type: 'success',
        message: 'Content deleted successfully'
      }))
    } catch (error) {
      if (import.meta.env.DEV) {
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
