import { useEffect, useState } from 'react';
import Image from 'next/image'
import supabaseClient from '../lib/supabaseClient';

const SupabaseImage = ({ uri, name }) => {
  const [url, setUrl] = useState(null);

  useEffect(() => {
    const getSignedUrl = async () => {
      const { signedURL, error } = await supabaseClient
        .storage
        .from('art')
        .createSignedUrl(uri, 60)

      if (error) console.log("Error getting public URL", error)

      setUrl(signedURL);
    }

    getSignedUrl();
  }, [uri])

  if (!url) return <></>

  return (
    <div
      className='border rounded relative'
    >   
      <Image
        src={url}
        alt={name}
        layout='intrinsic'
        width={300}
        height={300}
      />
    </div>
    
  )
}

export default SupabaseImage;