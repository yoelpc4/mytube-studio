import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFileOutlined'
import VisibilityIcon from '@mui/icons-material/VisibilityOutlined'
import EditIcon from '@mui/icons-material/EditOutlined'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import DialogDeleteContent from './DialogDeleteContent.jsx'
import { openEditContentDialog } from '../store/editContent.js'
import useGetContents from '../hooks/useGetContents.jsx'
import useDeleteContent from '../hooks/useDeleteContent.jsx'
import { STATUS_DRAFT, STATUS_PUBLISHED } from '../constants.js'
import { openAlert } from '../store/alert.js';

export default function DataTableContents() {
  const dispatch = useDispatch()

  const createdContent = useSelector(state => state.createContent.createdContent)

  const updatedContent = useSelector(state => state.editContent.updatedContent)

  const {
    data,
    dataCount,
    error,
    isLoading,
    page,
    pageSize,
    onPageChange,
    onPageSizeChange,
    onSortModelChange,
    onReload
  } = useGetContents()

  const {
    contentToDelete,
    isOpenDeleteDialog,
    onOpenDeleteContentDialog,
    onDeleteContentConfirmed,
    onDeleteContentCancelled
  } = useDeleteContent({onReload})

  const columns = [
    {
      field: 'id',
      headerName: '#',
      disableColumnMenu: true,
      sortable: false,
      hideable: false,
      width: 5,
      valueGetter: ({api, row}) => {
        const index = api.getRowIndexRelativeToVisibleRows(row.id)

        return typeof index === 'number' ? index + 1 : null
      },
    },
    {
      field: 'title',
      headerName: 'Video',
      filterable: false,
      hideable: false,
      width: 650,
      renderCell: ({row}) => {
        const description = row.description ? row.description.replaceAll("\n", '<br>') : ''

        return (
          <Box sx={{display: 'flex', my: 2}}>
            <video
              title={row.title}
              src={row.videoUrl}
              poster={row.thumbnailUrl}
              width="120px"
              style={{opacity: row.status === STATUS_PUBLISHED ? 1 : .5}}
            >
            </video>

            <Box sx={{ml: 2}}>
              <Typography
                variant="body2"
                sx={{
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {row.title}
              </Typography>

              <Typography
                color="gray"
                variant="caption"
                dangerouslySetInnerHTML={{ __html: description }}
                sx={{
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
              </Typography>
            </Box>
          </Box>
        )
      },
    },
    {
      field: 'status',
      headerName: 'Status',
      filterable: false,
      width: 150,
      renderCell: ({value}) => {
        if (value === STATUS_DRAFT) {
          return (
            <>
              <InsertDriveFileIcon fontSize="small" sx={{mr: '3px'}}/> {STATUS_DRAFT}
            </>
          )
        }

        if (value === STATUS_PUBLISHED) {
          return (
            <>
              <VisibilityIcon fontSize="small" sx={{mr: '3px'}}/> {STATUS_PUBLISHED}
            </>
          )
        }

        return ''
      },
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      filterable: false,
      width: 200,
    },
    {
      field: 'updatedAt',
      headerName: 'Updated At',
      filterable: false,
      width: 200,
    },
    {
      field: 'action',
      headerName: 'Action',
      type: 'actions',
      disableColumnMenu: true,
      sortable: false,
      hideable: false,
      width: 100,
      getActions: ({row}) => [
        <GridActionsCellItem icon={<EditIcon/>} onClick={() => onEditContent(row.id)} label="Edit"/>,
        <GridActionsCellItem icon={<DeleteIcon/>} onClick={() => onDeleteContent(row.id)} label="Delete"/>,
      ]
    },
  ]

  const rows = useMemo(() => data.map(content => ({
    ...content,
    createdAt: new Date(content.createdAt).toLocaleString(),
    updatedAt: new Date(content.updatedAt).toLocaleString(),
  })), [data])

  useEffect(() => {
    if (!error) {
      return
    }

    if (import.meta.env.DEV) {
      console.log(error)
    }

    dispatch(openAlert({
      type: 'error',
      message: 'An error occurred while fetching contents',
    }))
  }, [error])

  useEffect(() => {
    if (createdContent) {
      onReload()
    }
  }, [createdContent])

  useEffect(() => {
    if (updatedContent) {
      const isContentsUpdated = data.reduce((isContentsUpdated, content) => {
        if (content.id === updatedContent.id) {
          isContentsUpdated = true
        }

        return isContentsUpdated
      }, false)

      if (isContentsUpdated) {
        onReload()
      }
    }
  }, [updatedContent])

  function onEditContent(id) {
    const content = data.find(content => content.id === id)

    if (!content) {
      return
    }

    dispatch(openEditContentDialog(content))
  }

  function onDeleteContent(id) {
    const content = data.find(content => content.id === id)

    if (!content) {
      return
    }

    onOpenDeleteContentDialog(content)
  }

  return (
    <Box sx={{width: '100%', height: 600}}>
      <DataGrid
        loading={isLoading}
        columns={columns}
        rows={rows}
        rowCount={dataCount}
        rowsPerPageOptions={[10, 25, 50, 75, 100]}
        pagination
        page={page}
        pageSize={pageSize}
        sortingMode="server"
        paginationMode="server"
        getRowId={row => row.id}
        getRowHeight={() => 'auto'}
        isRowSelectable={() => false}
        onSortModelChange={onSortModelChange}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />

      <DialogDeleteContent
        content={contentToDelete}
        isOpen={isOpenDeleteDialog}
        onConfirmed={onDeleteContentConfirmed}
        onCancelled={onDeleteContentCancelled}
      />
    </Box>
  )
}
