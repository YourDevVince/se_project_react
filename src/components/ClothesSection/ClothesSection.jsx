import './ClothesSection.css';
import ItemCard from '../ItemCard/ItemCard';

export default function ClothesSection({
  clothingItems,
  handleCardClick,
  handleAddClick,
}) {
  const clothingItemsList = clothingItems;

  return (
    <div className='clothes-section'>
      <div className='clothes-section__row'>
        <p className='clothes-section__title'>Your Items</p>
        <button
          onClick={handleAddClick}
          className='clothes-section__add-clothes-btn'
        >
          +Add new
        </button>
      </div>
      <ul className='clothes-section__items'>
        {clothingItemsList.map((item) => (
          <ItemCard key={item._id} item={item} onCardClick={handleCardClick} />
        ))}
      </ul>
    </div>
  );
}
