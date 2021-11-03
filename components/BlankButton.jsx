const BlankButton = (props) => {
  return (
    <button {...props} className={`${props.className} inline-block font-bold bg-gray-900 text-white text-xs text-center mt-6`}>
      {props.children}
    </button>
  );
}

BlankButton.defaultProps = {
  
}

export default BlankButton;