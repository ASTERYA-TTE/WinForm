import { Button } from 'primereact/button'
import React from 'react'
import { Link } from 'react-router-dom'

function ProductDetails() {
  return (
    <div>
      FormEdit
      <br />
      <Button>
        <Link to='/app' style={{ color: 'white' }}>
          Back To Myform
        </Link>
      </Button>
    </div>
  )
}

export default ProductDetails
