import React, { useState, useRef } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Toast } from 'primereact/toast'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Checkbox } from 'primereact/checkbox'
import './Dashboard.css'
import { data } from './product'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  const [selectedProducts, setSelectedProducts] = useState(null)
  const [globalFilter, setGlobalFilter] = useState(null)
  const [checked, setChecked] = useState(false)
  const toast = useRef(null)
  const dt = useRef(null)

  const rightToolbarTemplate = () => {
    return (
      <div style={{ display: 'flex' }}>
        <Button className='mr-2' style={{ color: 'white' }}>
          <Link to='/FormEdit' style={{ color: 'white' }}>
            {' '}
            Form Düzenle
          </Link>
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
      <h5 className='mx-0 my-1'>My Forms</h5>
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

  const CheckBox = () => {
    return (
      <div>
        <Checkbox
          inputId='binary'
          checked={checked}
          onChange={(e) => setChecked(e.checked)}
        />
      </div>
    )
  }

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
            body={CheckBox}
            headerStyle={{ width: '3rem' }}
            exportable={false}
          ></Column>
          <Column
            field='name'
            header='Name'
            sortable
            style={{ minWidth: '16rem' }}
            className='myforms '
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
