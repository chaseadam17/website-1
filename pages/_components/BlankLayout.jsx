import {
  TWFullScreen,
  BlankHeader,
  BlankFooter
} from '.'

const BlankLayout = ({ children }) => {
  return (
    <TWFullScreen className='font-roboto-mono text-sm bg-white text-gray-900'>
      <BlankHeader>
        Music
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