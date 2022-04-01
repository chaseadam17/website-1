import { useCallback, useEffect, useState } from 'react';
import supabaseClient from '../lib/supabaseClient';
import EvolutionLayer from "./EvolutionLayer";

const EvolutionLayers = ({ wallet, collectionTitle, art, selected, onSelect }) => {
  const [starred, setStarred] = useState([]);

  const loadStars = useCallback(async () => {
    const { data, error } = await supabaseClient
      .from('star')
      .select('art_id')
      .eq('wallet', wallet)

    if (error) console.log("Error loading stars", error)

    const starIds = data.map(({ art_id }) => art_id);
    const _starred = art.filter(({ id }) => starIds.includes(id));
    setStarred(_starred)
  }, [wallet, art])

  useEffect(() => {
    loadStars();
  }, [loadStars])

  return (
    <div>
      {selected.length > 0 && (
        <div className='pb-6'>
          <h3 className='mb-3'>Selected Layers</h3>
          <div className="flex flex-wrap">
            {art.filter((artItem) => selected.includes(artItem.id)).map(
              (selectedItem, index) => (
                <EvolutionLayer
                  key={`starred-${index}`}
                  wallet={wallet}
                  art={selectedItem}
                  collectionTitle={collectionTitle}
                  selected={true}
                  starred={starred.find(({ id }) => id === selectedItem.id)}
                  onSelect={onSelect}
                  onStar={loadStars}
                />
              )
            )}
          </div>
        </div>
      )}

      {starred.length > 0 && (
        <div className='pb-6'>
          <h3 className='mb-3'>Starred Layers</h3>
          <div className="flex flex-wrap">
            {starred.map(
              (starredItem, index) => (
                <EvolutionLayer
                  key={`starred-${index}`}
                  wallet={wallet}
                  art={starredItem}
                  collectionTitle={collectionTitle}
                  selected={selected.includes(starredItem.id)}
                  starred={true}
                  onSelect={onSelect}
                  onStar={loadStars}
                />
              )
            )}
          </div>
        </div>
      )}

      <h3 className='mb-3'>All Layers</h3>
      <div className='flex flex-wrap overflow-auto' style={{ height: '600px'}}>
        {art.concat(art).concat(art).concat(art).map(
          (artItem, index) => (
            <EvolutionLayer 
              key={`layer-${index}`}
              wallet={wallet}
              art={artItem}
              collectionTitle={collectionTitle}
              selected={selected.includes(artItem.id)}
              starred={starred.includes(artItem)}
              onSelect={onSelect}
              onStar={loadStars}
            />
          )
        )}
      </div>
    </div>
  )

}

export default EvolutionLayers;