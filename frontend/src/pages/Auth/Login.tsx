import { login } from "../../slices/authSlice"
import { RootState } from "../../store/store"
import { LoginType } from "../../@types/UserTypes"
import { FormEvent, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ThunkDispatch } from '@reduxjs/toolkit'

const Login = () => {

  const { user, loading, error, message } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()

  const [email, setEmail] = useState<string>('guss.oitenta@gmail.com')
  const [password, setPassword] = useState<string>('123456')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const user = {
      email,
      password,
    } as LoginType

    dispatch(login(user))

    if(user) {
      console.log(user)
    }
    if(message) {
      console.log(message)
    }
    if(error) {
      console.log(error)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <button type="submit">Entrar</button>
      </form>
    </div>
  )
}

export default Login
