const NewWindowLink = (props) => {
  return (
     <a {...props} target="_blank" rel="noopener noreferrer">
       {props.children}
    </a>
  );
}

NewWindowLink.defaultProps = {
  href: "https://www.example.com",
  children: "Example Link"
}

export default NewWindowLink;