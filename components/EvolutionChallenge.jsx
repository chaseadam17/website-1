import { useEffect, useState } from 'react';
import supabaseClient from '../lib/supabaseClient'
import { EvolutionCollectionPreview } from '.'

const EvolutionChallenge = () => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const loadCollections = async () => {
      const { data, error } = await supabaseClient.from('collection').select('*')
      setCollections(data || [])
    }

    loadCollections();
  }, [])  

  return (
    <div>
      <h1 className='text-lg font-bold'>Evolution Challenge</h1>
      <p className='py-12 flex'>
        {collections.map(collection => (
          <div 
            key={`collection-${collection.id}`}
            className='mr-12'
          >
            <EvolutionCollectionPreview collection={collection} />
          </div>
        ))}
      </p>
    </div>
  )      
}

export default EvolutionChallenge;