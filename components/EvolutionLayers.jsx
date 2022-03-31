import { useState } from 'react';
import EvolutionLayer from "./EvolutionLayer";

const EvolutionLayers = ({ wallet, collectionTitle, art }) => {
  const [starred, setStarred] = useState([]);

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
      <div className='flex flex-wrap bg-red-500 overflow-auto' style={{ height: '600px'}}>
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