import Head from 'next/head'
import {
  BlankLayout,
  TWCenteredContent,
  TokenGate
} from '../components'

const BlankMembers = () => {

  return (
    <div>
      <Head>
        <title>Members: Blank.Foundation</title>
        <meta name="description" content="United by a blank canvas." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
  
      <BlankLayout>
        <TWCenteredContent>
          <TokenGate>
            <div>HI THERE!</div>
          </TokenGate>
        </TWCenteredContent>
      </BlankLayout>
    </div>
  );
}

export default BlankMembers;