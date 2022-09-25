import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from 'primereact/button'

export const LogoWidget: React.FC = () => {
  let location = useLocation()
  const [formTitle, setFormTitle] = useState(null)
  useEffect(() => {
    setFormTitle(location.state.title)
  }, [location])

  return (
    <div style={{ display: 'flex' }}>
      <Link to='/home'>
        <Button className='p-button-text p-button-raised mr-4'>
          <i className='pi pi-arrow-left'></i>
          <Button label='Return To Dashboard' className='p-button-text ' />
        </Button>
      </Link>
      <Button className='p-button-raised px-6 p-button-outlined p-button-success'>
        {formTitle}
      </Button>
    </div>
  )
}
