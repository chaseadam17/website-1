import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { BlankArt } from "../contracts";

const ClaimNft = ({ provider, wallet }) => {
  const [tokenIds, setTokenIds] = useState([]);

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
  })

  return (
    <div>
      <div>
        Claim This Art For Your Blank NFT
      </div>
      <div>
        <div className='py-6'>
          Select which Blank NFT you would like to evolve using this art?
        </div>
        {tokenIds.map(
          (tokenId) => (
            <div 
              key={`token-${tokenId}`}
              className='border w-full p-3 mb-3'
            >
              {tokenId}
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default ClaimNft;