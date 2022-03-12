import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head'
import { 
  BlankLayout,
  TWCenteredContent,
  TokenGate,
  EvolutionCollection
} from '../../components';
import supabaseClient from '../../lib/supabaseClient';

const CollectionPage = () => {
  const router = useRouter();
  const [collection, setCollection] = useState(null);

  useEffect(() => {

    const loadCollection = async () => {
      const { data, error } = await supabaseClient
        .from('collection')
        .select('*, art(*)')
        .eq('id', router.query.collectionId)

      setCollection(data[0])
    }

    loadCollection();

  }, [router.query.collectionId])

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
              <EvolutionCollection collection={collection} />
            </TokenGate>
          </div>          
        </TWCenteredContent>
      </BlankLayout>
    </div>
  )
}

export default CollectionPage;