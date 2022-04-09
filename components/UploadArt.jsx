import { useState } from 'react';
import {
  TWButton,
} from '.'
import supabaseClient from '../lib/supabaseClient';

const UploadArt = ({ collection, wallet, onUpload }) => {
  const [file, setFile] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  const imageUri = (id) => `${collection.title}/${id}.svg`

  const sendToDiscord = async () => {
    const params = {
      username: "Birb Webhook",
      content: collection.title === 'Full Artwork' ? 
        "A new full image has been added!" : 
        "A new layer has been added!"
    }

    const request = new XMLHttpRequest();
    request.open("POST", process.env.NEXT_PUBLIC_DISCORD_WEBHOOK);

    const form = new FormData();
    form.append("payload_json", JSON.stringify(params));
    form.append('file1', file); 

    request.send(form)
  }

  const submit = async () => {
    if (!file || !wallet) return;

    const insert = async () => {
      const { body, error } = await supabaseClient
        .from('art')
        .insert({
          collection_id: collection.id,
          wallet: wallet
        })

      if (error) console.log("INSERT ERROR", error)

      await sendToDiscord()

      document.getElementById('upload-file').value = null;
      
      setShowSuccessMessage(true)

      return body[0] 
    }

    const storage = async (id) => {
      const { data, error } = await supabaseClient
      .storage
        .from('art')
        .upload(imageUri(id), file, {
          cacheControl: '3600',
          upsert: false
        })

      if (error) console.log("STORAGE ERROR", error)

      return data.Key
    }
    
    const artItem = await insert();
    await storage(artItem.id);
  
    onUpload(artItem)
  }

  return (
  <div className='border bg-green-100 p-3'>
      <p>Upload An SVG Birb Layer</p>
      <p className='text-xs py-3'>Please make sure your image is an SVG file.</p>
      <input
        type='file'
        id='upload-file'
        className='mr-3'
        onChange={(e) => {
          setShowSuccessMessage(false)
          setFile(e.target.files[0])
        }}
      />
      <div className='pt-3'>
        <TWButton
          onClick={submit}
        >
          Submit
        </TWButton>
      </div>
      {showSuccessMessage && (
        <div className='pt-3 text-xs'>
          Success! Your layer has been added to the collection (see below).
        </div>
      )}
    </div>
  )
}

export default UploadArt;