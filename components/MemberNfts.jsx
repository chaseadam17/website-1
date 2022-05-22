import { useEffect, useState } from 'react';
import { ethers } from 'ethers'
import { BlankArt } from '../contracts';
import BlankButton from './BlankButton';

const MemberNfts = ({ provider, wallet }) => {
  const [tokenIds, setTokenIds] = useState([]);
  const [lockedMap, setLockedMap] = useState({})

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

      const _tokenIds = Object.keys(tokenIdsMap)
      setTokenIds(_tokenIds)

      const _lockedMap = {}
      for (const _tokenId of _tokenIds) {
        const locked = await contract.tokenURILocked(_tokenId)
        _lockedMap[_tokenId] = locked.toString() === "1";
      }

      setLockedMap(_lockedMap)
    }

    loadTokens();
  }, [provider, wallet])

  const lockNft = async (tokenId) => {
    const contract =  new ethers.Contract(BlankArt.address, BlankArt.abi, provider);
    const signer = provider.getSigner();
    const connectedSigner = contract.connect(signer)

    const tx = await connectedSigner.lockTokenURI(tokenId);
    await tx.wait();

    setLockedMap({
      ...lockedMap,
      [tokenId]: true
    })
  }

  return (
    <div className='py-12'>
      <div className='text-2xl font-bold text-center'>
        Your Blank NFTs
      </div>

      <div className='py-12 px-24 text-center text-sm'>
        Between now and June 1st you can lock your Blank NFT to prevent it from evolving.
        <br/>
        <br/>
        On June 1st your Blank NFT will automatically evolve if it is not locked. 
        <br/>
        <br/>
        More information about the evolution can be found in Discord.
        <br/>
        <br/>
        Click &#34;Lock NFT&#34; on any NFT below to lock it. You will need to sign the transaction and can reject it to cancel.
        <br/>
        <br/>
        Locking is permanent and can&apos;t be undone.
      </div>

      <div className='pl-24 pr-6 flex flex-wrap gap-3'>
        {tokenIds.map(
          (tokenId) => (
            <div 
              key={`token-${tokenId}`}
              className={`border w-48 h-48 ${lockedMap[tokenId] ? 'bg-gray-300' : ''}`}
            >
              <div className='p-3 text-lg text-center font-bold'>
                {tokenId}
              </div>
              <div className='text-center pt-3'>
                {lockedMap[tokenId] ? <>Locked</> : <>Not Locked</>}
              </div>
              {!lockedMap[tokenId] && (
                <div className='text-center'>
                  <BlankButton
                    classMap={{
                      background: "border-2 text-gray-700",
                      padding: "px-6 py-3 rounded-full",
                    }}
                    onClick={() => lockNft(tokenId)}
                  >
                    &#128274; Lock NFT
                  </BlankButton>
                </div>
              )}
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default MemberNfts;
