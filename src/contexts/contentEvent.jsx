import { createContext, useCallback, useContext, useReducer } from 'react';
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
    isEventCreate: event === 'create',
    isEventCreated: event === 'created',
    isEventUpdate: event === 'update',
    isEventUpdated: event === 'updated',
    isEventDelete: event === 'delete',
    isEventDeleted: event === 'deleted',
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

function useContentEvent() {
  const value = useContext(ContentEventContext)

  if (!value) {
    throw new Error('useContentEvent hook must be used inside ContentEventProvider component')
  }

  return value
}

export {
  ContentEventContext,
  ContentEventProvider,
  useContentEvent,
}
