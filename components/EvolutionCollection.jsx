import { useState } from 'react';
import {
  NextLink,
  TWButton,
  SupabaseImage
} from '.'
import supabaseClient from '../lib/supabaseClient';

const EvolutionCollection = ({ collection, provider }) => {
  const [file, setFile] = useState(null);
  const [art, setArt] = useState(collection?.art || []);

  const imageUri = (id) => `${collection.title}/${id}.png`

  const submit = async () => {
    if (!file) return;

    const wallet = await provider.getSigner();
    const address = await wallet.getAddress();

    const insert = async () => {
      const { body, error } = await supabaseClient
        .from('art')
        .insert({
          collection_id: collection.id,
          wallet: address
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
  
    setArt([artItem, ...art])
  }

  if (!collection) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <div>
      <h1 className='text-sm'>
        <NextLink
          href='/member'
        >
          <a className='text-blue-600 underline'>Evolution Challenge</a> 
        </NextLink>
        &nbsp;&gt;&nbsp;
        {collection.title}
      </h1>

      <div className='py-12'>
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

      <div className='py-12 flex'>
        {art.map(
          (artItem, index) => (
            <div key={`art-${art.id}`} className='mr-12'>
              <SupabaseImage
                collection={collection}
                item={artItem}
              />
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default EvolutionCollection;