/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from 'react';
import supabaseClient from '../lib/supabaseClient';

const SupabaseImage = ({ ownerAdmin, collectionTitle, item, index, dim, selected, onSelect }) => {
  const [url, setUrl] = useState(null);

  const imageUri = `${collectionTitle}/${item.id}.png`

  const onDelete = async (e) => {
    e.preventDefault();
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
  }

  const onStar = async (e) => {
    e.preventDefault();
    console.log("STAR", item.id)
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
    >   
      {index &&
        <div className='absolute top-0 left-0 px-2 py-1 z-10'>
          {index}
        </div>
      }

      <div 
        className={`absolute -top-3 left-0 px-2 py-1 z-10 text-gray-500 text-4xl cursor-pointer`}
        onClick={onStar}
      >
        &#9733;
      </div>

      {ownerAdmin &&
        <div
          className='absolute -top-1 right-0 px-2 py-1 text-red-600 text-2xl cursor-pointer z-10'
          onClick={onDelete}
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