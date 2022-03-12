import { useEffect, useState } from 'react';
import Image from 'next/image'
import supabaseClient from '../lib/supabaseClient';

const SupabaseImage = ({ collection, item }) => {
  const [url, setUrl] = useState(null);

  const imageUri = `${collection.title}/${item.id}.png`

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
      className='border rounded relative'
    >   
      <Image
        src={url}
        alt={`${collection.title}-${item.id}`}
        layout='intrinsic'
        width={240}
        height={240}
      />
    </div>
    
  )
}

export default SupabaseImage;