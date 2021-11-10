import {
  TWHorizontalSpread
} from '.'

const TWCleanHeader = ({ className, children }) => {
  return (
    <div className={`${className} p-6 bg-white text-black leading-10`}>
      <TWHorizontalSpread className='sm:px-12 md:px-24'>
        {children}
      </TWHorizontalSpread>
    </div>
  );
}

TWCleanHeader.defaultProps = {
  children: ['child1', 'child2', 'child3'].map(
    (child, index) => <div key={'child-' + index}>{child}</div>
  ),
  className: ""
}

export default TWCleanHeader;