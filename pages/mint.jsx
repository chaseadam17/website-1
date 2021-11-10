// This is the BlankMinting component.
// It is the page-level component so it is being rendered based on its specified route.

import Head from 'next/head'
import { BlankArt } from '../contracts'
import {
  BlankButton,
  BlankLayout,
  NewWindowLink,
  TWCenteredContent
} from '../components'

const BlankMinting = ({ connect, error, mint, mintAmount, pending, tx }) => {
  console.log("BLANKART", BlankArt)

  return (
    <div>
      <Head>
        <title>Blank.Foundation</title>
        <meta name="description" content="Blank.Foundation" />
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
                className='px-3 py-1'
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
                  <select 
                    id="mint-amount" 
                    className='cursor-pointer border text-xl p-3 rounded-xl'
                    onChange={(e) => setMintAmount(e.target.value)}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option selected value="5">5</option>
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
                    className='px-3 py-1'
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
    </div>
  );
}

BlankMinting.defaultProps = {
  connect: "connect",
  error: "error",
  mint: "mint",
  mintAmount: "mintAmount",
  pending: "pending",
  tx: "tx"
}

export default BlankMinting;