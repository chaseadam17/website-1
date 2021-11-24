// This is the BlankMinting component.
// It is the page-level component so it is being rendered based on its specified route.

import Head from 'next/head'
import { useState, useEffect } from 'react';
import { ethers, utils } from 'ethers';
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
  const [mintAmount, setMintAmount] = useState(5)
  
  const connect = async () => {
    web3Connection(network, setError, setProvider)
  }
    
  useEffect(() => { 
    if (!provider) return;
     
    const loadVoucher = async() => {
      const recipient = provider.getSigner();
      const recipientAddress = await recipient.getAddress();
      
      const airtable = require('airtable');
      airtable.configure({ apiKey: process.env.NEXT_PUBLIC_AIRTABLE_READONLY_API_KEY })
      const airtableBase = airtable.base('appnTfhh0fxCM8pBx');
      const whitelist = airtableBase.table('Whitelist');
      const entries = whitelist.select({
        filterByFormula: `{WalletAddress} = '${recipientAddress}'`
      })
      const entry = (await entries.firstPage())[0]
  
      if (entry) {
        setError(null);  
        setVoucher(JSON.parse(entry.fields.Voucher));
  
        const gasPrice = await provider.getGasPrice()
        const gweiGasPrice = utils.formatUnits(gasPrice, "gwei")
        setGweiGasPrice(gweiGasPrice)
      } else {
        setError("This wallet address is not allowed to mint a BlankArt NFT. Please join the discord and apply to join Blank!")
        return
      }
    }
  
    loadVoucher()
  }, [provider]);
  
  const mint = async () => { 
    setError(null);
    setTx(null);
  
    const recipient = provider.getSigner();
  
    const amount = document.getElementById('mint-amount').value;
    
    const contractAddress = BlankArt.address;
  
    const contractAbi = BlankArt.abi;
  
    const contract = new ethers.Contract(contractAddress, contractAbi, provider);
    const signer = contract.connect(recipient)
    
    try {
      setPending(true);
      const info = await signer.redeemVoucher(amount, voucher)
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
  
  const gasEstimate = () => {
    const gasUsed = [
      112413,
      162472,
      196000,
      228339,
      261290
    ][mintAmount - 1]
  
    const eth = gweiGasPrice * 0.000000001
    return parseInt(mintAmount * eth * gasUsed * 10000) / 10000
  }

  return (
    <div>
      <Head>
        <title>Blank.Foundation</title>
        <meta name="description" content="United by a blank canvas." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
  
      <BlankLayout>
        <TWCenteredContent>
          <div className="mb-36 max-w-lg text-center">
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
                <h1 className='text-2xl mb-12'>Mint</h1>
                <p className='mb-6'>Congratulations, you have been approved to mint!</p>
                <p className='mb-6'>How many Blank NFTs would you like to mint?</p>
                <p className='mb-6'>You can only mint once.</p>
                <p>
                  <select 
                    id="mint-amount" 
                    defaultValue="5"
                    className='cursor-pointer border text-xl p-3 rounded-xl'
                    onChange={(e) => setMintAmount(e.target.value)}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </p>
                {gweiGasPrice &&
                  <p className='mt-3'>
                    Minting {mintAmount} Blank NFT{mintAmount > 1 ? 's': ''} will cost
                    <br/>
                    roughly {gasEstimate()} Eth right now.
                  </p>
                }
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
                <h1 className='text-2xl mb-12'>Minting...</h1>
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
                <h1 className='text-2xl mb-12'>Minted!</h1>
                <p>
                  You can see your minted transaction on&nbsp;
                  <NewWindowLink 
                    href={`https://etherscan.io/tx/${tx}`}
                    className="text-blue-600 underline"
                  >
                    Etherscan
                  </NewWindowLink>.
                </p>
              </div>
            }
            {error && !pending &&
              <div className='text-red-800 text-lg my-6'>
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