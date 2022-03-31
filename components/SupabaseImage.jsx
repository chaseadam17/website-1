/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from 'react';
import supabaseClient from '../lib/supabaseClient';

const SupabaseImage = ({ ownerAdmin, collectionTitle, item, index, dim, selected, onSelect, onStar, onDelete }) => {
  const [url, setUrl] = useState(null);

  const imageUri = `${collectionTitle}/${item.id}.png`

  const _onDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!ownerAdmin) return;

    if (!confirm("Delete this image?")) return;

    await supabaseClient
      .storage
      .from('art')
      .remove([imageUri]);

    await supabaseClient
      .from('art')
      .delete()
      .eq('id', item.id);
    
    setUrl(null)
    onDelete(item.id);
  }

  const _onStar = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    await supabaseClient
      .from('star')
      .upsert({
        art_id: item.id,
        wallet: wallet,
      })
    
    onStar(item);
  }

  useEffect(() => {
    const getSignedUrl = async () => {
      const { signedURL, error } = await supabaseClient
        .storage
        .from('art')
        .createSignedUrl(imageUri, 60)

      if (error) console.log("Error getting public URL", error)

      setUrl(signedURL);
    }

    getSignedUrl();
  }, [imageUri])

  if (!url) return <></>

  return (
    <div
      className={`border rounded bg-gray-100 relative cursor-pointer ${selected ? 'border-red-600' : ''}`}
      onClick={() => onSelect(item.id)}
    >   
      {index &&
        <div className='absolute top-0 left-0 px-2 py-1 z-10'>
          {index}
        </div>
      }

      <div 
        className={`absolute -top-3 left-0 px-2 py-1 z-10 text-gray-500 text-4xl cursor-pointer`}
        onClick={_onStar}
      >
        &#9733;
      </div>

      {ownerAdmin &&
        <div
          className='absolute -top-1 right-0 px-2 py-1 text-red-600 text-2xl cursor-pointer z-10'
          onClick={_onDelete}
        >
          &#10008;
        </div>
      }
      
      <img
        src={url}
        alt={`${collectionTitle}-${item.id}`}
        layout='intrinsic'
        width={dim}
        height={dim}
      />
    </div>
    
  )
}

export default SupabaseImage;