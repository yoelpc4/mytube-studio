import { createContext, useCallback, useReducer } from 'react';
import useSafeDispatch from '@/hooks/useSafeDispatch.jsx';

const ContentEventContext = createContext(null)

const initialState = {
  event: 'idle',
  content: null,
}

function ContentEventProvider(props) {
  const [{event, content}, dispatch] = useReducer(
    (state, action) => ({...state, ...action}),
    initialState
  )

  const safeDispatch = useSafeDispatch(dispatch)

  const isEventCreate = event === 'create'
  const isEventCreated = event === 'created'
  const isEventUpdate = event === 'update'
  const isEventUpdated = event === 'updated'
  const isEventDelete = event === 'delete'
  const isEventDeleted = event === 'deleted'

  const dispatchCreateContent = useCallback(() => safeDispatch({
    event: 'create',
    content: null,
  }), [safeDispatch])

  const dispatchContentCreated = useCallback(content => safeDispatch({
    event: 'created',
    content: content,
  }), [safeDispatch])

  const dispatchUpdateContent = useCallback(content => safeDispatch({
    event: 'update',
    content,
  }), [safeDispatch])

  const dispatchContentUpdated = useCallback(content => safeDispatch({
    event: 'updated',
    content,
  }), [safeDispatch])

  const dispatchDeleteContent = useCallback(content => safeDispatch({
    event: 'delete',
    content,
  }), [safeDispatch])

  const dispatchContentDeleted = useCallback(() => safeDispatch({
    event: 'deleted',
    content: null,
  }), [safeDispatch])

  const dispatchResetContent = useCallback(() => safeDispatch(initialState), [safeDispatch])

  const value = {
    event,
    content,
    isEventCreate,
    isEventCreated,
    isEventUpdate,
    isEventUpdated,
    isEventDelete,
    isEventDeleted,
    dispatchCreateContent,
    dispatchContentCreated,
    dispatchUpdateContent,
    dispatchContentUpdated,
    dispatchDeleteContent,
    dispatchContentDeleted,
    dispatchResetContent,
  }

  return <ContentEventContext.Provider value={value} {...props} />
}

export {
  ContentEventContext,
  ContentEventProvider,
}
