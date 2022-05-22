import { useEffect, useState } from 'react';
import supabaseClient from '../lib/supabaseClient'
import { EvolutionCollectionPreview } from '.'

const EvolutionChallenge = () => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const loadCollections = async () => {
      const { data, error } = await supabaseClient.from('collection').select('*')
      
      if (error) {
        console.log("Error retrieving collections:", error)
      }

      setCollections(data || [])
    }

    loadCollections();
  }, [])  

  const svgBirbs = collections.find(({ title }) => title === 'SVG Birbs')
  const rest = collections.filter(({ title }) => title !== 'SVG Birbs')

  if (!svgBirbs) return <></>

  return (
    <div>
      <h1 className='text-lg font-bold'>Blank Evolution: Birbs</h1>
      <div className='py-3 text-xs'>
        The Blank community has voted to evolve Blanks in to Birbs!
        <br/>
        <br/>
        Enter into the collection to upload layers (e.g. a hat for the Birb) or combine layers together to constuct and claim your NFT!
        <br/>
        <br/>
        All layers are SVGs, hence the name, SVG Birbs...
      </div>
      <div className='flex'>
        <EvolutionCollectionPreview collection={svgBirbs} />
      </div>
      
      <div className='pt-36'>
        <h2 className='font-bold'>Previous Collections</h2>
        <div className='py-3'>For reference:</div>
        <div className='flex'>
          {rest.map(collection => (
            <div 
              key={`collection-${collection.id}`}
              className='mr-12'
            >
              <EvolutionCollectionPreview collection={collection} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )      
}

export default EvolutionChallenge;