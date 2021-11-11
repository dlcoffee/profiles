import NextLink from 'next/link'
import {
  Avatar,
  AvatarBadge,
  Box,
  Center,
  Heading,
  Link,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'

import { supabase } from '../../lib/supabase'

export default function Profile({ profile }) {
  return (
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
            name={profile.name}
            src="https://bit.ly/broken-link"
            alt="Avatar Alt"
            mb={4}
          >
            <AvatarBadge boxSize=".75em" bg="green.500" />
          </Avatar>
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
  )
}

export async function getServerSideProps({ req }) {
  const { user } = await supabase.auth.api.getUserByCookie(req)

  console.log('[profile] fetched user:', user)

  if (!user) {
    return { props: {}, redirect: { destination: '/login', permanent: false } }
  }

  // apparently you can't just get the session this way: https://github.com/supabase/supabase/issues/347#issuecomment-897892454
  // const session = await supabase.auth.session()
  // console.log('[profile] session:', session)

  let { data, error, status } = await supabase
    .from('profiles')
    .select(`name, username, bio, website, avatar_url`)
    .eq('id', user.id)
    .single()

  return { props: { user, profile: data } }
}
