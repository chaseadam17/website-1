import { useRouter } from 'next/router'

const EvolutionCollectionPreview = ({ collection }) => {
  const router = useRouter();

  const onClick = () => {
    router.push(`/collection/${collection.id}`);
  }

  return (
    <div className='border p-6 cursor-pointer' onClick={onClick}>
      <h2 className='font-bold'>{collection.title}</h2>
    </div>
  )
}

export default EvolutionCollectionPreview;