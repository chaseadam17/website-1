// This is the BlankMinting component.
// It is the page-level component so it is being rendered based on its specified route.

import { useState } from 'react';
import { ethers } from 'ethers';
import {
  BlankLayout,
  TWCenteredContent,
  BlankButton,
  NewWindowLink
} from './_components'
import { BlankArt } from '../contracts'

const Mint = () => {
  const [voucher, setVoucher] = useState(null);
  const [nfts, setNfts] = useState([]);
  const [error, setError] = useState(null);
  const [tx, setTx] = useState(null);
  const [pending, setPending] = useState(false);
  
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
    setTx(null);

    await window.ethereum.enable()
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const recipient = provider.getSigner();

    const amount = document.getElementById('mint-amount').value;
    
    const contractAddress = BlankArt.address;

    const contractAbi = BlankArt.abi;

    const contract = new ethers.Contract(contractAddress, contractAbi, provider);
    const signer = contract.connect(recipient)
    
    try {
      setPending(true);
      const info = await signer.redeemVoucher(amount, voucher)
      setPending(info.hash)
      const receipt = await info.wait();
      setTx(receipt.transactionHash); 
    } catch (error) {
      setError(error.error.message);
      setPending(null);
    }
  }

  return (
    <BlankLayout>
      <TWCenteredContent>
        <div className="mb-36 max-w-lg text-center">
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
          {voucher && !pending && !tx &&
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
          {pending && !tx &&
            <div>
              <h1 className='text-2xl mb-12'>Minting...</h1>
              <p>Please wait, this may take a few minutes.</p>
              {typeof pending === 'string' &&
                <p>
                  You can view your pending transaction on&nbsp;
                  <NewWindowLink
                    href={`https://ropsten.etherscan.io/tx/${pending}`}
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
                  href={`https://ropsten.etherscan.io/tx/${tx}`}
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
  );
}

export default Mint;