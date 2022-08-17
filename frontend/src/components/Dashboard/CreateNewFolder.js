import React, { useState } from 'react'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'

const CreateNewFolder = () => {
  const [displayResponsive, setDisplayResponsive] = useState(false)

  const dialogFuncMap = {
    displayResponsive: setDisplayResponsive,
  }

  const onClick = (name) => {
    dialogFuncMap[`${name}`](true)
  }

  const onHide = (name) => {
    dialogFuncMap[`${name}`](false)
  }

  const renderFooter = (name) => {
    return (
      <div>
        <Button
          label='No'
          icon='pi pi-times'
          onClick={() => onHide(name)}
          className='p-button-text'
        />
        <Button
          label='Yes'
          icon='pi pi-check'
          onClick={() => onHide(name)}
          autoFocus
        />
      </div>
    )
  }

  return (
    <div className='dialog-demo'>
      <div className='card'>
        <Button label='Show' onClick={() => onClick('displayResponsive')} />

        <Dialog
          header='Header'
          visible={displayResponsive}
          onHide={() => onHide('displayResponsive')}
          breakpoints={{ '960px': '75vw' }}
          style={{ width: '50vw' }}
          footer={renderFooter('displayResponsive')}
        >
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </Dialog>
      </div>
    </div>
  )
}

export default CreateNewFolder
