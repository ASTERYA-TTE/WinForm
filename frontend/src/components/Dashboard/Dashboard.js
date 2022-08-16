import React, { useState, useEffect, useRef } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Toast } from 'primereact/toast'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import './Dashboard.css'
import { data } from './product'
import { Link, useHistory, useLocation } from 'react-router-dom'

const Dashboard = () => {
  let history = useHistory()
  let location = useLocation
  let emptyProduct = {
    id: null,
    name: '',
    image: null,
    description: '',
    category: null,
    price: 0,
    quantity: 0,
    rating: 0,
    inventoryStatus: 'INSTOCK',
  }
  const [product, setProduct] = useState(emptyProduct)
  const [productDialog, setProductDialog] = useState(false)
  const [selectedProducts, setSelectedProducts] = useState(null)
  const [globalFilter, setGlobalFilter] = useState(null)
  const toast = useRef(null)
  const dt = useRef(null)

  const editProduct = (product) => {
    setProduct({ ...product })
    setProductDialog(true)
  }
  const EditButton = (data) => {
    console.log('historypush', data)
    history.push('/FormEdit', {
      state: { FormEditId: data.id },
    })
  }
  const rightToolbarTemplate = () => {
    return (
      <div style={{ display: 'flex' }}>
        <Button
          className='mr-2'
          onClick={EditButton}
          style={{ color: 'white' }}
        >
          Form Düzenle
        </Button>
        <Button>
          <Link to='./FormData' style={{ color: 'white' }}>
            Form Verileri
          </Link>
        </Button>
      </div>
    )
  }

  const header = (
    <div className='table-header'>
      <h5 className='mx-0 my-1'>Manage Products</h5>
      <span className='p-input-icon-left'>
        <i className='pi pi-search' />
        <InputText
          type='search'
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder='Search...'
        />
      </span>
    </div>
  )

  return (
    <div className='datatable-crud-demo'>
      <Toast ref={toast} />

      <div className='card'>
        <DataTable
          ref={dt}
          value={data}
          selection={selectedProducts}
          onSelectionChange={(e) => setSelectedProducts(e.value)}
          dataKey='id'
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate='FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown'
          currentPageReportTemplate='Showing {first} to {last} of {totalRecords} products'
          globalFilter={globalFilter}
          header={header}
          responsiveLayout='scroll'
        >
          <Column
            field='name'
            header='Name'
            sortable
            style={{ minWidth: '16rem' }}
            className='joinBtn link'
          ></Column>
          <Column
            field=''
            header='Status'
            body=''
            sortable
            style={{ minWidth: '70rem' }}
          ></Column>

          <Column
            header='Edit'
            className='link'
            body={rightToolbarTemplate}
            style={{ minWidth: '30rem' }}
          ></Column>
        </DataTable>
      </div>
    </div>
  )
}
export default Dashboard
