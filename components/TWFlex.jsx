const TWFlex = ({ className, children }) => {
  return (
    <div className={`${className} flex flex-row justify-between`}>
      {children}
    </div>
  );
}

TWFlex.defaultProps = {
  children: ['child1', 'child2', 'child3'].map(
    (child, index) => <div key={'child-' + index}>{child}</div>
  ),
  className: ""
}

export default TWFlex;