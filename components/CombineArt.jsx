import SupabaseImage from './SupabaseImage';

const CombineArt = ({ selectedArt, collection }) => {
  return (
    <div className=''>
      <h3 className='mb-3'>Combined Image</h3>
      <div className='relative border' style={{width: '300px', height: '300px'}}>  
        {selectedArt.map(
          (layer, index) => (
            <div  
              key={`layer-${index}`}  
              className='absolute w-full h-full' 
            >
              <SupabaseImage
                collectionTitle={collection.title}
                item={layer}
                dim={300}
                transparent={true}
              />
            </div>
          )
        )}
      </div>  
    </div>
  )
}

export default CombineArt;