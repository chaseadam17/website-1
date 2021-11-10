import classMapMerge from '../lib/classMapMerge'

const TWButton = (props) => {
  const { classMap, ...reactProps } = props;

  return (
    <button
      className={
        classMapMerge(
          {
            fontColor: 'text-white',
            background: 'bg-green-500',
            padding: 'px-3 py-1'
          },
          classMap
        )
      }
      { ...reactProps }
    >
      {props.children}
    </button>
  );
}

TWButton.defaultProps = {
  
  children: "Button",
  title: "Blank.Foundation",
  social: [{"href":"https://discord.gg/HZM2jcHdEU","name":"Discord"},{"href":"https://twitter.com/blankfdn","name":"Twitter"},{"href":"https://medium.com/@blankfdn","name":"Medium"},{"href":"https://www.notion.so/blankfoundation/Blank-Home-f3fd5330df0d4933aa41e363719c2625","name":"Notion"}]
}

export default TWButton;