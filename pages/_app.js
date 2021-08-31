import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import Layout from '../components/Layout'
import { UserContextProvider } from '../lib/UserContext'
import { supabase } from '../util/supabase'

const queryClient = new QueryClient()

function RootApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <UserContextProvider supabaseClient={supabase}>
        <QueryClientProvider client={queryClient}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </QueryClientProvider>
      </UserContextProvider>
    </ChakraProvider>
  )
}

export default RootApp
