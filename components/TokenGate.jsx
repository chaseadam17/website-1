import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import web3Connection from '../lib/web3Connection'
import providerSignerHasToken from '../lib/providerSignerHasToken'
import { BlankArt } from '../contracts'
import { BlankButton } from '../components'
import NextLink from './NextLink';

const TokenGate = ({ children }) => {
  const [hasToken, setHasToken] = useState(null)
  const [provider, setProvider] = useState(null);
  const [error, setError] = useState(null);

  const connect = () => web3Connection(BlankArt.networkId, setError, setProvider)

  useEffect(() => {
    if (!provider) return;

    const loadToken = async() => {
      const contract =  new ethers.Contract(BlankArt.address, BlankArt.abi, provider);
      const _hasToken = await providerSignerHasToken(provider, contract)
      setHasToken(_hasToken)
    }

    loadToken();
  }, [provider])

  useEffect(() => {
    connect();
  }, [])

  return (
    <div>  
      {!provider &&
        <BlankButton
          classMap={{
            padding: 'px-3 py-1'
          }}
          onClick={connect}
        >
          Connect Metamask
        </BlankButton>
      }
      {hasToken && children}
      {hasToken === false &&
        <div>
          <div className='py-3'>
            I&apos;m sorry you&apos;re not a Blank member.
          </div>
          <div className='py-3'>
            You need a Blank NFT in your wallet to be a Blank member.
          </div>
          <div className='py-3'>
            You can purchase Blanks on&nbsp;
            <a
              href='https://opensea.io/collection/blankart-1'
              target='blank'
              rel='noopener noreferrer'
              className='text-blue-600 underline'
            >
              OpenSea
            </a>.
          </div>
          <div className='py-3'>
            If you have Blanks in a different wallet please connect that wallet and refresh this page.
          </div>
        </div>
      }
      {error &&
        <div className='my-6 text-lg text-red-800'>
          {error}
        </div>
      }
    </div>
  );
}

export default TokenGate;