import React, { useState, useRef, useEffect } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Toast } from 'primereact/toast'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Checkbox } from 'primereact/checkbox'
import { Dialog } from 'primereact/dialog'
import './Dashboard.css'
import { Link, useLocation, useNavigate, useNavigation } from 'react-router-dom'
import FormService from '../../services/formService'

const Dashboard = () => {
  const location = useLocation()
  const navigation = useNavigation()
  const navigate = useNavigate()
  const [selectedForms, setSelectedForms] = useState(null)
  const [globalFilter, setGlobalFilter] = useState(null)
  const [checked, setChecked] = useState(false)
  const [forms, setForms] = useState([])
  const [loading, setLoading] = useState(true)
  const [showFormDialog, setShowFormDialog] = useState(false)
  const [formName, setFormName] = useState('')
  const [deleteFormTitle, setDeleteFormTitle] = useState(false)
  const [formEditName, setFormEditName] = useState('')
  const [formEdit, setFormEdit] = useState('')
  const toast = useRef(null)
  const dt = useRef(null)

  const rightToolbarTemplate = (rowData) => {
    return (
      <div style={{ display: 'flex', float: 'right' }}>
        <div className='button-demo mr-2'>
          <div className='template'>
            <Button className='formedit p-1 p-button-rounded '>
              <span className='px-3'>
                <i className='pi pi-pencil'></i>
              </span>
            </Button>
          </div>
        </div>
        <div className='button-demo mr-2'>
          <div className='template'>
            <Button
              className='formdata p-1 p-button-rounded'
              onClick={() => setDeleteFormTitle(true)}
            >
              <span className='px-3'>
                <i className='pi pi-database'></i>
              </span>
            </Button>
          </div>
        </div>
        <div className='button-demo mr-2'>
          <div className='template'>
            <Button
              className='formdata p-1 p-button-rounded'
              onClick={() => navigateToEditor(rowData)}
            >
              <span className='px-3'>
                {' '}
                <i className='pi pi-file-edit'></i>
              </span>
            </Button>
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

  const getForms = async (folderId) => {
    const params = {
      folder_id: folderId,
    }
    console.log(params)
    const response = await FormService.listForms(params)
    console.log(response, 'forms', forms)
    setForms(response.data)
    setLoading(false)
  }

  useEffect(() => {
    console.log('Daashboard useEffect Navigation', navigation)
  }, [navigation.state])

  useEffect(() => {
    console.log('Dashboard use effect calisti', location)
    getForms(location.state ? location.state.folderId : null)
  }, [location.state])

  const createNewForm = async () => {
    const params = {
      title: formName,
      folder_id: location.state.folderId,
    }

    const response = await FormService.createForms(params)
    if (response.error) {
      toast.current.show({
        severity: 'error',
        summary: 'Form Oluşturulamadı',
        detail: 'Form oluşturulamadı! Lütfen daha sonra tekrar deneyiziniz.',
        life: 3000,
      })
    } else {
      setFormName('')
      setShowFormDialog(false)
      getForms(location.state.folderId)
      toast.current.show({
        severity: 'success',
        summary: 'Form Oluşturuldu',
        detail: 'Form Oluşturuldu',
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

  const navigateToEditor = (rowData) => {
    navigate('/editor', {
      state: { formId: rowData._id, title: rowData.title },
    })
    console.log(rowData)
  }

  const confirmDeleteProduct = (form) => {
    setFormEdit(form)
    setDeleteFormTitle(false)
    let formsAll = forms.filter((val) => val.id !== formEdit.id)
    setForms(formsAll)

    setFormEdit('')
    toast.current.show({
      severity: 'success',
      summary: 'Successful',
      detail: 'Product Deleted',
      life: 3000,
    })
  }

  const renderDeleteDialogFooter = (rowData) => {
    console.log(forms)
    return (
      <div>
        <Button
          label='No'
          icon='pi pi-times'
          onClick={() => setDeleteFormTitle(false)}
          className=' inputbutton p-button-raised p-button-plain p-button-text'
          style={{ float: 'left' }}
        />
        <Button
          label='Add'
          icon='pi pi-check'
          onClick={() => confirmDeleteProduct(rowData)}
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
          className='p-button-text p-button-raised -mt-6'
          onClick={() => {
            setShowFormDialog(true)
          }}
          style={{ float: 'right' }}
        />
      </div>
      <div>
        <Dialog
          header='Edit Form'
          visible={deleteFormTitle}
          onHide={() => setDeleteFormTitle(false)}
          breakpoints={{ '960px': '75vw' }}
          style={{ width: '30vw' }}
          footer={renderDeleteDialogFooter}
        >
          <hr />
          <br />
          <div>
            <h4>
              <b>Edit Form Name</b>
            </h4>
            <InputText
              type='text'
              value={formEditName}
              placeholder={forms.title}
              className='p-inputtext-lg block'
              style={{ width: '100%' }}
              onChange={(e) => setFormEditName(e.target.value)}
            />
          </div>
          <br />
          <hr />
        </Dialog>

        <Button
          label='Create New Form'
          className='p-button-text p-button-raised -mt-6'
          onClick={() => {
            setShowFormDialog(true)
          }}
          style={{ float: 'right' }}
        />
      </div>

      <Dialog
        visible={deleteFormTitle}
        style={{ width: '450px' }}
        header='Confirm'
        modal
        footer={renderDeleteDialogFooter}
        onHide={() => setDeleteFormTitle(false)}
      >
        <div className='confirmation-content'>
          <i
            className='pi pi-exclamation-triangle mr-3'
            style={{ fontSize: '2rem' }}
          />

          <span>
            Are you sure you want to delete <b>{formEdit.title}</b>?
          </span>
        </div>
      </Dialog>

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
          className='mt-2'
        >
          <Column
            body={CheckBox}
            headerStyle={{ width: '3rem' }}
            exportable={false}
          ></Column>
          <Column
            field='title'
            header='Name'
            sortable
            style={{ width: 'auto' }}
            className='myforms '
          ></Column>
          <Column
            field=''
            header='Status'
            body='New Create'
            sortable
            style={{ width: 'auto' }}
          ></Column>
          <Column
            className='link'
            body={rightToolbarTemplate}
            style={{ width: 'auto' }}
          ></Column>
        </DataTable>
      </div>
    </div>
  )
}
export default Dashboard
