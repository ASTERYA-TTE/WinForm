import { Button } from 'primereact/button'
import React from 'react'
import { Link } from 'react-router-dom'

function FormData() {
  return (
    <div>
      FormData
      <br />
      <Button>
        <Link to='/app' style={{ color: 'white' }}>
          Back To My Form
        </Link>
      </Button>
    </div>
  )
}

export default FormData
