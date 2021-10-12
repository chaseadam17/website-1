// This is the BlankIndex component.
// It is the top-level component so it is being rendered as the Index page.

import Head from 'next/head'
import { useEffect } from 'react';
import {
  BlankLayout,
  TWCenteredContent
} from './_components'

const Index = () => {

  useEffect(() => {
    const countElement = document.getElementById('canvas-count');
    const current = 5000;
    const total = 10000;
    let count = total;
    let timeouts = [];

    const tick = () => {
      count = parseInt(countElement.innerHTML);
      if (count <= current) count = current + 1;
      countElement.innerHTML = `${count - 1}`;

      if (count > current + 1) {
        let time = 4;
        timeouts.push(setTimeout(tick, time));
        timeouts.push(setTimeout(tick, time));
      }
    }

    tick();
    
    return () => {
      for (const timeout of timeouts) {
        window.clearTimeout(timeout);
      }
    };
  }, []);

  return (
    <div className="font-roboto-mono">
      <Head>
        <title>Blank.Foundation</title>
        <meta name="description" content="A community art and entrepreneurship project." />
      </Head>

      <BlankLayout>
        <TWCenteredContent>
          <div className='container flex w-3/4 mx-auto'>
            <div className="sm:mx-0 mb-12 flex flex-none bg-center bg-contain bg-no-repeat text-center text-md tracking-widest" style={{width: "360px", height: "330px", backgroundImage: `url("/nft.png")`}}>
              <div className="m-auto">
                <div><span id="canvas-count">10000</span> / 10000</div>
                <div className="text-gray-500 pt-3">Remaining</div>
              </div>
            </div>
            <div className="flex-none mx-auto w-11/12 md:w-1/2 my-12 md:my-12">
              <h1 className="text-2xl mb-6 font-semibold">United by a blank canvas</h1>
              <p className="text-md mb-6">
                Blank is a collection of 10,000 Blank NFTs that will evolve based on a vote
                of Blank NFT holders. The first 1,000 people to join the community will be
                whitelisted to mint Blank NFTs for free.
              </p>
              <p className="text-md">
                To purchase, apply in Discord.
              </p>

              <a href="https://discord.gg/EvyXJHxJaw" target="_blank" rel="noreferrer" className="inline-block font-bold bg-gray-900 text-white text-xs text-center px-12 py-2 mt-6">
                Apply
              </a>

              <a href="https://medium.com/@blankfdn" target="_blank" rel="noreferrer" className="ml-6 inline-block font-bold bg-gray-300 text-gray-900 text-xs text-center px-9 py-2 mt-6">
                Learn More
              </a>
            </div>
          </div>
        </TWCenteredContent>
      </BlankLayout>
    </div>
  );
}

export default Index;