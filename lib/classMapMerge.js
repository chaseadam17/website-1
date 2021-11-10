const classMapMerge = (defaultClasses, newClasses) => {
  return Object.values({
    ...defaultClasses,
    ...newClasses
  }).join(' ')
}

export default classMapMerge;