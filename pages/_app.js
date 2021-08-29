import { ChakraProvider } from '@chakra-ui/react'
import Layout from '../components/Layout'
import { UserContextProvider } from '../lib/UserContext'
import { supabase } from '../util/supabase'

function RootApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <UserContextProvider supabaseClient={supabase}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserContextProvider>
    </ChakraProvider>
  )
}

export default RootApp
