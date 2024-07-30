import { useEffect, useRef, useState } from "react"
import UsersList from "../../components/UsersList"
interface User {
  id: string
  avatar_url: string
  login: string
}

export function Home() {
  const [users, setUsers] = useState<User[]>([])
  const [page, setPage] = useState<number>(1)
  const [hasMore, setHasMore] = useState<boolean>(false)
  const lastUserRef = useRef<HTMLDivElement>(null)
  const observer = useRef<IntersectionObserver>(null)

  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      const lastEntry = entries[entries.length - 1]
      if (lastEntry.isIntersecting) {
        fetchUsers()
      }
    })

    if (lastUserRef.current) {
      observer.current.observe(lastUserRef.current)
    }
    return () => {
      if (lastUserRef.current && observer.current) {
        observer.current.unobserve(lastUserRef.current)
      }
    }
  }, [users, hasMore])

  const fetchUsers = async () => {
    const response = await fetch(
      `https://api.github.com/users?since=${page}&per_page=5`
    )
    const data = await response.json()
    if (data.length === 0) {
      setHasMore(false)
    } else {
      setUsers([...users, ...data])
      setPage(page + 5)
    }
  }
  return (
    <div>
      <UsersList users={users} />
      <div ref={lastUserRef}>Carregando</div>
    </div>
  )
}
