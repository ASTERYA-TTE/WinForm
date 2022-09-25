import React from 'react'
import { classNames } from 'primereact/utils'
import { Link } from 'react-router-dom'
import AppMenu from './AppMenu'

const AppTopbar = (props) => {
  const notificationsItemClassName = classNames('notifications-item', {
    'active-menuitem': props.topbarNotificationMenuActive,
  })
  const profileItemClassName = classNames('profile-item', {
    'active-menuitem fadeInDown': props.topbarUserMenuActive,
  })

  return (
    <div className='layout-topbar'>
      <div className='topbar-left' style={{ marginLeft: '50px' }}>
        <button
          type='button'
          className='menu-button p-link '
          onClick={props.onMenuButtonClick}
        >
          <i className='pi pi-chevron-left'></i>
        </button>

        <span className='topbar-separator'></span>

        <div
          className='layout-breadcrumb viewname'
          style={{ textTransform: 'uppercase', width: '100%' }}
        ></div>
      </div>

      <AppMenu
        model={props.menu}
        menuMode={props.menuMode}
        active={props.menuActive}
        mobileMenuActive={props.staticMenuMobileActive}
        onMenuClick={props.onMenuClick}
        onMenuitemClick={props.onMenuitemClick}
        onRootMenuitemClick={props.onRootMenuitemClick}
      ></AppMenu>

      <div className='layout-mask modal-in'></div>

      <div className='topbar-right'>
        <ul className='topbar-menu'>
          <li className='search-item'>
            <button
              type='button'
              className='p-link'
              onClick={props.onSearchClick}
            >
              <i className='pi pi-search'></i>
            </button>
          </li>

          <li className={profileItemClassName}>
            <button
              type='button'
              className='p-link'
              onClick={props.onTopbarUserMenu}
            >
              <img
                src='assets/demo/images/avatar/profile.jpg'
                alt='diamond-layout'
                className='profile-image'
              />
              <span className='profile-name'>Amelia Stone</span>
            </button>
            <ul className='profile-menu fade-in-up'>
              <li>
                <button type='button' className='p-link'>
                  <i className='pi pi-user'></i>
                  <span>Profile</span>
                </button>
              </li>
              <li>
                <button type='button' className='p-link'>
                  <i className='pi pi-cog'></i>
                  <span>Settings</span>
                </button>
              </li>
              <li>
                <button type='button' className='p-link'>
                  <i className='pi pi-inbox'></i>
                  <span>Inbox</span>
                </button>
              </li>
              <li>
                <button type='button' className='p-link'>
                  <i className='pi pi-power-off'></i>
                  <span>Logout</span>
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default AppTopbar
