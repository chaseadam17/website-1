import {
  TWFlex
} from '.'

const TWCleanHeader = ({ className, children }) => {
  return (
    <div className={`${className} p-6 bg-white text-black leading-10`}>
      <TWFlex className='sm:px-24'>
        {children}
      </TWFlex>
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