import SupabaseImage from "./SupabaseImage";

const ADMIN_WALLET = '0xfa23B55345c7237b7eEE52Db975E8a72b840BC1A';

const EvolutionLayer = ({ wallet, collectionTitle, art, selected, starred, onSelect, onStar }) => {
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
        wallet={wallet}
        ownerAdmin={wallet === art.wallet || wallet === ADMIN_WALLET}
        selected={selected}
        starred={starred}
        onSelect={onSelect}
        onStar={onStar}
      />
    </div>
  )
}

export default EvolutionLayer;