import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'

type AuthResponse = {
  auth: boolean
  loading: boolean
}

export const useAuth = (): AuthResponse => {
  const { user } = useSelector((state: RootState) => state.auth)
  const [auth, setAuth] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    if (user) {
      if (user.data) {
        setAuth(true)
      } else {
        setAuth(false)
      }
    } else {
      setAuth(false)
    }

    setLoading(false)
  }, [user])

  return { auth, loading }
}
