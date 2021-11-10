import {
  NextLink,
  TWCleanHeader,
  TWHorizontalSpread
} from '.'

const BlankHeader = ({ title, children }) => {
  return (
    <TWCleanHeader
      className='py-12 lg:px-24'
    >
      <NextLink href="/" passHref>
        <a>{title}</a>
      </NextLink>
      <TWHorizontalSpread className="space-x-2">
        {children}
      </TWHorizontalSpread>
    </TWCleanHeader>
  );
}

BlankHeader.defaultProps = {
  children: ['child1', 'child2', 'child3'].map(
    (child, index) => <div key={'child-' + index}>{child}</div>
  ),
  title: "Blank.Foundation"
}

export default BlankHeader;