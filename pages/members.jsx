import Head from 'next/head'
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import web3Connection from '../lib/web3Connection'
import providerSignerHasToken from '../lib/providerSignerHasToken'
import { BlankArt } from '../contracts'
import {
  BlankLayout,
  BlankButton,
  TWCenteredContent
} from '../components'

const BlankMembers = () => {
  const [provider, setProvider] = useState(null);
  const [error, setError] = useState(null);
  const [hasToken, setHasToken] = useState(null);

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

  return (
    <div>
      <Head>
        <title>Members: Blank.Foundation</title>
        <meta name="description" content="United by a blank canvas." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
  
      <BlankLayout>
        <TWCenteredContent>
          <div className='container mx-auto text-center'>
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
            {hasToken &&
              <div>
                You have a token!
              </div>
            }
            {hasToken === false &&
              <div>
                I&apos;m sorry you&apos;re not a Blank member.
              </div>
            }
            {error &&
              <div className='my-6 text-lg text-red-800'>
                {error}
              </div>
            }
          </div>
        </TWCenteredContent>
      </BlankLayout>
    </div>
  );
}

export default BlankMembers;