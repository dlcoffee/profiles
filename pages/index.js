import { Heading } from '@chakra-ui/react'
import Layout from '../components/Layout'

export default function Home() {
  return (
    <Layout>
      <Heading as="h3" size="lg">
        This is a statically served page
      </Heading>
    </Layout>
  )
}
