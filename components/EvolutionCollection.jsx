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

  useEffect(() => {
    setArt(collection?.art || [])
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

      {collection.title === 'Birbs' && (
        <div className='py-6'>
          <h3>Getting Started</h3>
          <div className='pt-3 text-xs'>
            We recommend playing around with Birb designs using Figma.
            You can find a variety of template files&nbsp;
            <a 
              href='https://www.figma.com/file/2W2fsTuHSBLEFAx7agV4Jo/Darwin?node-id=0%3A1'
              className='text-blue-600 underline'
              target='_blank'
              rel='noopener noreferrer'
            >
              here
            </a>.
            <div className='pt-3'>
              You can also download a transparent birb to play with in other applications&nbsp;
              <a 
                href='https://6ymgladt6zbinh7bb365fag2bpevbowkvj4r64k2rrviu3szpm.arweave.net/9hhlgHP2Qoaf_4Q790oDaC8lQusqqeR9xWoxqim5Zew'
                className='text-blue-600 underline'
                target='_blank'
                rel='noopener noreferrer'
              >
                here
              </a>.
            </div>
          </div>
        </div>
      )}
 
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

      <div className='py-6 flex flex-wrap'>
        {art.map(
          (artItem, index) => (
            <div key={`art-${artItem.id}`} id={`art-${artItem.id}`} className='mr-3 mb-3'>
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