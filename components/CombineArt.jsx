import { useCallback, useEffect, useRef, useState } from 'react';
import { TWButton } from '.';

const canvasDim = 300;

const CombineArt = ({ selectedArt, claiming }) => {
  const [scroll, setScroll] = useState(0);
  const [buttonText, setButtonText] = useState('Share in Discord');
  const svgMap = useRef({});

  const loadImages = useCallback(() => {
    if (claiming) return;

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
  }, [selectedArt, claiming]);

  useEffect(() => {
    loadImages();
  }, [loadImages]);

  useEffect(() => {
    setButtonText("Share in Discord")
  }, [selectedArt]);

  useEffect(() => { 
    const draw = () => {
      const ids = selectedArt.map(({ id }) => id).join('-');
      if (svgMap.current.drawn?.[ids]) return;
      delete svgMap.current.drawn;
      svgMap.current.drawn = {[ids]: true};

      console.log("HI", ids)

      const svgElement = document.getElementById('svg-element');  
      svgElement.innerHTML = '';

      for (const selected of selectedArt) {
        const domParser = new DOMParser();
        const svgDOM = domParser.parseFromString(svgMap.current[selected.id], 'text/xml')
          .getElementsByTagName('svg')[0];
        
        // const paths = domParser.parseFromString(svgMap[selected.id], 'text/xml')
        //   .getElementsByTagName('path')

        // for (const childNode of paths) {
        //   svgElement.appendChild(childNode);
        // }
  
        for (const childNode of svgDOM.childNodes) {
          const clonedChild = childNode.cloneNode(true);
          svgElement.appendChild(clonedChild);
        }
      }
    }

    const loadSvgInfo = async () => {
      let complete = true;
      for (const selected of selectedArt) {
        if (svgMap.current[selected.id]) continue;

        const existingImage = document.getElementById(`image-${selected.id}`);

        if (!existingImage?.src) {
          complete = false;
          setTimeout(loadSvgInfo, 500);
          return;
        }

        const response = await fetch(existingImage.src);
        const svgText = await response.text();

        svgMap.current = {
          ...svgMap.current,
          [selected.id]: svgText
        };
      }

      if (complete) {
        draw();
      }
    }

    loadSvgInfo();
  }, [selectedArt])

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
      <svg 
        id="svg-element" 
        height={300} 
        width={300} 
        viewBox="0 0 5020 5020"
      ></svg> 
    </div>
  )
}

export default CombineArt;