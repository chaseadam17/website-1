import { useCallback, useEffect, useState } from 'react';
import supabaseClient from '../lib/supabaseClient';
import EvolutionLayer from "./EvolutionLayer";

const EvolutionLayers = ({ wallet, collectionTitle, art, selected, onSelect, onReorder }) => {
  const [starred, setStarred] = useState([]);
  const [orderedSelected, setOrderedSelected] = useState(selected)
  const [orderValues, setOrderValues] = useState(selected.map((_s, index) => index));

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

  const reorderSelected = (id, index) => {
    const existingIndex = orderedSelected.indexOf(id);
    
    if (isNaN(index) || index === '' || index < 0 || index >= selected.length) {
      const newOrderValues = [...orderValues];
      newOrderValues[existingIndex] = index;  
      setOrderValues(newOrderValues);
      return false;
    }

    const _ordered = [...orderedSelected];
    _ordered.splice(existingIndex, 1);
    _ordered.splice(index, 0, id);
    setOrderValues(_ordered.map((_s, index) => index))
    setOrderedSelected(_ordered);
    onReorder(_ordered);
    return true;
  }

  useEffect(() => {
    loadStars();
  }, [loadStars])

  return (
    <div>
      {selected.length > 0 && (
        <div className='pb-6'>
          <h3 className='mb-3'>Selected Layers</h3>
          <div className="flex flex-wrap">
            {orderedSelected.map(
              (id) => art.find((artItem) => artItem.id === id)
            ).map(
              (selectedItem, index) => (
                <div key={`selected-${index}`}>
                  <EvolutionLayer                    
                    wallet={wallet}
                    art={selectedItem}
                    collectionTitle={collectionTitle}
                    selected={true}
                    starred={starred.find(({ id }) => id === selectedItem.id)}
                    onSelect={onSelect}
                    onStar={loadStars}
                  />
                  <div className='text-center'>
                    <input 
                      className='border w-9 text-gray-600 p-1 ' 
                      type='text' 
                      onChange={(e) => {
                        if (reorderSelected(selectedItem.id, e.target.value)) {
                          e.target.blur();
                        }
                      }}
                      value={orderValues[index] === undefined ? '' : orderValues[index]} 
                    />
                  </div>
                </div>
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