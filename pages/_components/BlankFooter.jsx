import {
  TWFooter,
  TWHorizontal,
  NewWindowLink
} from '.'

const BlankFooter = ({ index, social }) => {
  return (
    <TWFooter>
      <TWHorizontal className='space-x-4'>
        {social.map((s, index) => (
          <NewWindowLink
            key={`footer-social-${index}`} 
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
  index: "index",
  social: [{"href":"https://discord.gg/HZM2jcHdEU","name":"Discord"},{"href":"https://twitter.com/blankfdn","name":"Twitter"},{"href":"https://medium.com/@blankfdn","name":"Medium"}]
}

export default BlankFooter;