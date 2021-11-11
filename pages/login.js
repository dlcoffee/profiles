import { useState } from 'react'
import { useRouter } from 'next/router'
import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from '@chakra-ui/react'

import { supabase } from '../lib/supabase'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleEmail = (e) => {
    setEmail(e.target.value)
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { user, session, error } = await supabase.auth.signIn({
      email,
      password,
    })

    console.log(user, session, error)

    router.push('/profile')
  }

  return (
    <div>
      <Heading size="lg">Log In</Heading>

      <form onSubmit={handleSubmit}>
        <FormControl id="email">
          <FormLabel>email</FormLabel>
          <Input
            value={email}
            onChange={handleEmail}
            type="email"
            name="email"
            id="email"
          />
        </FormControl>

        <FormControl id="password">
          <FormLabel>password</FormLabel>
          <Input
            value={password}
            onChange={handlePassword}
            type="password"
            name="password"
            id="password"
          />
        </FormControl>

        <Button colorScheme="teal" type="submit">
          Submit
        </Button>
      </form>
    </div>
  )
}

export async function getServerSideProps({ req }) {
  const { user } = await supabase.auth.api.getUserByCookie(req)

  console.log('[login] fetched user:', user)

  if (user) {
    return { props: {}, redirect: { destination: '/', statusCode: 302 } }
  }

  return { props: {} }
}
