import { useCallback, useEffect, useRef, useState } from 'react'
import client from '@/utils/client.js';
import useAsync from '@/hooks/useAsync.jsx';

export default function useDataTable(url, initialParams) {
  const initialParamsRef = useRef(initialParams)

  const {isLoading, data, error, run} = useAsync()

  const [page, setPage] = useState(0)

  const [pageSize, setPageSize] = useState(10)

  const [params, setParams] = useState({
    ...initialParamsRef.current,
    skip: page * pageSize,
    take: pageSize,
  })

  const handlePageChange = useCallback(newPage => {
    setPage(newPage)

    setParams(params => ({
      ...params,
      skip: newPage * pageSize,
    }))
  }, [pageSize, setPage, setParams])

  const handlePageSizeChange = useCallback(newPageSize => {
    setPageSize(newPageSize)

    setParams(params => ({
      ...params,
      take: newPageSize,
    }))
  }, [setPageSize, setParams])

  const handleSortModelChange = useCallback(newSortModel => {
    if (!newSortModel.length) {
      return
    }

    setParams(params => ({
      ...params,
      sort: {
        field: newSortModel[0].field,
        order: newSortModel[0].sort,
      },
    }))
  }, [setParams])

  const reload = useCallback(() => setParams(params => ({
    ...params,
  })), [setParams])

  useEffect(() => {
    const controller = new AbortController()

    run(client.get(url, {
      signal: controller.signal,
      params,
    }).then(({data}) => data))

    return () => controller.abort()
  }, [run, url, params])

  return {
    data: data?.data ?? [],
    total: data?.meta?.total ?? 0,
    error,
    isLoading,
    page,
    pageSize,
    handlePageChange,
    handlePageSizeChange,
    handleSortModelChange,
    reload,
  }
}
