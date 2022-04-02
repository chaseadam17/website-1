import { useEffect, useState } from 'react';
import store from 'store2';

import {
  NextLink,
  CombineArt
} from '.'
import BirbExplanation from './BirbExplanation';
import ClaimNft from './ClaimNft';
import EvolutionLayers from './EvolutionLayers';
import TWButton from './TWButton';
import UploadArt from './UploadArt';

const EvolutionCollection = ({ collection, provider }) => { 
  const collectionStore = store.namespace(`blank-evolution-collection-${collection.id}`);

  const [art, setArt] = useState(collection?.art || []);
  const [selected, setSelected] = useState(collectionStore('selected-layers') || []);
  const [wallet, setWallet] = useState(null);
  const [claiming, setClaiming] = useState(false);

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
            <BirbExplanation />
          </div>
        </div>
      }

      <div className='flex'>
        {collection.title !== 'Full Artwork' && (
          <div className='overflow-hidden' style={{ width: '300px'}}>
            <div className='py-6'>
              <CombineArt
                selectedArt={selected.map((id) => art.find((artItem) => artItem.id === id))}
                collection={collection}
              />
            </div>

            <div className='text-center'>
              <div className='mb-3 text-xs'>
                If you like your combined NFT then claim it!
                Your Blank NFT will evolve into your claimed art on Blank Day!
              </div>
              <TWButton
                onClick={() => setClaiming(true)}
              >
                Claim Combined Art
              </TWButton>
            </div>

          </div>
        )}
        
        <div className='pl-6 pt-6'>
          {claiming && (
            <ClaimNft provider={provider} wallet={wallet} />
          )}
          {!claiming && (
            <EvolutionLayers 
              collectionTitle={collection.title} 
              art={art}
              wallet={wallet}
              selected={selected}
              onSelect={onSelect}
              onReorder={setSelected}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default EvolutionCollection;