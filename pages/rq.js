import { useEffect } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import {
  Flex,
  Heading,
  Spinner,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'

import { supabase } from '../lib/supabase'

export default function Home() {
  const queryClient = useQueryClient()

  const {
    isLoading,
    error,
    data: profiles,
  } = useQuery('profiles', async () => {
    const { data, error } = await supabase.from('profiles').select()

    if (error) {
      // fetcher function needs to throw an error if there is one
      throw new Error(error)
    }

    return data
  })

  // set up supabase subscription for updates
  // useEffect(() => {
  //   const profileListener = supabase
  //     .from('profiles')
  //     .on('UPDATE', (payload) => queryClient.invalidateQueries('profiles'))
  //     .subscribe()

  //   return () => {
  //     profileListener.unsubscribe()
  //   }
  // }, [queryClient])

  return (
    <div>
      <Stack spacing={6}>
        <Heading as="h3" size="lg">
          Users List
        </Heading>

        <Text>
          This page is statically generated and uses useEffects to fetch data.
          It also uses react-query to handle data caching and querying.
        </Text>

        {isLoading ? (
          <Flex justify="center">
            <Spinner />
          </Flex>
        ) : (
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>name</Th>
                <Th>username</Th>
                <Th>website</Th>
              </Tr>
            </Thead>

            <Tbody>
              {profiles.map((profile) => {
                return (
                  <Tr key={profile.id}>
                    <Td>{profile.name}</Td>
                    <Td>{profile.username}</Td>
                    <Td>{profile.website}</Td>
                  </Tr>
                )
              })}
            </Tbody>
          </Table>
        )}
      </Stack>
    </div>
  )
}
