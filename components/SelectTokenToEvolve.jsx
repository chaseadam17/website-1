import BlankButton from './BlankButton';
import { fullDim } from './CombineArt';

const dim = 150;

const SelectTokenToEvolve = ({tokenIds, lockedMap, nfts, onEvolve}) => {
  return (
    <div>
      <div className='text-center mb-6'>
        <h2 className='text-lg mb-6'>Blank Evolution</h2>
        <p>Click on one of your NFTs to evolve it.</p>
      </div>

      <div className='pl-24 pr-6 flex flex-wrap gap-3'>
        {tokenIds.map(
          (tokenId) => (
            <div 
              key={`token-${tokenId}`}
              className={`border w-48 h-52 ${lockedMap[tokenId] ? 'bg-gray-300' : ''}`}
            >
              <div className='pt-1 text-lg text-center font-bold'>
                {tokenId}
              </div>
              {lockedMap[tokenId] && (
                <div className='text-center pt-12'>
                  Locked
                </div>
              )}
              {nfts[tokenId] && (
                <div className='p-3 bg-gray-600'>
                  <svg 
                    id='claim-svg' 
                    className='relative ml-2' 
                    width={dim}
                    height={dim}
                    viewBox={`0 0 ${fullDim} ${fullDim}`}
                    dangerouslySetInnerHTML={{ __html: nfts[tokenId].info.image }}
                  >  
                  </svg>
                </div>
              )}
              {!lockedMap[tokenId] && !nfts[tokenId] && (
                <div className='text-center'>
                  <BlankButton
                    classMap={{
                      background: "border-2 text-gray-700",
                      padding: "px-6 py-3 rounded-full",
                    }}
                    onClick={() => onEvolve(tokenId)}
                  >
                    Evolve
                  </BlankButton>
                </div>
              )}
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default SelectTokenToEvolve