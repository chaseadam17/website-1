import { useState } from 'react';
import {
  NextLink,
  TWButton
} from '.'
import supabaseClient from '../lib/supabaseClient';

const EvolutionCollection = ({ collection, provider }) => {
  const [file, setFile] = useState(null);
  const [art, setArt] = useState(collection.art)

  const submit = async () => {
    const wallet = await provider.getSigner();

    const { body } = await supabaseClient
      .from('art')
      .insert({
        collection_id: collection.id,
        wallet: wallet
      })

    const x = await supabaseClient
      .storage
      .from('art')
      .upload(`${colletion.title}/${body.id}.png`, file, {
        cacheControl: '3600',
        upsert: false
      })
    
    console.log("X", x)

    // const response = await supabase
    //   .from('art')
    //   .update({
    //     imageUri: data.uri
    //   })
  
    // console.log(response)
    // setArt([data, ...art])
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

</div>
  )
}

export default EvolutionCollection;