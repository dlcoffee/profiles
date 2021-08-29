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

import Layout from '../../components/Layout'

export default function EditProfile({ user, profile }) {
  const router = useRouter()
  const [name, setName] = useState(profile.name)
  const [username, setUsername] = useState(profile.username)
  const [bio, setBio] = useState(profile.bio)

  const handleName = (e) => {
    setName(e.target.value)
  }

  const handleUsername = (e) => {
    setUsername(e.target.value)
  }

  const handleBio = (e) => {
    setBio(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // const user = supabase.auth.user()

    const updates = {
      id: user.id,
      username,
      name,
      // website,
      // avatar_url,
      bio,
      updated_at: new Date(),
    }

    let { error } = await supabase.from('profiles').upsert(updates, {
      returning: 'minimal', // Don't return the value after inserting
    })

    router.push('/profile')
  }

  return (
    <Layout>
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
                  value={name}
                  onChange={handleName}
                  type="text"
                  name="name"
                  id="name"
                />
              </FormControl>

              <FormControl id="username">
                <FormLabel>username</FormLabel>
                <Input
                  value={username}
                  onChange={handleUsername}
                  type="username"
                  name="username"
                  id="username"
                />
              </FormControl>

              <FormControl id="bio">
                <FormLabel>bio</FormLabel>
                <Textarea
                  value={bio}
                  onChange={handleBio}
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
    </Layout>
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
