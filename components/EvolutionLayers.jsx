import { useEffect, useState } from 'react';
import supabaseClient from '../lib/supabaseClient';
import EvolutionLayer from "./EvolutionLayer";

const EvolutionLayers = ({ wallet, collectionTitle, art }) => {
  const [starred, setStarred] = useState([]);

  useEffect(() => {
    const loadStars = async () => {
      const { data, error } = await supabaseClient
        .from('star')
        .select('art_id')
        .eq('wallet', wallet)

      if (error) console.log("Error loading stars", error)

      console.log(data.map(({ art_id }) => art_id))
    }

    loadStars();
  }, [wallet])

  return (
    <div>
      {starred.length > 0 && (
        <div className='py-6'>
          <h3 className=''>Starred Layers</h3>
          <div className="flex flex-wrap">
            {starred.map(
              (starredItem, index) => (
                <EvolutionLayer
                  wallet={wallet}
                  art={starredItem}
                  collectionTitle={collectionTitle}
                  key={`starred-${index}`}
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
              wallet={wallet}
              art={artItem}
              collectionTitle={collectionTitle}
              key={`layer-${index}`}
            />
          )
        )}
      </div>
    </div>
  )

}

export default EvolutionLayers;