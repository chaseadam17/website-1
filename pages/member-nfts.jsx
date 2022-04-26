import Head from 'next/head'
import {
  BlankLayout,
  TWCenteredContent,
  TokenGate,
  MemberNfts
} from '../components'

const MyNftsPage = () => {
  return (
    <div>
      <Head>
        <title>Member NFTs: Blank.Foundation</title>
        <meta name="description" content="United by a blank canvas." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
  
      <BlankLayout>
        <TWCenteredContent>
          <div className='pb-60'>
            <TokenGate>
              <MemberNfts />
            </TokenGate>
          </div>          
        </TWCenteredContent>
      </BlankLayout>
    </div>
  )
}

export default MyNftsPage;