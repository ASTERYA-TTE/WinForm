import React, { useState, useEffect, useRef } from 'react'
import { classNames } from 'primereact/utils'
import { Route, useLocation } from 'react-router-dom'
import AppTopbar from './AppTopbar'
import AppFooter from './AppFooter'
import AppSearch from './AppSearch'
import AppBreadcrumb from './AppBreadcrumb'
import { Tooltip } from 'primereact/tooltip'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import './App.scss'
import './components/Dashboard/Dashboard.css'
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
  const [topbarNotificationMenuActive, setTopbarNotificationMenuActive] =
    useState(false)
  const [rightMenuActive, setRightMenuActive] = useState(false)
  const [configActive, setConfigActive] = useState(false)
  const [inputStyle, setInputStyle] = useState('outlined')
  const [ripple, setRipple] = useState(false)
 
  const copyTooltipRef = useRef()
  const location = useLocation()


  let menuClick = false
  let searchClick = false
  let userMenuClick = false
  let notificationMenuClick = false
  let rightMenuClick = false
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

    if (!userMenuClick) {
      setTopbarUserMenuActive(false)
    }

    if (!notificationMenuClick) {
      setTopbarNotificationMenuActive(false)
    }

    if (!rightMenuClick) {
      setRightMenuActive(false)
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
    rightMenuClick = false
    notificationMenuClick = false
    menuClick = false
  }

  const onMenuClick = () => {
    menuClick = true
  }

  const onMenuButtonClick = (event) => {
    menuClick = true
    setTopbarUserMenuActive(false)
    setTopbarNotificationMenuActive(false)
    setRightMenuActive(false)

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

  const onMenuitemClick = (event) => {
    if (!event.item.items) {
      hideOverlayMenu()

      if (isSlim() || isHorizontal()) {
        setMenuActive(false)
      }
    }
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

  const onTopbarNotificationMenuButtonClick = (event) => {
    notificationMenuClick = true
    setTopbarNotificationMenuActive(
      (prevTopbarNotificationMenuActive) => !prevTopbarNotificationMenuActive
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

  const onRightMenuClick = () => {
    rightMenuClick = true
  }

  const onRightMenuButtonClick = (event) => {
    rightMenuClick = true
    setRightMenuActive((prevRightMenuActive) => !prevRightMenuActive)
    hideOverlayMenu()
    event.preventDefault()
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
      'p-input-filled': inputStyle === 'filled',
      'p-ripple-disabled': !ripple,
    },
    colorScheme === 'light' ? menuTheme : ''
  )




  return (
    <div
      className={containerClassName}
      data-theme={colorScheme}
      onClick={onDocumentClick}
      style={{ resize: 'both' }}
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
          topbarNotificationMenuActive={topbarNotificationMenuActive}
          topbarUserMenuActive={topbarUserMenuActive}
          onMenuButtonClick={onMenuButtonClick}
          onSearchClick={toggleSearch}
          onTopbarNotification={onTopbarNotificationMenuButtonClick}
          onTopbarUserMenu={onTopbarUserMenuButtonClick}
          onRightMenuClick={onRightMenuButtonClick}
          onRightMenuButtonClick={onRightMenuButtonClick}
          menuMode={menuMode}
          menuActive={menuActive}
          staticMenuMobileActive={staticMenuMobileActive}
          onMenuClick={onMenuClick}
          onMenuitemClick={onMenuitemClick}
          onRootMenuitemClick={onRootMenuitemClick}
        ></AppTopbar>

        <div
          className='layout-content'
          style={{ maxWidth: '100%', maxHeight: '100%' }}
        >
          <div
            className='layout-breadcrumb viewname'
            style={{ textTransform: 'uppercase' }}
          >
            <AppBreadcrumb routers={routers} />
          </div>

          {routers.map((router, index) => {
            if (router.exact) {
              return (
                <Route
                  key={`router${index}`}
                  path={router.path}
                  exact
                  component={router.component}
                  render={router.render}
                />
              )
            }

            return (
              <Route
                key={`router${index}`}
                path={router.path}
                component={router.component}
                render={router.render}
              />
            )
          })}
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
