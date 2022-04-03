import { useCallback, useEffect, useState } from 'react';
import { TWButton } from '.';

const canvasDim = 300;

const CombineArt = ({ selectedArt, collection }) => {
  const [scroll, setScroll] = useState(0);

  const loadImages = useCallback(() => {
    const canvas = document.getElementById('canvas');
    canvas.width = canvasDim;
    canvas.height = canvasDim;

    const ctx = canvas.getContext('2d');
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (const selected of selectedArt) {
      const image = new Image();
      image.crossOrigin = 'anonymous';
      const existingImage = document.getElementById(`image-${selected.id}`);

      if (!existingImage || !existingImage.complete || existingImage.naturalHeight === 0) {
        setTimeout(loadImages, 500);
        return;
      }

      image.src = existingImage.src;
      image.onload = () => {
        ctx.drawImage(image,0,0, canvasDim, canvasDim);
      };
    }
  }, [selectedArt]);

  useEffect(() => {
    loadImages();
  }, [loadImages]);

  const sendToDiscord = async () => {
    const canvas = document.getElementById('canvas');
    const discordWebhook = "https://discord.com/api/webhooks/959922483182575677/8dg9INh3W4XXkmdQIvXkpxZecc9VtzZ5rIikz9y5xJ1PVcuzr3cw2gwiwsdHamrXMeON"

    const params = {
      username: "Birb Webhook",
      content: "A new full Birb has been shared!"
    }

    const request = new XMLHttpRequest();
    request.open("POST", discordWebhook);

    const form = new FormData();
    form.append("payload_json", JSON.stringify(params));
    canvas.toBlob((blob) => {
      form.append('file1', blob, 'image.png');
      request.send(form)
    }); 
  }

  return (
    <div className=''>
      <h3 className='mb-3'>Combined Image</h3>
      <canvas 
        id='canvas' 
        className='relative border' 
        style={{width: `${canvasDim}px`, height: `${canvasDim}px`}}>  
        

        {/* {selectedArt.map(
          (layer, index) => (
            <div  
              key={`layer-${index}`}  
              className='absolute w-full h-full' 
            >
              <SupabaseImage
                collectionTitle={collection.title}
                item={layer}
                dim={300}
                transparent={true}
              />
            </div>
          )
        )} */}
      </canvas>
      <div className='mt-3 text-center'>
        <TWButton
          onClick={sendToDiscord}
        >
          Share in Discord
        </TWButton>

      </div>  
    </div>
  )
}

export default CombineArt;