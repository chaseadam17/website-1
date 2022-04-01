import { useEffect, useState } from 'react';
import store from 'store2';

import {
  NextLink,
  CombineArt
} from '.'
import EvolutionLayers from './EvolutionLayers';
import UploadArt from './UploadArt';

const EvolutionCollection = ({ collection, provider }) => { 
  const collectionStore = store.namespace(`blank-evolution-collection-${collection.id}`);

  const [art, setArt] = useState(collection?.art || []);
  const [selected, setSelected] = useState(collectionStore('selected-layers') || []);
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
    let _selected;
    if (selected.includes(id)) {
      _selected = selected.filter((_id) => _id !== id)
    } else {
      _selected = [...selected, id]
    }    
    collectionStore('selected-layers', _selected);
    setSelected(_selected)
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
        <div className='py-6 flex'>
          <UploadArt 
            collection={collection}
          />
          <div className='py-6 ml-6'>
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
        </div>
      }

      <div className='flex'>
        {collection.title !== 'Full Artwork' && (
          <div>
            <div className='py-6'>
              <CombineArt
                selectedArt={selected.map((id) => art.find((artItem) => artItem.id === id))}
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
            selected={selected}
            onSelect={onSelect}
            onReorder={setSelected}
          />
        </div>
      </div>
    </div>
  )
}

export default EvolutionCollection;