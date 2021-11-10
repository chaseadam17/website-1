const NewWindowLink = (props) => {
  return (
     <a {...props} target="_blank" rel="noopener noreferrer">
       {props.children}
    </a>
  );
}

NewWindowLink.defaultProps = {
  
  href: "https://www.example.com",
  children: "Example Link",
  title: "Blank.Foundation",
  social: [{"href":"https://discord.gg/HZM2jcHdEU","name":"Discord"},{"href":"https://twitter.com/blankfdn","name":"Twitter"},{"href":"https://medium.com/@blankfdn","name":"Medium"},{"href":"https://www.notion.so/blankfoundation/Blank-Home-f3fd5330df0d4933aa41e363719c2625","name":"Notion"}]
}

export default NewWindowLink;