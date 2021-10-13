import {
  TWFooter,
  TWHorizontal,
  NewWindowLink,
  NextLink,
} from '.'

const BlankFooter = ({ social }) => {
  return (
    <TWFooter className='sm:px-24'>
      <TWHorizontal className='mx-auto sm:mx-0 space-x-8'>
        {social.map((s, index) => (
          <NewWindowLink
            key={`footer-social-${index}`} 
            href={s.href}
          >
            {s.name}
          </NewWindowLink> 
        ))}
      </TWHorizontal>
      <NextLink 
        href='/mint' 
        passHref
      >
        <a className='hidden sm:inline-block text-white'>
          Mint
        </a>
      </NextLink>
    </TWFooter>
  );
}

BlankFooter.defaultProps = {
  index: "index",
  social: [{"href":"https://discord.gg/HZM2jcHdEU","name":"Discord"},{"href":"https://twitter.com/blankfdn","name":"Twitter"},{"href":"https://medium.com/@blankfdn","name":"Medium"}]
}

export default BlankFooter;