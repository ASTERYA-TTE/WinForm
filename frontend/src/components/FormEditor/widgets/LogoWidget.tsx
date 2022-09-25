import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from 'primereact/button'

export const LogoWidget: React.FC = () => {
  let location = useLocation()
  let navigate = useNavigate()
  const [locationToDashboardFormTitle, setlocationToDashboardForm] =
    useState(null)
  useEffect(() => {
    setlocationToDashboardForm(location.state.title)
  }, [location])

  const returnToDashboard = () => {
    navigate('/home', {
      state: {
        //formId: location.state.formId,
        formTitle: locationToDashboardFormTitle,
      },
    })
  }

  return (
    <div style={{ display: 'flex' }}>
      <Button
        className='p-button-text p-button-raised mr-4'
        onClick={returnToDashboard}
      >
        <i className='pi pi-arrow-left'></i>
        <Button label='Return To Dashboard' className='p-button-text ' />
      </Button>

      <Button className='p-button-raised px-6 p-button-outlined p-button-primary'>
        Form Name: {locationToDashboardFormTitle}
      </Button>
    </div>
  )
}
