import React, { useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { InputText } from 'primereact/inputtext'
import { InputNumber } from 'primereact/inputnumber'
import { data } from './formdatas'
import { Button } from 'primereact/button'
import { Link } from 'react-router-dom'
import './Dashboard.css'
function FormData() {
  const columns = [
    { field: 'name', header: 'Name' },
    { field: 'status', header: 'Status' },
    { field: 'date', header: 'Date' },
  ]

  const cellEditor = (options) => {
    if (options.field === 'price') return priceEditor(options)
    else return textEditor(options)
  }

  const textEditor = (options) => {
    return (
      <InputText
        type='text'
        value={options.value}
        onChange={(e) => options.editorCallback(e.target.value)}
      />
    )
  }

  const priceBodyTemplate = (rowData) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(rowData.price)
  }
  const priceEditor = (options) => {
    return (
      <InputNumber
        value={options.value}
        onValueChange={(e) => options.editorCallback(e.value)}
        mode='currency'
        currency='USD'
        locale='en-US'
      />
    )
  }
  const onCellEditComplete = (e) => {
    let { rowData, newValue, field, originalEvent: event } = e

    switch (field) {
      case 'quantity':
      case 'price':
        if (isPositiveInteger(newValue)) rowData[field] = newValue
        else event.preventDefault()
        break

      default:
        if (newValue.trim().length > 0) rowData[field] = newValue
        else event.preventDefault()
        break
    }
  }
  const isPositiveInteger = (val) => {
    let str = String(val)
    str = str.trim()
    if (!str) {
      return false
    }
    str = str.replace(/^0+/, '') || '0'
    let n = Math.floor(Number(str))
    return n !== Infinity && String(n) === str && n >= 0
  }
  return (
    <div>
      <div>
        <Button className='backbutton p-0'>
          <span className='px-3'>
            <Link to='/app' style={{ color: 'white' }}>
              Back
            </Link>{' '}
          </span>
        </Button>
      </div>
      <div className='card p-fluid mt-4'>
        <DataTable
          value={data}
          editMode='cell'
          className='editable-cells-table'
          responsiveLayout='scroll'
        >
          {columns.map(({ field, header }) => {
            return (
              <Column
                key={field}
                field={field}
                header={header}
                style={{ width: '25%' }}
                body={field === 'price' && priceBodyTemplate}
                editor={(options) => cellEditor(options)}
                onCellEditComplete={onCellEditComplete}
                sortable
              />
            )
          })}
        </DataTable>
      </div>
    </div>
  )
}

export default FormData
