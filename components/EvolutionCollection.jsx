import { useEffect, useState } from 'react';
import {
  NextLink,
  TWButton,
  CombineArt
} from '.'
import supabaseClient from '../lib/supabaseClient';
import EvolutionLayers from './EvolutionLayers';

const EvolutionCollection = ({ collection, provider }) => {
  const [file, setFile] = useState(null);
  const [art, setArt] = useState(collection?.art || []);
  const [wallet, setWallet] = useState(null);

  const imageUri = (id) => `${collection.title}/${id}.png`

  const submit = async () => {
    if (!file || !wallet) return;

    const insert = async () => {
      const { body, error } = await supabaseClient
        .from('art')
        .insert({
          collection_id: collection.id,
          wallet: wallet
        })

      if (error) console.log("INSERT ERROR", error)

      return body[0] 
    }

    const storage = async (id) => {
      const { data, error } = await supabaseClient
      .storage
        .from('art')
        .upload(imageUri(id), file, {
          cacheControl: '3600',
          upsert: false
        })

      if (error) console.log("STORAGE ERROR", error)

      return data.Key
    }
    
    const artItem = await insert();
    await storage(artItem.id);
  
    setArt([...art, artItem])
  }

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

  if (!collection) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <div className='container mx-auto'>
      <h1 className='text-sm'>
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
          <p>Upload An Image</p>
          <p className='text-xs py-3'>Your image should be 512px x 512px.</p>
          <input
            type='file'
            className='mr-3'
            onChange={(e) => setFile(e.target.files[0])}
          />
          <TWButton
            onClick={submit}
          >
            Submit
          </TWButton>
        </div>
      }

      <div className='flex'>
        {collection.title !== 'Full Artwork' && (
          <div>
            <div className='py-6'>
              <CombineArt
                art={art} 
                collection={collection}
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
          />
        </div>
      </div>
    </div>
  )
}

export default EvolutionCollection;