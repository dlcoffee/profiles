import NextLink from 'next/link'
import {
  Avatar,
  Box,
  Button,
  Center,
  Heading,
  Link,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'

import { supabase } from '../../util/supabase'

import Layout from '../../components/Layout'

export default function Profile({ profile }) {
  return (
    <Layout>
      <div>
        <Heading size="lg">User Profile</Heading>

        <Box>
          <NextLink href="/profile/edit" passHref>
            <Link>Edit</Link>
          </NextLink>
        </Box>

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
            <Avatar
              size="xl"
              src={
                'https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'
              }
              alt="Avatar Alt"
              mb={4}
              pos="relative"
              _after={{
                content: '""',
                w: 4,
                h: 4,
                bg: 'green.300',
                border: '2px solid white',
                rounded: 'full',
                pos: 'absolute',
                bottom: 0,
                right: 3,
              }}
            />
            <Heading fontSize="2xl" fontFamily="body">
              {profile.name}
            </Heading>
            <Text fontWeight={600} color="gray.500" mb={4}>
              {profile.username}
            </Text>
            <Text
              textAlign="center"
              color={useColorModeValue('gray.700', 'gray.400')}
              px={3}
            >
              {profile.bio}
            </Text>
          </Box>
        </Center>
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

  let { data, error, status } = await supabase
    .from('profiles')
    .select(`name, username, bio, website, avatar_url`)
    .eq('id', user.id)
    .single()

  return { props: { user, profile: data } }
}