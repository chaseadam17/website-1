import { useEffect, useState } from 'react';
import {
  NextLink,
  TWButton,
  SupabaseImage,
  CombineArt
} from '.'
import supabaseClient from '../lib/supabaseClient';

const ADMIN_WALLET = '0xfa23B55345c7237b7eEE52Db975E8a72b840BC1A';

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

  if (!collection) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <div>
      <h1 className='text-sm'>
        <NextLink
          href='/members'
        >
          <a className='text-blue-600 underline'>Evolution Challenge</a> 
        </NextLink>
        &nbsp;&gt;&nbsp;
        {collection.title}
      </h1>

      <div className='py-6'>
        <CombineArt
          art={art} 
          collection={collection}
        />
      </div>

      <hr className='my-6' />
      
      {wallet &&
        <div className='py-6'>
          <p>Upload An Image</p>
          <p className='text-xs py-3'>Your image should be 2000px x 2000px.</p>
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

      <div className='py-6 flex'>
        {art.map(
          (artItem, index) => (
            <div key={`art-${artItem.id}`} className='mr-6'>
              <SupabaseImage
                collection={collection}
                item={artItem}
                index={index + 1}
                dim={120}
                ownerAdmin={wallet === artItem.wallet || wallet === ADMIN_WALLET}
              />
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default EvolutionCollection;