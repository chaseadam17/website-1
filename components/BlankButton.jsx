import {
  TWButton
} from '.'

const BlankButton = ({ classMap, children }) => {
  return (
    <TWButton
      classMap={{
        ...classMap,
        text: "text-sm",
        background: "bg-gray-900",
        padding: "px-12 py-2",
        margin: "mt-6"
      }}
    >
      {children}
    </TWButton>
  );
}

BlankButton.defaultProps = {
  children: ['child1', 'child2', 'child3'].map(
    (child, index) => <div key={'child-' + index}>{child}</div>
  ),
  classMap: "classMap"
}

export default BlankButton;