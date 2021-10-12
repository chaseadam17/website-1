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
  const [walletAddress, setWalletAddress] = useState(null);
  
  const connect = async () => {
    await window.ethereum.enable()
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const recipient = provider.getSigner();
    const recipientAddress = await recipient.getAddress();
    setWalletAddress(recipientAddress);
  }
  
  const mint = async () => {
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
    const voucher = entry.fields.Voucher;

    const amount = document.getElementById('mint-amount').value;
    
    const contractAddress = BlankArt.address;

    const contractAbi = BlankArt.abi;

    const contract = new ethers.Contract(contractAddress, contractAbi, provider);
    
    const x = await contract.redeemVoucher(amount, voucher);
    console.log("MINTED!", x)
  }

  return (
    <BlankLayout>
      <TWCenteredContent>
        <div className="break-all max-w-md" id="content">
          {!walletAddress &&
            <BlankButton
              onClick={connect}
            >
              Connect Metamask
            </BlankButton>
          }
          {walletAddress &&
            <div className='text-center'>
              <h1 className='text-xl mb-12'>Mint</h1>
              <p className='mb-6'>How many Blank NFTs would you like to mint?</p>
              <p>
                <select id="mint-amount">
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
        </div>
      </TWCenteredContent>
    </BlankLayout>
  );
}

export default Mint;