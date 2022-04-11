/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from 'react';
import supabaseClient from '../lib/supabaseClient';

const SupabaseImage = ({ transparent, wallet, ownerAdmin, collectionTitle, item, index, dim, selected, starred, onSelect, onStar, onDelete }) => {
  const [url, setUrl] = useState(null);

  const imageUri = `${collectionTitle}/${item.id}.${collectionTitle === 'SVG Birbs' ? 'svg' : 'png'}`;

  const _onDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!ownerAdmin) return;

    if (!confirm("Delete this image?")) return;

    await supabaseClient
      .from('star')
      .delete()
      .eq('art_id', item.id)

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
    
    const query = supabaseClient.from('star')

    if (starred) {
      const { error } = await query
        .delete()
        .eq('art_id', item.id)
        .eq('wallet', wallet);

    } else {
      const { error } = await query.upsert({
        art_id: item.id,
        wallet: wallet,
      })

      if (error) {
        console.log("Error starring", error)
      }
    }

    const { count } = await supabaseClient
      .from('star')
      .select('id', { count: 'exact', head: true })
      .eq('art_id', item.id)

    const { body, data, error } = await supabaseClient
      .from('art')
      .update({
        star_count: count
      })
      .eq('id', item.id)
    
    item.star_count = count;
    onStar(item);
  }

  const _onSelect = (e) => {
    if (!starred) {
      _onStar(e);
    }

    onSelect(item.id);
  }

  useEffect(() => {
    const getSignedUrl = async () => {
      const { signedURL, error } = await supabaseClient
        .storage
        .from('art')
        .createSignedUrl(imageUri, 60)

      if (error) {
        console.log("Error getting public URL", error)
        if (selected) onSelect(item.id)
        return
      }

      setUrl(signedURL);
    }

    getSignedUrl();
  }, [imageUri, item, selected, onSelect])

  if (!url) return <></>

  return (
    <div
      className={`border rounded ${transparent ? '' : 'bg-gray-100'} relative cursor-pointer ${selected ? 'border-red-600' : ''}`}
      style={{ width: `${dim}px`, height: `${dim}px` }}
      onClick={_onSelect}
    >   
      {index &&
        <div className='absolute top-0 left-0 px-2 py-1 z-10'>
          {index}
        </div>
      }

      {!transparent && (
        <div 
          className={`absolute -top-5 -left-1 p-1 z-10 ${starred ? 'text-yellow-300' : 'text-gray-500'} cursor-pointer`}
          onClick={_onStar}
        >
          <span className='text-4xl'>&#9733;</span>
          <span className='text-xs text-gray-900 align-text-top'>({item.star_count})</span>
        </div>
      )}

      {ownerAdmin &&
        <div
          className='absolute -top-3 -right-1 p-1 text-red-600 text-2xl cursor-pointer z-10'
          onClick={_onDelete}
        >
          &#x2715;
        </div>
      }
      
      <img
        id={`image-${item.id}`}
        src={url}
        alt={`${collectionTitle}-${item.id}`}
        layout='intrinsic'
        width={dim}
        height={dim}
        crossOrigin='anonymous'
      />
    </div>
    
  )
}

export default SupabaseImage;