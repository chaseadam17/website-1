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
  
}

export default BlankButton;