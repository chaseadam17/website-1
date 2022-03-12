import {
  NextLink
} from '.'

const EvolutionCollection = ({ collection }) => {

  if (!collection) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <div>
      <h1 className='text-lg font-bold'>
        <NextLink
          href='/member'
        >
          <a className='text-blue-600 underline'>Evolution Challenge</a> 
        </NextLink>
        &nbsp;&gt;&nbsp;
        {collection.title}
      </h1>
    </div>
  )
}

export default EvolutionCollection;