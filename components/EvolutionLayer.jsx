import SupabaseImage from "./SupabaseImage";

const ADMIN_WALLET = '0xfa23B55345c7237b7eEE52Db975E8a72b840BC1A';

const EvolutionLayer = ({ wallet, collectionTitle, art, onSelect }) => {
  return (
    <div 
      key={`art-${art.id}`} 
      id={`art-${art.id}`} 
      className='mr-3 mb-3'
    >
      <SupabaseImage
        collectionTitle={collectionTitle}
        item={art}
        dim={120}
        ownerAdmin={wallet === art.wallet || wallet === ADMIN_WALLET}
        onSelect={onSelect}
      />
    </div>
  )
}

export default EvolutionLayer;