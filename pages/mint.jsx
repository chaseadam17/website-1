// This is the BlankMinting component.
// It is the page-level component so it is being rendered based on its specified route.

import Head from 'next/head'
import { useState, useEffect } from 'react';
import { ethers, utils } from 'ethers';
import supabaseClient from '../lib/supabaseClient';
import web3Connection from '../lib/web3Connection'
import { BlankArt } from '../contracts'
import {
  BlankButton,
  BlankLayout,
  NewWindowLink,
  TWCenteredContent
} from '../components'

const BlankMinting = () => {
  const [provider, setProvider] = useState(null);
  const [voucher, setVoucher] = useState(null);
  const [nfts, setNfts] = useState([]);
  const [error, setError] = useState(null);
  const [tx, setTx] = useState(null);
  const [pending, setPending] = useState(false);
  const [gweiGasPrice, setGweiGasPrice] = useState(null)
  const [tokenCount, setTokenCount] = useState(null)
  const [mintAmount, setMintAmount] = useState(null)
  const [address, setAddress] = useState(null)
  const [voucherId, setVoucherId] = useState(5)
  
  const connect = () => web3Connection(BlankArt.networkId, setError, setProvider)
    
  // old whitelist voucher generation
  // useEffect(() => { 
  //   if (!provider) return;

  //   const loadVoucher = async() => {
  //     const recipient = provider.getSigner();
  //     const recipientAddress = await recipient.getAddress();
  //     setAddress(recipientAddress)
      
  //     const airtable = require('airtable');
  //     airtable.configure({ apiKey: process.env.NEXT_PUBLIC_AIRTABLE_READONLY_API_KEY })
  //     const airtableBase = airtable.base('appnTfhh0fxCM8pBx');
  //     const whitelist = airtableBase.table('Whitelist');
  //     const entries = whitelist.select({
  //       filterByFormula: `{WalletAddress} = '${recipientAddress}'`
  //     })
  //     const entry = (await entries.firstPage())[0]
  
  //     if (entry) {
  //       setError(null);  
  //       setVoucher(JSON.parse(entry.fields.Voucher));
  
  //       const gasPrice = await provider.getGasPrice()
  //       const gweiGasPrice = utils.formatUnits(gasPrice, "gwei")
  //       setGweiGasPrice(gweiGasPrice)
  //     } else {
  //       setError("This wallet address is not allowed to mint a BlankArt NFT. Please join the discord and apply to join Blank!")
  //       return
  //     }
  //   }
  
  //   loadVoucher()
  // }, [provider]);

  useEffect(() => {
    if (!provider) return;

    const retrieveVoucher = async() => {
      const recipient = provider.getSigner();
      const recipientAddress = await recipient.getAddress();

      const { data, error } = await supabaseClient
        .from('voucher')
        .select('*')
        .eq('voucher->redeemerAddress', JSON.stringify(recipientAddress))
        .is('redeemed_at', null)
        .maybeSingle()
    
      if (error) {
        setError(error.message)
        return
      }

      if (!data) {
        setError("Unable to find a valid voucher for this wallet address.")
        return;
      }

      setVoucher(data.id)
      setMintAmount(data.count)
      setTokenCount(data.count)
      setVoucher(data.voucher)
    }

    retrieveVoucher();
  }, [provider])
  
  const mint = async () => { 
    setError(null);
    setTx(null);
  
    const recipient = provider.getSigner();
    
    const contractAddress = BlankArt.address;
  
    const contractAbi = BlankArt.abi;
  
    const contract = new ethers.Contract(contractAddress, contractAbi, provider);
    const signer = contract.connect(recipient)
    
    try {
      setPending(true);
      const info = await signer.redeemVoucher(mintAmount, voucher)
      console.log(info)
      setPending(info.hash)
      const receipt = await info.wait();
      setTx(receipt.transactionHash);
    } catch (error) {
      const help = "Please post a message in the #blank-tech discord channel if you need help."
      if (error.error) {
        setError(`-- ${error.error.message} -- ${help}`)
      } else {
        setError(`-- ${error.message} -- ${help}`);
      }
      setPending(null);
    }
  }

  return (
    <div>
      <Head>
        <title>Mint: Blank.Foundation</title>
        <meta name="description" content="United by a blank canvas." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
  
      <BlankLayout>
        <TWCenteredContent>
          <div className="max-w-lg text-center mb-36">
            {nfts.length > 0 &&
              <div>You have NFTs!</div>
            }
            {!voucher &&
              <BlankButton
                classMap={{
                  padding: 'px-3 py-1'
                }}
                onClick={connect}
              >
                Connect Metamask
              </BlankButton>
            }
            {voucher && !pending && !tx &&
              <div>
                <h1 className='mb-12 text-2xl'>Mint</h1>
                <p className='mb-6'>Congratulations, you have been approved to mint!</p>
                <p className='mb-6'>How many Blank NFTs would you like to mint?</p>
                <p className='mb-6'>You can only mint once.</p>
                <p>
                  <select 
                    id="mint-amount" 
                    defaultValue={mintAmount}
                    className='p-3 text-xl border cursor-pointer rounded-xl'
                    onChange={(e) => setMintAmount(e.target.value)}
                  >
                    {Array(tokenCount).fill(0).map((_, i)=> (<option key={i+1} value={i+1}>{i+1}</option>))}
                  </select>
                </p>
                <p>
                  <BlankButton
                    classMap={{
                      padding: 'px-3 py-1'
                    }}
                    onClick={mint}
                  >
                    Mint!
                  </BlankButton>
                </p>
              </div>
            }
            {pending && !tx &&
              <div>
                <h1 className='mb-12 text-2xl'>Minting...</h1>
                <p>Please wait, this may take a few minutes.</p>
                {typeof pending === 'string' &&
                  <p>
                    You can view your pending transaction on&nbsp;
                    <NewWindowLink
                      href={`https://etherscan.io/tx/${pending}`}
                      className="text-blue-600 underline"
                    >
                      Etherscan
                    </NewWindowLink>
                  </p>
                }
              </div>
            }
            {tx &&
              <div>
                <h1 className='mb-12 text-2xl'>Minted!</h1>
                <p>
                  You can see your minted transaction on&nbsp;
                  {address &&
                    <span>
                      <NewWindowLink 
                        href={`https://opensea.io/${address}`}
                        className="text-blue-600 underline"
                      >
                        OpenSea
                      </NewWindowLink>
                      &nbsp;and&nbsp;
                    </span>
                  }
                  <NewWindowLink 
                    href={`https://etherscan.io/tx/${tx}`}
                    className="text-blue-600 underline"
                  >
                    Etherscan
                  </NewWindowLink>.
                </p>
                <p className='pt-3'>
                  Please complete the transaction in discord by running 
                  <code className='bg-gray-700 text-white px-2 py-1 mx-1 text-sm '>
                    /redeem-voucher id:{voucherId}
                  </code>.
                </p>
                <p className='pt-3'>
                  You will not be able to claim any additional vouchers until this step has been completed.
                </p>
              </div>
            }
            {error && !pending &&
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

export default BlankMinting;