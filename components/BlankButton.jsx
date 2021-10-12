const BlankButton = (props) => {
  return (
    <button {...props} className={`${props.className} inline-block font-bold bg-gray-900 text-white text-xs text-center px-12 py-2 mt-6`}>
        {props.children}
    </button>
  );
}

export default BlankButton;