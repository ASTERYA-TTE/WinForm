import React, { useState, useEffect } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { data } from './product'
import { Button } from 'primereact/button'
import { Link } from 'react-router-dom'
import { InputText } from 'primereact/inputtext'

const FormData = () => {
  const [products, setProducts] = useState([])
  const columns = [
    { field: 'code', header: 'Code' },
    { field: 'name', header: 'Name' },
    { field: 'category', header: 'Category' },
    { field: 'quantity', header: 'Quantity' },
  ]

  const dynamicColumns = columns.map((col, i) => {
    return <Column key={col.field} field={col.field} header={col.header} />
  })

  return (
    <div>
      <div className='card'>
        <DataTable value={data} responsiveLayout='scroll'>
          {dynamicColumns}
        </DataTable>
      </div>
      <Button>
        <Link to='/app' style={{ color: 'white', width: '100px' }}>
          Back
        </Link>
      </Button>
      <div>
        <div id='image' class='portfolio-img-background'>
          <div className='xx' id='link'>
            <a href='#'>Hi!, im a link</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormData
