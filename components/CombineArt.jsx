import { useCallback, useEffect, useState } from 'react';
import { TWButton } from '.';

const canvasDim = 300;

const CombineArt = ({ selectedArt, collection }) => {
  const [scroll, setScroll] = useState(0);
  const [buttonText, setButtonText] = useState('Share in Discord');

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

  useEffect(() => {
    setButtonText("Share in Discord")
  }, [selectedArt]);

  const sendToDiscord = async () => {
    if (buttonText !== "Share in Discord") return;

    setButtonText('Sharing...')
    const canvas = document.getElementById('canvas');

    const params = {
      username: "Birb Webhook",
      content: "A new full Birb has been shared!"
    }

    const request = new XMLHttpRequest();
    request.open("POST", process.env.NEXT_PUBLIC_DISCORD_WEBHOOK);

    const form = new FormData();
    form.append("payload_json", JSON.stringify(params));
    canvas.toBlob((blob) => {
      form.append('file1', blob, 'birb.png');
      request.send(form)
      setButtonText('Shared')
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
      {selectedArt.length > 0 && (
        <div className='mt-3 text-center'>
          <TWButton
            onClick={sendToDiscord}
          >
            {buttonText}
          </TWButton>

        </div> 
      )} 
    </div>
  )
}

export default CombineArt;