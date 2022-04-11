import { useEffect, useState } from 'react';
import store from 'store2';

import {
  NextLink,
  CombineArt
} from '.'
import supabaseClient from '../lib/supabaseClient';
import BirbExplanation from './BirbExplanation';
import ClaimNft from './ClaimNft';
import EvolutionLayers from './EvolutionLayers';
import TWButton from './TWButton';
import UploadArt from './UploadArt';

const EvolutionCollection = ({ collection, provider }) => { 
  const collectionStore = store.namespace(`blank-evolution-collection-${collection.id}`);

  const [art, setArt] = useState(collection?.art || []);
  const [selected, setSelected] = useState((collectionStore('selected-layers') || []).filter(
    (id) => art.find((a) => a.id === id)
  ));
  const [wallet, setWallet] = useState(null);
  const [claiming, setClaiming] = useState(false);
  const [claimed, setClaimed] = useState(false)

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

  useEffect(() => {
    const checkClaimed = async () => {
      const { data, error } = await supabaseClient
        .from('nft')
        .select('*')
        .eq('info->>combinedLayers', selected.join(','))

      if (error) {
        console.log("Error checking claimed", error)
        return;
      }

      if (data.length > 0) {
        setClaimed(true)
      }
    }

    checkClaimed();
  }, [selected])

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

  const onDelete = (id) => {
    const updatedArt = art.filter(
      (artItem) => artItem.id !== id
    )
    setArt(updatedArt)
  }

  const onUpload = (artItem) => {
    setArt([...art, artItem])
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
 
      {wallet && collection.title === 'SVG Birbs' && (
        <div className='py-6 flex'>
          <UploadArt 
            collection={collection}
            wallet={wallet}
            onUpload={onUpload}
          />
          <div className='py-6 ml-6'>
            <BirbExplanation />
          </div>
        </div>
      )}

      <div className='flex'>
        {collection.title !== 'Full Artwork' && (
          <div className='overflow-hidden w-1/4'>
            <div className='py-6'>
              <CombineArt
                selectedArt={selected.map((id) => art.find((artItem) => artItem.id === id))}
                claiming={claiming}
              />
            </div>

            {selected.length > 0 && (
              <div className='pt-6 text-center'>
                <div className='mb-3 text-xs'>
                  If you like your combined NFT then claim it!
                  Your Blank NFT will evolve into your claimed art on Blank Day!
                </div>
                {claimed ? (
                  <div className='text-red-600'>
                    This NFT has already been claimed!
                  </div>
                ) : (
                  <TWButton
                    onClick={() => setClaiming(true)}
                  >
                    Claim Combined Art
                  </TWButton>
                )}
                
              </div>
            )}
            

          </div>
        )}
        
        <div className='pl-6 pt-6 w-3/4'>
          {claiming && (
            <ClaimNft 
              provider={provider} 
              wallet={wallet} 
              selected={selected} 
              onComplete={() => setClaiming(false)}
            />
          )}
          {!claiming && (
            <EvolutionLayers 
              collectionTitle={collection.title} 
              art={art}
              wallet={wallet}
              selected={selected}
              onSelect={onSelect}
              onReorder={setSelected}
              onDelete={onDelete}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default EvolutionCollection;