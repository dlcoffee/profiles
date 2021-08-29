import { useState } from 'react'
import { useRouter } from 'next/router'
import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Textarea,
  useColorModeValue,
} from '@chakra-ui/react'

import { supabase } from '../../util/supabase'

export default function EditProfile({ user, profile }) {
  const router = useRouter()
  const [form, setForm] = useState({
    name: profile.name,
    username: profile.username,
    bio: profile.bio,
  })

  const handleInputChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // const supabaseUser = supabase.auth.user()
    // console.log({ user, supabaseUser })

    const updates = {
      id: user.id,
      username: form.username,
      name: form.name,
      // website,
      // avatar_url,
      bio: form.bio,
      updated_at: new Date(),
    }

    let { error } = await supabase.from('profiles').upsert(updates, {
      returning: 'minimal', // Don't return the value after inserting
    })

    router.push('/profile')
  }

  return (
    <div>
      <Heading size="lg">Edit User Profile</Heading>

      <Center py={6}>
        <Box
          maxW="320px"
          w="full"
          bg={useColorModeValue('white', 'gray.900')}
          boxShadow="2xl"
          rounded="lg"
          p={6}
          textAlign="center"
        >
          <form onSubmit={handleSubmit}>
            <FormControl id="name">
              <FormLabel>name</FormLabel>
              <Input
                value={form.name}
                onChange={handleInputChange}
                type="text"
                name="name"
                id="name"
              />
            </FormControl>

            <FormControl id="username">
              <FormLabel>username</FormLabel>
              <Input
                value={form.username}
                onChange={handleInputChange}
                type="username"
                name="username"
                id="username"
              />
            </FormControl>

            <FormControl id="bio">
              <FormLabel>bio</FormLabel>
              <Textarea
                value={form.bio}
                onChange={handleInputChange}
                type="bio"
                name="bio"
                id="bio"
              />
            </FormControl>

            <Button colorScheme="teal" type="submit">
              Submit
            </Button>
          </form>
        </Box>
      </Center>
    </div>
  )
}

export async function getServerSideProps({ req }) {
  const { user } = await supabase.auth.api.getUserByCookie(req)

  console.log('[edit profile] fetched user:', user)

  if (!user) {
    return { props: {}, redirect: { destination: '/login', permanent: false } }
  }

  let { data, error, status } = await supabase
    .from('profiles')
    .select(`name, username, bio, website, avatar_url`)
    .eq('id', user.id)
    .single()

  return { props: { user, profile: data } }
}
