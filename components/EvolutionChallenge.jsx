import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import supabaseClient from '../lib/supabaseClient'
import { BlankArt } from '../contracts';
import SelectTokenToEvolve from './SelectTokenToEvolve';
import ConstructNft from './ConstructNft';

const EvolutionChallenge = ({ provider, wallet }) => {
  const [collection, setCollection] = useState();
  const [tokenIds, setTokenIds] = useState([]);
  const [lockedMap, setLockedMap] = useState({})
  const [nfts, setNfts] = useState({})
  const [evolvingTokenId, setEvolvingTokenId] = useState()

  useEffect(() => {
    const loadCollection = async () => {
      const { data, error } = await supabaseClient
        .from('collection')
        .select('*, art(*)')
        .eq('title', 'SVG Birbs')
        .maybeSingle();

      if (error) {
        console.log(error)
      }

      setCollection(data)
    }

    loadCollection();

  }, [])

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

  if (collection && evolvingTokenId) {
    return (
      <ConstructNft
        wallet={wallet}
        tokenId={evolvingTokenId}
        collection={collection}
        onComplete={(newNFT) => {
          if (newNFT) {
            setNfts({
              ...nfts,
              ...newNFT
            })
          }
          setEvolvingTokenId(null)
        }}
      />
    )
  }

  return (
    <SelectTokenToEvolve
      tokenIds={tokenIds}
      lockedMap={lockedMap}
      nfts={nfts}
      onEvolve={(tokenId) => setEvolvingTokenId(tokenId)}
      onClear={(nfts) => setNfts(nfts)}
    />
  )      
}

export default EvolutionChallenge;