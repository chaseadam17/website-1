import { useEffect, useState } from "react";
import supabaseClient from "../lib/supabaseClient";
import { fullDim } from "./CombineArt";

const nftDim = 120;

const ViewAllNfts = () => {
  const [allNfts, setAllNfts] = useState();

  useEffect(() => {
    const loadAllNfts = async () => {
      const { data, error } = await supabaseClient
        .from("nft")
        .select("*")
      
      if (error) {
        console.log("Error loading all nfts", error)
        return;
      }

      setAllNfts(data)
    }

    loadAllNfts();
  })

  const generateManifest = () => {
    const metadata = {
      "name":"Blank NFT",
      "description":"In the beginning, there was Blank.",
      "tokenId": 1,
      "image":"https://arweave.net/yd87agVBoAGgneJ95QFyj1H_Xkk_CefZwLhYTNH1NlI",
      "attributes": [
        {
          "trait_type": "Generation",
          "value": "The beginning"
        }
      ]
    }

    const blankBirbSvg = "https://arweave.net/u1M6Y5rpusz_LgEE0pTeeL7MAQr7MADl1EsH7z5SCnQ";
    const manifest = {
      "manifest": "arweave/paths",
      "version": "0.1.0",
      "index": {"path": blankBirbSvg},
      "paths": []
    }

    console.log(manifest)
  }

  return (
    <div>
      <h2 className='text-lg mb-6'>All Claimed NFTs</h2>
      {!allNfts && (
        <div>Loading...</div>
      )}

      <div className='flex flex-wrap gap-3 pb-36'>      
        {allNfts && allNfts.map(
          (nft) => (
            <div 
              key={`nft-${nft.id}`}
              className='border w-40 h-44 px-5 py-3 bg-gray-700 text-center'
            >
              <div className='text-white'>{nft.token_id}</div>
              <svg 
                id='claim-svg' 
                className='mt-2 bg-white' 
                width={nftDim}
                height={nftDim}
                viewBox={`0 0 ${fullDim} ${fullDim}`}
                dangerouslySetInnerHTML={{ __html: nft.info.image }}
              >  
              </svg>
            </div>
          )        
        )}
      </div>
    </div>
  )

}

export default ViewAllNfts;