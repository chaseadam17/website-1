/* eslint-disable @next/next/no-img-element */

import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { BlankArt } from "../contracts";
import supabaseClient from "../lib/supabaseClient";
import { fullDim } from "./CombineArt";
import { TWButton } from ".";

const claimCanvasDim = 90;

const ClaimNft = ({ provider, wallet, selected, onComplete }) => {
  const [tokenIds, setTokenIds] = useState([]);
  const [nfts, setNfts] = useState({});
  const [assigning, setAssigning] = useState();
  const [complete, setComplete] = useState(false)

  useEffect(() => {
    const loadTokens = async () => {
      const contract =  new ethers.Contract(BlankArt.address, BlankArt.abi, provider);

      const walletTransfersFrom = await contract.queryFilter(contract.filters.Transfer(wallet))
      const walletTransfersTo = await contract.queryFilter(contract.filters.Transfer(null, wallet))
      const allWalletTransfers = [...walletTransfersFrom, ...walletTransfersTo].sort(
        (a, b) => a.blockNumber - b.blockNumber
      )
      const tokenIdsMap = {}
      for (const transfer of allWalletTransfers) {
        if (transfer.args.to === wallet) {
          tokenIdsMap[transfer.args.tokenId] = true
        } else {
          delete tokenIdsMap[transfer.args.tokenId]
        }
      }
      setTokenIds(Object.keys(tokenIdsMap))
    }

    loadTokens();
  }, [provider, wallet])

  useEffect(() => {
    const loadNfts = async () => {
      const { data, error } = await supabaseClient
        .from('nft')
        .select('*')
        .eq('wallet', wallet)

      const _nfts = {}
      for (const nft of data) {
        _nfts[nft.token_id] = nft;
      }
      setNfts(_nfts)
    }

    loadNfts();
  }, [wallet])

  useEffect(() => {
    const loadSvg = () => {
      const claimSvg = document.getElementById('claim-svg');
      const combinedSvg = document.getElementById('combined-svg');
      if (!claimSvg || !combinedSvg) {
        setTimeout(loadSvg, 100);
        return;
      }

      const clonedCombined = combinedSvg.cloneNode(true);
      claimSvg.append(clonedCombined);  
    }

    loadSvg();
  }, [])

  useEffect(() => {
    if (Object.keys(nfts).length === 0) {
      setComplete(false);
      return;
    }

    for (const nft of Object.values(nfts)) {
      const matchingLength = selected.filter(
        (id) => nft.info.layers.indexOf(id) !== -1
      ).length;

      const matching = (
        matchingLength === nft.info.layers.length &&
        matchingLength === selected.length
      )

      if (matching) {
        setComplete(true);
        return;
      }
    }
  }, [selected, nfts])

  const assignNft = async (tokenId) => {
    setAssigning(tokenId)
    const { body, error } = await supabaseClient
      .from('nft')
      .insert({
        info: {
          layers: selected,
          combinedLayers: selected.join(','),
          image: document.getElementById('combined-svg').innerHTML
        },
        wallet: wallet,
        token_id: tokenId
      })

    setAssigning(null)

    if (error) console.log("ASSIGN NFT ERROR", error)

    setNfts({
      ...nfts,
      [tokenId]: body[0]
    })
  }
  
  const deleteNft = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!confirm("Clear this claimed NFT?")) return;

    const info = e.target.id.replace('delete-', '');
    const [tokenId, id] = info.split('~');

    const response = await supabaseClient
      .from('nft')
      .delete()
      .eq('id', id);

    const _nfts = { ...nfts };
    delete _nfts[tokenId];
    setNfts(_nfts);
  }

  return (
    <div>
      <div>
        Claim This Art For Your Blank NFT
      </div>
      <div className='pt-6'>
        <svg 
          id='claim-svg' 
          className='relative border' 
          width={claimCanvasDim}
          height={claimCanvasDim}
          viewBox={`0 0 ${fullDim} ${fullDim}`}
        >  
        </svg>

        <div className='py-6'>
          {complete ? 
            'You have claimed this NFT!' : 
            'Select which Blank NFT you would like to evolve using this art?'
          }
        </div>
        <div className='flex flex-wrap'>
          {tokenIds.map(
            (tokenId) => (
              <div 
                key={`token-${tokenId}`}
                className='border w-32 h-32 p-3 mr-3 cursor-pointer'
                onMouseOver={() => document.getElementById(`token-${tokenId}-check`).classList.add('bg-green-800')}
                onMouseLeave={() => document.getElementById(`token-${tokenId}-check`).classList.remove('bg-green-800')}
                onClick={() => assignNft(tokenId)}
              >
                <div className='flex justify-between'>
                  <div>{tokenId}</div>
                  {nfts[tokenId] && (
                    <div
                      id={`delete-${tokenId}~${nfts[tokenId]?.id}`}
                      className='text-red-600 text-2xl -mt-2'
                      onClick={deleteNft}
                    >
                      &#x2715;
                    </div>
                  )}
                </div>
                {nfts[tokenId] && (
                  <svg 
                    id='claim-svg' 
                    className='relative ml-2' 
                    width={claimCanvasDim}
                    height={claimCanvasDim}
                    viewBox={`0 0 ${fullDim} ${fullDim}`}
                    dangerouslySetInnerHTML={{ __html: nfts[tokenId].info.image }}
                  >  
                  </svg>
                )}
                <div
                  id={`token-${tokenId}-check`}                     
                  className={`${nfts[tokenId] ? 'hidden' : ''} m-6 rounded-full border border-gray-300 h-12 w-12 mx-auto text-4xl text-center text-gray-300`}                   
                >
                  {assigning === tokenId ? <>&#8631;</> : <>&#10003;</>}
                </div>
              </div>
            )
          )}
        </div>
      </div>
      <div className='py-6'>
        <TWButton
          onClick={onComplete}
        >
          Back
        </TWButton>
      </div>
    </div>
  )
}

export default ClaimNft;