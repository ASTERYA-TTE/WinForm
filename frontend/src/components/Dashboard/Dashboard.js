import React, { useState, useRef, useEffect } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Toast } from 'primereact/toast'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Checkbox } from 'primereact/checkbox'
import { Dialog } from 'primereact/dialog'
import './Dashboard.css'
import { data } from './formdatas'
import { Link } from 'react-router-dom'
import FormService from '../../services/formService'

const Dashboard = () => {
  const [selectedForms, setSelectedForms] = useState(null)
  const [globalFilter, setGlobalFilter] = useState(null)
  const [checked, setChecked] = useState(false)
  const [forms, setForms] = useState([])
  const [loading, setLoading] = useState(true)
  const [showFormDialog, setShowFormDialog] = useState(false)
  const [parentFormId, setParentFormId] = useState(null)
  const [formName, setFormName] = useState('')
  const toast = useRef(null)
  const dt = useRef(null)

  const rightToolbarTemplate = () => {
    return (
      <div style={{ display: 'flex', float: 'right' }}>
        <div className='button-demo mr-2'>
          <div className='template'>
            <Link to='./FormEdit' style={{ color: 'white' }}>
              <Button className='formedit p-1 p-button-rounded '>
                <span className='px-3'>
                  <i className='pi pi-pencil'></i>
                </span>
              </Button>
            </Link>
          </div>
        </div>
        <div className='button-demo'>
          <div className='template'>
            <Link to='./FormData' style={{ color: 'white' }}>
              <Button className='formdata p-1 p-button-rounded'>
                <span className='px-3'>
                  {' '}
                  <i className='pi pi-database'></i>
                </span>
              </Button>
            </Link>
          </div>
        </div>
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
          selectionMode='single'
        />
      </div>
    )
  }

  const getForms = async (formId) => {
    const params = {
      parent_form_id: formId,
    }
    const response = await FormService.listForms(params)

    const treeNodes = response.data.map((form) => {
      return {
        key: form._id,
        label: form.title,
        leaf: false,
      }
    })

    setForms(treeNodes)
    setLoading(false)
  }

  useEffect(() => {
    getForms(null)
  }, [])

  const createNewForm = async () => {
    const params = {
      title: formName,
      parent_id: parentFormId,
    }
    const response = await FormService.createForms(params)
    if (response.error) {
      toast.current.show({
        severity: 'error',
        summary: 'Klasör Oluşturulamadı',
        detail: 'Klasör oluşturulamadı! Lütfen daha sonra tekrar deneyiziniz.',
        life: 3000,
      })
    } else {
      setFormName('')
      setShowFormDialog(false)
      setParentFormId(null)
      getForms(null)
      toast.current.show({
        severity: 'success',
        summary: 'Klasör Oluşturuldu',
        detail: 'Klasör Oluşturuldu',
        life: 3000,
      })
    }
  }

  const renderFormDialogFooter = () => {
    return (
      <div>
        <Button
          label='No'
          icon='pi pi-times'
          onClick={() => setShowFormDialog(false)}
          className=' inputbutton p-button-raised p-button-plain p-button-text'
          style={{ float: 'left' }}
        />
        <Button
          label='Add'
          icon='pi pi-check'
          onClick={() => createNewForm()}
          autoFocus
        />
      </div>
    )
  }
  return (
    <div className='datatable-crud-demo'>
      <Toast ref={toast} />
      <div>
        <Dialog
          header='Add New Form'
          visible={showFormDialog}
          onHide={() => setShowFormDialog(false)}
          breakpoints={{ '960px': '75vw' }}
          style={{ width: '30vw' }}
          footer={renderFormDialogFooter}
        >
          <hr />
          <br />
          <div>
            <h4>
              <b>Form Name</b>
            </h4>
            <InputText
              type='text'
              value={formName}
              placeholder='Here Form Name'
              className='p-inputtext-lg block'
              style={{ width: '100%' }}
              onChange={(e) => setFormName(e.target.value)}
            />
          </div>
          <br />
          <hr />
        </Dialog>
        <Button
          label='Create New Form'
          className='p-button-text p-button-raised'
          onClick={() => {
            setParentFormId(null)
            setShowFormDialog(true)
          }}
          style={{ float: 'right', marginTop: '-40px' }}
        />
      </div>
      <div className='card mt-5'>
        <DataTable
          ref={dt}
          value={forms}
          selection={selectedForms}
          loading={loading}
          onSelectionChange={(e) => setSelectedForms(e.value)}
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
            field='label'
            header='Name'
            sortable
            style={{ minWidth: 'auto' }}
            className='myforms '
          ></Column>
          <Column
            field=''
            header='Status'
            body='New Create'
            sortable
            style={{ minWidth: '' }}
          ></Column>
          <Column className='link' body={rightToolbarTemplate}></Column>
        </DataTable>
      </div>
    </div>
  )
}
export default Dashboard
