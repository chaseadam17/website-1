import { useEffect, useState } from 'react';
import {
  NextLink,
  CombineArt
} from '.'
import EvolutionLayers from './EvolutionLayers';
import UploadArt from './UploadArt';

const EvolutionCollection = ({ collection, provider }) => {  
  const [art, setArt] = useState(collection?.art || []);
  const [selected, setSelected] = useState(null);
  const [wallet, setWallet] = useState(null);

  useEffect(() => {
    const getWallet = async () => {
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      setWallet(address);
    }

    getWallet();
  }, [provider])

  useEffect(() => {
    const art = (collection?.art || [])
    const sortedArt = art.sort(
      (a, b) => new Date(a.created_at) - new Date(b.created_at)
    )
    setArt(sortedArt)
  }, [collection?.art])

  const onSelect = (id) => {
    console.log("SELECTED", id)
  }

  if (!collection) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <div className='container mx-auto'>
      <h1 className='text-sm mb-3'>
        <NextLink
          href='/members'
        >
          <a className='text-blue-600 underline'>Evolution Challenge</a> 
        </NextLink>
        &nbsp;&gt;&nbsp;
        {collection.title}
      </h1>
 
      {wallet &&
        <div className='py-6'>
          <UploadArt 
            collection={collection}
          />
        </div>
      }

      <div className='flex'>
        {collection.title !== 'Full Artwork' && (
          <div>
            <div className='py-6'>
              <CombineArt
                art={art} 
                collection={collection}
                selected={selected}
              />
            </div>

            <hr className='my-6' />
          </div>
        )}
        
        <div className='pl-6 pt-6'>
          <EvolutionLayers 
            collectionTitle={collection.title} 
            art={art}
            wallet={wallet}
            onSelect={onSelect}
          />
        </div>
      </div>
    </div>
  )
}

export default EvolutionCollection;