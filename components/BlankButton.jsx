import {
  TWButton
} from '.'

const BlankButton = (props) => {
  const { classMap, ...reactProps } = props;

  return (
    <TWButton
      classMap={{
        text: "text-xs",
        background: "bg-gray-900",
        padding: "px-12 py-2",
        margin: "mt-6",
        ...classMap
      }}
      { ...reactProps }
    >
      {props.children}
    </TWButton>
  );
}

BlankButton.defaultProps = {
  
  title: "Blank.Foundation",
  social: [{"href":"https://discord.gg/HZM2jcHdEU","name":"Discord"},{"href":"https://twitter.com/blankfdn","name":"Twitter"},{"href":"https://medium.com/@blankfdn","name":"Medium"},{"href":"https://www.notion.so/blankfoundation/Blank-Home-f3fd5330df0d4933aa41e363719c2625","name":"Notion"}]
}

export default BlankButton;