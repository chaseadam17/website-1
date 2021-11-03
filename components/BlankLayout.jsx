import { useState } from 'react'
import BigBangStarField from 'react-big-bang-star-field'
import {
  BlankFooter,
  BlankHeader,
  BlankMusic,
  TWFullScreen
} from '.'

const BlankLayout = ({ children }) => {
  const [bigBang, setBigBang] = useState(false)
  
  const showBigBang = (show) => {
    setBigBang(show)
  }

  return (
    <TWFullScreen className='font-roboto-mono text-sm bg-white text-gray-900'>
      <div className={`${bigBang ? '' : 'absolute -top-full'}`} onClick={() => showBigBang(!bigBang)}>
        <div className={`${bigBang ? 'opacity-100' : 'opacity-0'} bg-black absolute h-screen w-full transition-all duration-1000 ease-in-out`}>
          <div className='absolute pt-96 w-full text-center text-white text-4xl'>
            Blank Bang
          </div>
    
          {bigBang && 
            <BigBangStarField
              size={{ width: 100, height: 100 }}
              numStars={666}
              maxStarSpeed={1}
              scale={4}
              style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%'
                }}
              starColor={"255, 255, 255"}
            />
          }
        </div>
      </div>
      <BlankHeader>
        <BlankMusic
          onClick={showBigBang}
        />
      </BlankHeader>
      {children}
      <BlankFooter />
    </TWFullScreen>
  );
}

BlankLayout.defaultProps = {
  children: ['child1', 'child2', 'child3'].map(
    (child, index) => <div key={'child-' + index}>{child}</div>
  )
}

export default BlankLayout;