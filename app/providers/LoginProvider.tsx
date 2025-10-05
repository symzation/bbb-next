"use client"

import { createContext, useContext, useState } from "react"

type LoginState = {
  provider?: string
  isAdmin?: boolean
}

type LoginContextProps = {
  loginState: LoginState
  updateLoginState: (newState: LoginState) => void
}

export const defaultLoginState: LoginState = {
  provider: '',
  isAdmin: false
}

export const defaultLoginContext: LoginContextProps = {
  loginState: defaultLoginState,
  updateLoginState: () => { }
}

export const LoginContext = createContext<LoginContextProps>(defaultLoginContext)

export function LoginProvider({ children }: { children: React.ReactNode }) {
  const [loginState, setLoginState] = useState<LoginState>(defaultLoginState)

  const updateLoginState = (newState: LoginState) => {
    setLoginState({ ...defaultLoginState, ...newState })
  }

  return (
    <LoginContext value={{ loginState, updateLoginState }}>
      {children}
    </LoginContext>
  )
}

export const useLoginContext = () => useContext(LoginContext)