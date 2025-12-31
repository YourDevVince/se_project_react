import './ItemCard.css';
import { useContext } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function ItemCard({ item, onCardClick, onCardLike, isLoggedIn }) {
  const currentUser = useContext(CurrentUserContext);

  const isLiked = item.likes?.some((id) => id === currentUser?._id);

  const handleLike = () => {
    onCardLike({ id: item._id, isLiked });
  };

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
      <div className='card__header'>
        <p className='card__name'>{item.name}</p>
        {isLoggedIn && (
          <button
            type='button'
            className={`card__like-btn ${
              isLiked ? 'card__like-btn_active' : ''
            }`}
            onClick={handleLike}
          />
        )}
      </div>
    </li>
  );
}

export default ItemCard;
