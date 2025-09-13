import './ItemCard.css';

function ItemCard({ item }) {
  return (
    <li className='card'>
      <img src={item.link} alt={item.name} className='card__image' />
      <p className='card__name'>{item.name}</p>
    </li>
  );
}

export default ItemCard;
