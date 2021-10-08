import {
  TWFooter,
  TWHorizontal,
  NewWindowLink
} from '.'

const BlankFooter = ({ social }) => {
  return (
    <TWFooter>
      <TWHorizontal className='space-x-4'>
        {social.map((s) => (
          <NewWindowLink 
            href={s.href}
          >
            {s.name}
          </NewWindowLink> 
        ))}
      </TWHorizontal>
    </TWFooter>
  );
}

BlankFooter.defaultProps = {
  social: [{"href":"https://discord.gg/HZM2jcHdEU","name":"Discord"},{"href":"https://twitter.com/blankfdn","name":"Twitter"},{"href":"https://medium.com/@blankfdn","name":"Medium"}]
}

export default BlankFooter;