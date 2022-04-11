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

  return (
    <div>
      <h2 className='text-lg mb-6'>All Claimed NFTs</h2>
      {!allNfts && (
        <div>Loading...</div>
      )}

      <div className='flex'>      
        {allNfts && allNfts.map(
          (nft) => (
            <div 
              key={`nft-${nft.id}`}
              className='border w-40 h-44 px-5 py-3 mr-3 mb-3 bg-gray-700 text-center'
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