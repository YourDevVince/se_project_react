import './SideBar.css';
import Avatar from '../../assets/avatar.png';

export default function SideBar() {
  const username = 'Terrence Tegegne';
  const avatar = Avatar;
  return (
    <aside className='sidebar'>
      <div className='sidebar__user-container'>
        <p className='sidebar__username'>{username}</p>
        <img src={avatar} alt={username} className='sidebar__avatar' />
      </div>
    </aside>
  );
}
