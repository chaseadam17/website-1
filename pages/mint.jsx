// This is the BlankMinting component.
// It is the page-level component so it is being rendered based on its specified route.

import { useState } from 'react';
import { ethers } from 'ethers';
import {
  BlankLayout,
  TWCenteredContent,
  BlankButton
} from './_components'

const Mint = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  
  const connect = async () => {
    await window.ethereum.enable()
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const recipient = provider.getSigner();
    const recipientAddress = await recipient.getAddress();
    console.log("ADDRESS", recipientAddress);
    setConnected(recipientAddress);
  }
  
  const mint = async () => {
    await window.ethereum.enable()
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const recipient = provider.getSigner();
    const recipientAddress = await recipient.getAddress();
    console.log("ADDRESS", recipientAddress)
  
    const airtable = require('airtable');
    console.log("API", process.env.NEXT_PUBLIC_AIRTABLE_READONLY_API_KEY)
    airtable.configure({ apiKey: process.env.NEXT_PUBLIC_AIRTABLE_READONLY_API_KEY })
    const airtableBase = airtable.base('appnTfhh0fxCM8pBx');
    const whitelist = airtableBase.table('Whitelist');
    const entries = whitelist.select({
      filterByFormula: `{WalletAddress} = '${recipientAddress}'`
    })
    console.log(await entries.firstPage())
  }

  return (
    <BlankLayout>
      <TWCenteredContent>
        <div className="break-all max-w-md" id="content">
          <BlankButton
            onClick={connect}
          >
            Connect Metamask
          </BlankButton>
        </div>
      </TWCenteredContent>
    </BlankLayout>
  );
}

export default Mint;