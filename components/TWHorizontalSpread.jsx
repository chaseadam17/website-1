import {
  TWHorizontal
} from '.'

const TWHorizontalSpread = ({ children }) => {
  return (
    <TWHorizontal
      className='justify-between'
    >
      {children}
    </TWHorizontal>
  );
}

TWHorizontalSpread.defaultProps = {
  children: ['child1', 'child2', 'child3'].map(
    (child, index) => <div key={'child-' + index}>{child}</div>
  )
}

export default TWHorizontalSpread;