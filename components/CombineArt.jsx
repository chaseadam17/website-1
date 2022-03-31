import { useState } from 'react';
import store from 'store2';

import SupabaseImage from './SupabaseImage';

const CombineArt = ({ art, collection }) => {
  const collectionStore = store.namespace(`blank-evolution-collection-${collection.id}`);
  const [layers, setLayers] = useState(collectionStore('layers') || [
    '2', '3', '', '', '', '', '', '', '', ''
  ]);

  const input = (index) => {
    return (
      <div key={`combine-${index}`} className='pt-3'>
        <span className='mr-3'>
          #{index}
        </span>
        <input
          type='text'
          className='border rounded p-1'
          onChange={(e) => {
            const value = e.target.value;
            const newLayers = [...layers]
            newLayers.splice(index - 1, 1, value);
            collectionStore('layers', newLayers)
            setLayers(newLayers);
          }}
          value={layers[index - 1] || ''}
        />
      </div>
    )
  }

  return (
    <div className=''>
      <h3 className='mb-3'>Combined Image</h3>
      <div className='flex'>
        {/* <div className='text-xs'>
          <p className='pt-3'>
            Enter image IDs to combine with other images.
          </p>
          <p className='py-3'>
            #1 is the bottom layer, #10 is the top.
          </p>
          <div className='flex'>
            <div className='mr-3'>
              {[1, 2, 3, 4, 5].map(
                (index) => input(index)
              )}
            </div>
            <div className='mr-3'>
              {[6, 7, 8, 9, 10].map(
                (index) => input(index)
              )}
            </div>
          </div>
        </div> */}
        <div className='relative border' style={{width: '300px', height: '300px'}}>  
          {layers.filter(l => !isNaN(parseInt(l))).map(
            (layer, index) => (
              <div  
                key={`layer-${index}`}  
                className='absolute w-full h-full' 
              >
                {/* {art[layer - 1] &&
                  <SupabaseImage
                    collection={collection}
                    item={art[layer - 1]}
                    dim={300}
                  />
                } */}
              </div>
            )
          )}
        </div>  
      </div> 
      {/* <div className='py-3 flex'>
        {layers.filter(l => !isNaN(parseInt(l))).map(
          (layer, index) => (
            <div  
              key={`layer-slide-${index}`}  
              className='mr-3' 
            >
              {art[layer - 1] &&
                <SupabaseImage
                  collection={collection}
                  item={art[layer - 1]}
                  dim={90}
                  index={layer}
                />
              }
            </div>
          )
        )}
      </div>     */}
    </div>
  )
}

export default CombineArt;