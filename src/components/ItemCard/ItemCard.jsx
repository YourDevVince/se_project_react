import './ItemCard.css';

function ItemCard({ item, onCardClick }) {
  const handleCardClick = () => {
    onCardClick(item);
  };

  return (
    <li className='card'>
      <img
        onClick={handleCardClick}
        src={item.imageUrl}
        alt={item.name}
        className='card__image'
      />
      <p className='card__name'>{item.name}</p>
    </li>
  );
}

export default ItemCard;
