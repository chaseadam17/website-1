// This is the BlankMinting component.
// It is the page-level component so it is being rendered based on its specified route.

import { useState } from 'react';
import { ethers } from 'ethers';
import {
  BlankLayout,
  TWCenteredContent,
  BlankButton
} from './_components'
import { BlankArt } from '../contracts'

const Mint = () => {
  const [voucher, setVoucher] = useState(null);
  const [nfts, setNfts] = useState([]);
  const [error, setError] = useState(null);
  
  const connect = async () => {
    await window.ethereum.enable()
    const provider = new ethers.providers.Web3Provider(window.ethereum)
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
      setVoucher(JSON.parse(entry.fields.Voucher));
    } else {
      setError("This wallet address is not allowed to mint a BlankArt NFT.")
    }
  }
  
  const mint = async () => {
    setError(null);
    
    await window.ethereum.enable()
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const recipient = provider.getSigner();

    const amount = document.getElementById('mint-amount').value;
    
    const contractAddress = BlankArt.address;

    const contractAbi = BlankArt.abi;

    const contract = new ethers.Contract(contractAddress, contractAbi, provider);
    const signer = contract.connect(recipient)
    
    try {
      const ids = await signer.redeemVoucher(amount, voucher);
      console.log("MINTED!", ids)
    } catch (error) {
      setError(error.error.message)
    }
  }

  return (
    <BlankLayout>
      <TWCenteredContent className='mb-36'>
        <div className="max-w-lg text-center">
          {nfts.length > 0 &&
            <div>You have NFTs!</div>
          }
          {!voucher &&
            <BlankButton
              onClick={connect}
            >
              Connect Metamask
            </BlankButton>
          }
          {voucher &&
            <div>
              <h1 className='text-2xl mb-12'>Mint</h1>
              <p className='mb-6'>Congratulations, you have been approved to mint!</p>
              <p className='mb-6'>How many Blank NFTs would you like to mint?</p>
              <p>
                <select id="mint-amount" className='cursor-pointer border text-xl p-3 rounded-xl'>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </p>
              <p>
                <BlankButton
                  onClick={mint}
                >
                  Mint!
                </BlankButton>
              </p>
            </div>
          }
          {error &&
            <div className='text-red-800 text-lg my-6'>
              {error}
            </div>
          }
        </div>
      </TWCenteredContent>
    </BlankLayout>
  );
}

export default Mint;