import Head from 'next/head'
import {
  BlankLayout,
  TWCenteredContent,
  TokenGate,
  EvolutionChallenge
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
          <div className='pb-60'>
            <TokenGate>
              <EvolutionChallenge />
            </TokenGate>
          </div>          
        </TWCenteredContent>
      </BlankLayout>
    </div>
  );
}

export default BlankMembers;