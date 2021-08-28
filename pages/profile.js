import { useState } from 'react'
import {
  Button,
  Code,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from '@chakra-ui/react'

import { supabase } from '../util/supabase'

import Layout from '../components/Layout'

export default function Profile({ user }) {
  const [password, setPassword] = useState('')

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleSubmit = (e) => {
    console.log('updating pw')
    e.preventDefault()
  }

  return (
    <Layout>
      <div>
        <Heading size="lg">User Data</Heading>

        <Code colorScheme="green">
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </Code>

        <form onSubmit={handleSubmit}>
          <FormControl id="password">
            <FormLabel>new password</FormLabel>
            <Input
              value={password}
              onChange={handlePassword}
              type="password"
              name="password"
              id="password"
            />
          </FormControl>

          <Button colorScheme="teal" type="submit">
            update password
          </Button>
        </form>
      </div>
    </Layout>
  )
}

export async function getServerSideProps({ req }) {
  const { user } = await supabase.auth.api.getUserByCookie(req)

  console.log('[profile] fetched user:', user)

  if (!user) {
    return { props: {}, redirect: { destination: '/login', permanent: false } }
  }

  return { props: { user } }
}
