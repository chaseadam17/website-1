// This is the BlankVoucher component.
// It is the page-level component so it is being rendered based on its specified route.

declare const window: Window &
   typeof globalThis & {
      ethereum: any
   }


import { FunctionComponent } from "react"
import { useState } from 'react';
import { ethers } from 'ethers';
import {
  BlankButton,
  BlankLayout,
  TWCenteredContent
} from '../components'
import LazyMinter from '../lib/LazyMinter'
import { BlankArt } from '../contracts'

type VoucherProps = {
}

const Voucher: FunctionComponent<VoucherProps> = () => {

  const [voucher, setVoucher] = useState(null)

  const generateVoucher = async () => {
    await window.ethereum.enable()
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    
    const contractAddress = BlankArt.address;

    const contractAbi = BlankArt.abi;

    const contract = new ethers.Contract(contractAddress, contractAbi, provider);

    const lazyMinter = new LazyMinter({ contract, signer })

    try {
      await contract.name()
    } catch (e) {
      alert(`Contract not found. Please make sure you are on the correct network, ${BlankArt.network}`)
      return;
    }

    const name = await contract.name()
    const symbol = await contract.symbol()
    const owner = await contract.owner()
    const voucherInput = document.getElementById('voucherAddress') as HTMLInputElement;
    const voucherAddress = voucherInput.value;
    let voucher = await lazyMinter.createVoucher(voucherAddress, 0)

    setVoucher(voucher);

    document.querySelector("#content").innerHTML = `
      <div><b>Contract:</b> ${name} (${symbol})</div>
      <div><b>Address:</b> ${contractAddress}</div>
      <div><b>Owner:</b> ${owner}</div>
      <div><b>Signer:</b> ${voucherAddress}</div>
      <div><b>Voucher:</b> ${JSON.stringify(voucher || "N/A", null, "<br/>  ")}</div>
    `;
  }

  return (
    <BlankLayout>
      <TWCenteredContent>
        {voucher && 
          <div className="break-all max-w-md" id="content">
          </div>
        }
        {!voucher &&
          <div className='text-center'>
            <h1 className='text-xl mb-6'>Generate Voucher</h1>
            <div>
              <input id="voucherAddress" placeholder="Voucher Address" className="border px-3 py-1 w-64" />
            </div>
            <BlankButton
              onClick={generateVoucher}
            >
              Generate Voucher
            </BlankButton>
          </div>
        }
      </TWCenteredContent>
    </BlankLayout>
  );
}

export default Voucher;