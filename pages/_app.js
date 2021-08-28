import { ChakraProvider } from '@chakra-ui/react'
import { UserContextProvider } from '../lib/UserContext'
import { supabase } from '../util/supabase'

function RootApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <UserContextProvider supabaseClient={supabase}>
        <Component {...pageProps} />
      </UserContextProvider>
    </ChakraProvider>
  )
}

export default RootApp
