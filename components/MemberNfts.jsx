import { useEffect, useState } from 'react';
import { ethers } from 'ethers'
import { BlankArt } from '../contracts';

const MemberNfts = ({ provider, wallet }) => {
  const [tokenIds, setTokenIds] = useState([]);

  useEffect(() => {
    const loadTokens = async () => {
      if (!provider) return;
      if (!wallet) return;

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

  return (
    <div className='py-12'>
      <div className='text-2xl font-bold text-center'>
        Your Blank NFTs
      </div>

      <div className='py-12 text-center text-sm'>
        Between now and June 1st you can lock your Blank NFT to prevent it from evolving.
        <br/>
        <br/>
        On June 1st your Blank NFT will automatically evolve. 
        <br/>
        <br/>
        More information about the evolution can be found in Discord.
      </div>

      <div className='flex flex-wrap gap-3'>
        {tokenIds.map(
          (tokenId) => (
            <div 
              key={`token-${tokenId}`}
              className='border w-48 h-48 p-3 cursor-pointer'
            >
              <div className='text-lg text-center font-bold'>
                {tokenId}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default MemberNfts;