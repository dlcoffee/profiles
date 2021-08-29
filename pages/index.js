import { useEffect, useState } from 'react'
import { Heading } from '@chakra-ui/react'
import { Stack, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react'

import { supabase } from '../util/supabase'

export default function Home() {
  const [profiles, setProfiles] = useState([])

  useEffect(() => {
    const fetchProfiles = async () => {
      const { data, error } = await supabase.from('profiles').select()

      setProfiles(data)
    }

    fetchProfiles()
  }, [])

  console.log('profiles', profiles)

  return (
    <div>
      <Stack spacing={6}>
        <Heading as="h3" size="lg">
          Users List (static page + useEffect for data fetching)
        </Heading>

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
      </Stack>
    </div>
  )
}
