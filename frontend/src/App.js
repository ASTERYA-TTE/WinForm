import React, { useState, useEffect, useRef } from 'react'
import { classNames } from 'primereact/utils'
import { Outlet, useLocation } from 'react-router-dom'
import AppTopbar from './AppTopbar'
import AppFooter from './AppFooter'
import AppSearch from './AppSearch'
import { Tooltip } from 'primereact/tooltip'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import './App.scss'
import routers from './routes'

const App = () => {
  const [menuActive, setMenuActive] = useState(false)
  const [menuMode, setMenuMode] = useState('static')
  const [colorScheme, setColorScheme] = useState('light')
  const [menuTheme, setMenuTheme] = useState('layout-sidebar-darkgray')
  const [overlayMenuActive, setOverlayMenuActive] = useState(false)
  const [staticMenuDesktopInactive, setStaticMenuDesktopInactive] =
    useState(false)
  const [staticMenuMobileActive, setStaticMenuMobileActive] = useState(false)
  const [searchActive, setSearchActive] = useState(false)
  const [topbarUserMenuActive, setTopbarUserMenuActive] = useState(false)

  const [configActive, setConfigActive] = useState(false)

  const copyTooltipRef = useRef()
  const location = useLocation()

  let menuClick = false
  let searchClick = false
  let userMenuClick = false
  let configClick = false

  useEffect(() => {
    copyTooltipRef &&
      copyTooltipRef.current &&
      copyTooltipRef.current.updateTargetEvents()
  }, [location])

  useEffect(() => {
    if (staticMenuMobileActive) {
      blockBodyScroll()
    } else {
      unblockBodyScroll()
    }
  }, [staticMenuMobileActive])

  const onDocumentClick = () => {
    if (!searchClick && searchActive) {
      onSearchHide()
    }

    if (!menuClick) {
      if (isSlim() || isHorizontal()) {
        setMenuActive(false)
      }

      if (overlayMenuActive || staticMenuMobileActive) {
        hideOverlayMenu()
      }

      unblockBodyScroll()
    }

    if (configActive && !configClick) {
      setConfigActive(false)
    }

    searchClick = false
    configClick = false
    userMenuClick = false

    menuClick = false
  }

  const onMenuClick = () => {
    menuClick = true
  }

  const onMenuButtonClick = (event) => {
    menuClick = true
    setTopbarUserMenuActive(false)

    if (isOverlay()) {
      setOverlayMenuActive((prevOverlayMenuActive) => !prevOverlayMenuActive)
    }

    if (isDesktop()) {
      setStaticMenuDesktopInactive(
        (prevStaticMenuDesktopInactive) => !prevStaticMenuDesktopInactive
      )
    } else {
      setStaticMenuMobileActive(
        (prevStaticMenuMobileActive) => !prevStaticMenuMobileActive
      )
    }

    event.preventDefault()
  }

  const onRootMenuitemClick = () => {
    setMenuActive((prevMenuActive) => !prevMenuActive)
  }

  const onTopbarUserMenuButtonClick = (event) => {
    userMenuClick = true
    setTopbarUserMenuActive(
      (prevTopbarUserMenuActive) => !prevTopbarUserMenuActive
    )

    hideOverlayMenu()

    event.preventDefault()
  }

  const toggleSearch = () => {
    setSearchActive((prevSearchActive) => !prevSearchActive)
    searchClick = true
  }

  const onSearchClick = () => {
    searchClick = true
  }

  const onSearchHide = () => {
    setSearchActive(false)
    searchClick = false
  }

  const hideOverlayMenu = () => {
    setOverlayMenuActive(false)
    setStaticMenuMobileActive(false)
    unblockBodyScroll()
  }

  const blockBodyScroll = () => {
    if (document.body.classList) {
      document.body.classList.add('blocked-scroll')
    } else {
      document.body.className += ' blocked-scroll'
    }
  }

  const unblockBodyScroll = () => {
    if (document.body.classList) {
      document.body.classList.remove('blocked-scroll')
    } else {
      document.body.className = document.body.className.replace(
        new RegExp(
          '(^|\\b)' + 'blocked-scroll'.split(' ').join('|') + '(\\b|$)',
          'gi'
        ),
        ' '
      )
    }
  }

  const isSlim = () => {
    return menuMode === 'slim'
  }

  const isHorizontal = () => {
    return menuMode === 'horizontal'
  }

  const isOverlay = () => {
    return menuMode === 'overlay'
  }

  const isDesktop = () => {
    return window.innerWidth > 1091
  }

  const containerClassName = classNames(
    'layout-wrapper',
    {
      'layout-overlay': menuMode === 'overlay',
      'layout-static': menuMode === 'static',
      'layout-slim': menuMode === 'slim',
      'layout-horizontal': menuMode === 'horizontal',
      'layout-sidebar-dim': colorScheme === 'dim',
      'layout-sidebar-dark': colorScheme === 'dark',
      'layout-overlay-active': overlayMenuActive,
      'layout-mobile-active': staticMenuMobileActive,
      'layout-static-inactive':
        staticMenuDesktopInactive && menuMode === 'static',
      'p-input-filled': 'filled',
    },
    colorScheme === 'light' ? menuTheme : ''
  )

  return (
    <div
      className={containerClassName}
      data-theme={colorScheme}
      onClick={onDocumentClick}
      style={{ resize: 'both', marginLeft: '50px' }}
    >
      <Tooltip
        ref={copyTooltipRef}
        target='.block-action-copy'
        position='bottom'
        content='Copied to clipboard'
        event='focus'
      />
      <div className='layout-content-wrapper'>
        <AppTopbar
          routers={routers}
          topbarUserMenuActive={topbarUserMenuActive}
          onMenuButtonClick={onMenuButtonClick}
          onSearchClick={toggleSearch}
          onTopbarUserMenu={onTopbarUserMenuButtonClick}
          menuActive={menuActive}
          staticMenuMobileActive={staticMenuMobileActive}
          onMenuClick={onMenuClick}
          onRootMenuitemClick={onRootMenuitemClick}
        ></AppTopbar>

        <div
          className='layout-content'
          style={{ maxWidth: '100%', maxHeight: '100%' }}
        >
          <div
            className='layout-breadcrumb viewname'
            style={{ textTransform: 'uppercase' }}
          ></div>

          <Outlet />
        </div>

        <AppFooter />
      </div>

      <AppSearch
        searchActive={searchActive}
        onSearchClick={onSearchClick}
        onSearchHide={onSearchHide}
      />
    </div>
  )
}

export default App
