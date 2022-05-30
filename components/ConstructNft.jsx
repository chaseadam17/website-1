import { useEffect, useState } from 'react';
import store from 'store2';
import supabaseClient from '../lib/supabaseClient';
import { EvolutionLayers, CombineArt } from "."

const ConstructNft = ({wallet, tokenId, collection}) => {
  const collectionStore = store.namespace(`blank-evolution-collection-${collection.id}`);

  const [art, setArt] = useState(collection?.art || []);
  const [selected, setSelected] = useState((collectionStore('selected-layers') || []).filter(
    (id) => art.find((a) => a.id === id)
  ));
  const [claiming, setClaiming] = useState(false);
  const [claimed, setClaimed] = useState(false)

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

  const onDelete = (id) => {
    const updatedArt = art.filter(
      (artItem) => artItem.id !== id
    )
    setArt(updatedArt)
  }

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
      } else {
        setClaimed(false)
      }
    }

    checkClaimed();
  }, [selected])

  return (
    <div className='container mx-auto'>
      <div className='flex gap-6'>
        <div className='py-6'>
          <CombineArt
            selectedArt={selected.map((id) => art.find((artItem) => artItem.id === id))}
            claiming={claiming}
          />
        </div>
        <div className=''>
          <EvolutionLayers 
            collectionTitle={collection.title} 
            art={art}
            wallet={wallet}
            selected={selected}
            onSelect={onSelect}
            onReorder={setSelected}
            onDelete={onDelete}
          />
        </div>
      </div>
    </div>
  )
}

export default ConstructNft