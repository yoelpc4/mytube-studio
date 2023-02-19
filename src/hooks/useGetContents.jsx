import { useEffect, useState } from 'react'
import ContentService from '../services/ContentService.js'

const contentService = new ContentService()

export default function useGetContents() {
  const [data, setData] = useState([])

  const [dataCount, setDataCount] = useState(0)

  const [error, setError] = useState(null)

  const [isLoading, setIsLoading] = useState(false)

  const [page, setPage] = useState(0)

  const [pageSize, setPageSize] = useState(10)

  const [params, setParams] = useState({
    skip: page * pageSize,
    take: pageSize,
    sort: {
      field: 'createdAt',
      order: 'desc',
    },
  })

  useEffect(() => {
    let isMounted = true

    const loadContents = async () => {
      setIsLoading(true)

      setError(null)

      try {
        const response = await contentService.getContents(params)

        if (isMounted) {
          setData(response.data)

          setDataCount(response.meta.total)
        }
      } catch (err) {
        setError(err)
      } finally {
        setIsLoading(false)
      }
    }

    loadContents()

    return () => {
      isMounted = false
    }
  }, [params])

  function onPageChange(newPage) {
    setPage(newPage)

    setParams({
      ...params,
      skip: newPage * pageSize,
    })
  }

  function onPageSizeChange(newPageSize) {
    setPageSize(newPageSize)

    setParams({
      ...params,
      take: newPageSize,
    })
  }

  function onSortModelChange(newSortModel) {
    setParams({
      ...params,
      sort: {
        field: newSortModel[0].field,
        order: newSortModel[0].sort,
      },
    })
  }

  function onReload() {
    setParams({
      ...params,
    })
  }

  return {
    data,
    dataCount,
    error,
    isLoading,
    page,
    pageSize,
    onPageChange,
    onPageSizeChange,
    onSortModelChange,
    onReload,
  }
}
