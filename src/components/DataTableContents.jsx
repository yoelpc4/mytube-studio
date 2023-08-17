import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFileOutlined'
import VisibilityIcon from '@mui/icons-material/VisibilityOutlined'
import EditIcon from '@mui/icons-material/EditOutlined'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { openAlert } from '@/store/alert.js';
import useContentEvent from '@/hooks/useContentEvent.jsx';
import useDataTable from '@/hooks/useDataTable.jsx'
import { STATUS_DRAFT, STATUS_PUBLISHED } from '@/utils/constants.js'

export default function DataTableContents() {
  const dispatch = useDispatch()

  const {
    data,
    total,
    error,
    isLoading,
    page,
    pageSize,
    handlePageChange,
    handlePageSizeChange,
    handleSortModelChange,
    reload,
  } = useDataTable('contents', {
    sort: {
      field: 'createdAt',
      order: 'desc',
    },
  })

  const {
    content,
    isEventCreated,
    isEventUpdated,
    isEventDeleted,
    dispatchUpdateContent,
    dispatchDeleteContent,
  } = useContentEvent()

  const handleClickUpdateCellItem = id => {
    const content = data.find(content => content.id === id)

    if (!content) {
      return
    }

    dispatchUpdateContent(content)
  }

  const handleClickDeleteCellItem = id => {
    const content = data.find(content => content.id === id)

    if (!content) {
      return
    }

    dispatchDeleteContent(content)
  }

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
                dangerouslySetInnerHTML={{__html: description}}
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
        <GridActionsCellItem
          key={row.id}
          label="Edit"
          icon={<EditIcon/>}
          onClick={() => handleClickUpdateCellItem(row.id)}
        />,
        <GridActionsCellItem
          key={row.id}
          label="Delete"
          icon={<DeleteIcon/>}
          onClick={() => handleClickDeleteCellItem(row.id)}
        />,
      ]
    },
  ]

  const rows = data.map(content => ({
    ...content,
    createdAt: new Date(content.createdAt).toLocaleString(),
    updatedAt: new Date(content.updatedAt).toLocaleString(),
  }))

  useEffect(() => {
    if (!error) {
      return
    }

    dispatch(openAlert({
      type: 'error',
      message: 'An error occurred while fetching contents',
    }))
  }, [dispatch, error])

  useEffect(() => {
    if (!(isEventCreated || isEventUpdated || isEventDeleted)) {
      return
    }

    reload()
  }, [content, isEventCreated, isEventUpdated, isEventDeleted, reload])

  return (
    <Box sx={{width: '100%', height: 600}}>
      <DataGrid
        initialState={{sorting: {sortModel: [{field: 'createdAt', sort: 'desc'}]}}}
        loading={isLoading}
        columns={columns}
        rows={rows}
        rowCount={total}
        rowsPerPageOptions={[10, 25, 50, 75, 100]}
        pagination
        page={page}
        pageSize={pageSize}
        sortingMode="server"
        paginationMode="server"
        getRowId={row => row.id}
        getRowHeight={() => 'auto'}
        isRowSelectable={() => false}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        onSortModelChange={handleSortModelChange}
      />
    </Box>
  )
}
