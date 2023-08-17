import { useContext } from 'react';
import { ContentEventContext } from '@/contexts/contentEvent.jsx';

export default function useContentEvent() {
  const value = useContext(ContentEventContext)

  if (!value) {
    throw new Error('useContentEvent hook must be used inside ContentEventProvider component')
  }

  return value
}
