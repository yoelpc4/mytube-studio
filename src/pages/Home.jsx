import { useSelector } from 'react-redux'

export default function Home() {
  const user = useSelector(state => state.auth.user)

  return (
    <div>
      <h1>Home</h1>
      <p>{user.name}</p>
    </div>
  )
}
