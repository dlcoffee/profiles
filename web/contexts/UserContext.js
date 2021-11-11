import { useEffect, useState, createContext, useContext } from 'react'

const UserContext = createContext({ user: null })

export const UserContextProvider = (props) => {
  const { supabaseClient } = props
  const [session, setSession] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const session = supabaseClient.auth.session()
    console.log('UserContextProvider useEffect', session)
    setSession(session)
    setUser(session?.user ?? null)

    const { data: authListener } = supabaseClient.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session)
        setUser(session?.user ?? null)

        // Send session to /api/auth route to set the auth cookie.
        // NOTE: this is only needed if you're doing SSR (getServerSideProps)!
        fetch('/api/auth', {
          method: 'POST',
          headers: new Headers({ 'Content-Type': 'application/json' }),
          credentials: 'same-origin',
          body: JSON.stringify({ event, session }),
        }).then((res) => res.json())
      }
    )

    return () => {
      authListener.unsubscribe()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const value = {
    session,
    user,
  }

  console.log(`UserContextProvider render. has session? ${!!session}`)
  return <UserContext.Provider value={value} {...props} />
}

export const useUser = () => {
  const context = useContext(UserContext)

  if (context === undefined) {
    throw new Error(`useUser must be used within a UserContextProvider.`)
  }

  return context
}
