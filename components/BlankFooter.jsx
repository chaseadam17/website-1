import {
  NewWindowLink,
  NextLink,
  TWFooter,
  TWHorizontal
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
  social: [{"href":"https://discord.gg/HZM2jcHdEU","name":"Discord"},{"href":"https://twitter.com/blankfdn","name":"Twitter"},{"href":"https://medium.com/@blankfdn","name":"Medium"},{"href":"https://blankfoundation.notion.site/Blank-641ad836df9c4918b1bd09ce196a6dce","name":"Notion"}]
}

export default BlankFooter;