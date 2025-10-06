import SideBar from '../SideBar/SideBar';
import ClothesSection from '../ClothesSection/ClothesSection';
import './Profile.css';
export default function Profile({
  clothingItems,
  handleCardClick,
  handleAddClick,
}) {
  return (
    <div className='profile'>
      <SideBar />
      <ClothesSection
        clothingItems={clothingItems}
        handleCardClick={handleCardClick}
        handleAddClick={handleAddClick}
      />
    </div>
  );
}
