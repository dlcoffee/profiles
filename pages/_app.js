import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import Layout from '../web/components/Layout'
import { UserContextProvider } from '../web/contexts/UserContext'
import { supabase } from '../lib/supabase'

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
