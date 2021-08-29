import { useState } from 'react'
import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from '@chakra-ui/react'

import { supabase } from '../util/supabase'

export default function Signup({ user }) {
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
    const { user, session, error } = await supabase.auth.signUp({
      email,
      password,
    })

    console.log(user, session, error)
  }

  return (
    <div>
      <Heading size="lg">Sign Up</Heading>

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
