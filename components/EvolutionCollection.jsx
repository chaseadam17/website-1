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