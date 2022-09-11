import { Button } from 'primereact/button'
import React from 'react'
import { Link } from 'react-router-dom'
import './Dashboard/Dashboard.css'
function Trash() {
  return (
    <div>
      <Button className='backbutton p-0'>
        <span className='px-3'>
          <Link to='/app' style={{ color: 'white' }}>
            Back
          </Link>{' '}
        </span>
      </Button>
    </div>
  )
}

export default Trash
