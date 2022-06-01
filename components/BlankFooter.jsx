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
      <div>
        <NextLink 
          href='/gallery' 
          passHref
        >
          <a className='hidden sm:inline-block text-white mr-6'>
            Gallery
          </a>
        </NextLink>
        <NextLink 
          href='/members' 
          passHref
        >
          <a className='hidden sm:inline-block text-white mr-6'>
            Members
          </a>
        </NextLink>
        <NextLink 
          href='/mint' 
          passHref
        >
          <a className='hidden sm:inline-block text-white'>
            Mint
          </a>
        </NextLink>
      </div>
    </TWFooter>
  );
}

BlankFooter.defaultProps = {
  social: [
    {"href":"https://discord.gg/HZM2jcHdEU","name":"Discord"},
    {"href":"https://twitter.com/blankfdn","name":"Twitter"},
    {"href":"https://blankfoundation.notion.site/Blank-641ad836df9c4918b1bd09ce196a6dce","name":"Notion"}
  ]
}

export default BlankFooter;