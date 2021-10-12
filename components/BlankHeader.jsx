import {
  TWCleanHeader,
  NextLink,
  TWFlex
} from '.'

const BlankHeader = ({ title, children }) => {
  return (
    <TWCleanHeader
      className='py-12 px-24'
    >
      <NextLink href="/" passHref>
        <a>{title}</a>
      </NextLink>
      <TWFlex className="space-x-2">
        {children}
      </TWFlex>
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