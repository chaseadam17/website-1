import {
  TWHorizontal
} from '.'

const TWHorizontalSpread = ({ className, children }) => {
  return (
    <TWHorizontal
      className={`${className} justify-between items-center`}
    >
      {children}
    </TWHorizontal>
  );
}

TWHorizontalSpread.defaultProps = {
  children: ['child1', 'child2', 'child3'].map(
    (child, index) => <div key={'child-' + index}>{child}</div>
  ),
  className: ""
}

export default TWHorizontalSpread;