import SideBar from '../SideBar/SideBar';
import ClothesSection from '../ClothesSection/ClothesSection';
import './Profile.css';

export default function Profile({
  clothingItems,
  handleCardClick,
  handleAddClick,
  onEditProfile,
  onLogout,
}) {
  return (
    <div className='profile'>
      <SideBar onEditProfile={onEditProfile} onLogout={onLogout} />
      <ClothesSection
        clothingItems={clothingItems}
        handleCardClick={handleCardClick}
        handleAddClick={handleAddClick}
      />
    </div>
  );
}
