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
import { connect } from 'react-redux'
import { getFolderTreeSelect } from '../../redux/actions/actions.tsx'
import { classNames } from 'primereact/utils'

const Dashboard = (props) => {
  let emptyProduct = {
    id: null,
    title: '',
  }
  const location = useLocation()
  const navigation = useNavigation()
  const navigate = useNavigate()
  const [selectedForms, setSelectedForms] = useState(null)
  const [globalFilter, setGlobalFilter] = useState(null)
  const [checked, setChecked] = useState(false)
  const [forms, setForms] = useState([])
  const [loading, setLoading] = useState(false)
  const [showFormDialog, setShowFormDialog] = useState(false)
  const [formName, setFormName] = useState('')
  const [formEditName, setFormEditName] = useState('')
  const [deleteFormDialog, setDeleteFormDialog] = useState(false)
  const [formTitleDialog, setFormTitleDialog] = useState(false)
  const [formSaveSubmitted, setFormSaveSubmitted] = useState(false)
  const toast = useRef(null)
  const dt = useRef(null)

  const rightToolbarTemplate = (rowData) => {
    return (
      <div style={{ display: 'flex', float: 'right' }}>
        <div className='button-demo mr-2'>
          <div className='template'>
            <Button
              className='formedit p-1 p-button-rounded '
              onClick={() => editForm(rowData)}
            >
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
              onClick={() => confirmDeleteForm(rowData)}
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

  // const getForms = async (folderId) => {
  //   const params = {
  //     folder_id: folderId,
  //   }
  //   console.log(params)
  //   const response = await FormService.listForms(params)
  //   console.log(response, 'forms', forms)
  //   setForms(response.data)
  //   setLoading(false)
  // }

  // useEffect(() => {
  //   console.log('Daashboard useEffect Navigation', navigation)
  // }, [navigation.state])

  // useEffect(() => {
  //    console.log('Dashboard use effect calisti', location)
  //   getForms(location.state ? location.state.folderId : null)
  // }, [location.state])

  const createNewForm = async () => {
    const params = {
      title: formName,
      folder_id: props.folderId,
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
      //getForms(props.folderId)
      props.getFolderTreeSelect(props.folderId)
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
          label='Cancel'
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

  const hideFormDialog = () => {
    setFormSaveSubmitted(false)
    setFormTitleDialog(false)
  }

  const hideDeleteFormDialog = () => {
    setDeleteFormDialog(false)
  }

  const confirmDeleteForm = (form) => {
    setFormEditName(form)
    setDeleteFormDialog(true)
  }

  const deleteForm = () => {
    let form = forms.filter((val) => val.id !== formEditName.id)
    console.log(form, 'formsAll', 'Title', formEditName.formTitle)
    setForms(form)
    console.log(formEditName, 'formEditName', setForms(form))
    setDeleteFormDialog(false)
    setFormEditName(emptyProduct)
    toast.current.show({
      severity: 'success',
      summary: 'Successful',
      detail: `"${formEditName.title}"  Formu Silindi`,
      life: 3000,
    })
  }

  const findIndexById = (id) => {
    let index = -1
    for (let i = 0; i < forms.length; i++) {
      if (forms[i].id === id) {
        index = i
        break
      }
    }

    return index
  }

  const deleteFormDialogFooter = (
    <React.Fragment>
      <Button
        label='No'
        icon='pi pi-times'
        className='p-button-text'
        onClick={hideDeleteFormDialog}
      />
      <Button
        label='Yes'
        icon='pi pi-check'
        className='p-button-text'
        onClick={deleteForm}
      />
    </React.Fragment>
  )

  const editForm = (form) => {
    setFormEditName({ ...form })
    setFormTitleDialog(true)
  }

  const getUpdatedFormTitle = async (formId) => {
    setFormSaveSubmitted(true)

    const params = {
      formId: formId,
      data: {
        title: formEditName.title,
      },
    }
    const response = FormService.updateForm(params)

    if (response.error) {
      toast.current.show({
        severity: 'error',
        summary: 'Form İsmi Güncellenemedi',
        detail:
          'Form İSmi güncellenemedi! Lütfen daha sonra tekrar deneyiziniz.',
        life: 3000,
      })
    } else {
      if (formEditName.title.trim()) {
        let formsAll = [...forms]
        let formTitle = { ...formEditName }

        const index = findIndexById(formEditName.id)

        formsAll[index] = formTitle
        toast.current.show({
          severity: 'success',
          summary: 'Successful',
          detail: `Form İsmi "${formEditName.title}" olarak güncellendi`,
          life: 3000,
        })

        props.getFolderTreeSelect(props.folderId)
        setForms(formsAll)
        setFormTitleDialog(false)
        setFormEditName(emptyProduct)
      }
    }
    console.log(
      'formEditName',
      formEditName,
      'forms',
      forms,
      'folderId',
      props.folderId
    )
  }

  const formDialogFooter = (
    <React.Fragment>
      <Button
        label='Cancel'
        icon='pi pi-times'
        className='p-button-text'
        onClick={hideFormDialog}
      />
      <Button
        label='Save'
        icon='pi pi-check'
        className='p-button-text'
        onClick={getUpdatedFormTitle}
      />
    </React.Fragment>
  )
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

      <Dialog
        visible={deleteFormDialog}
        style={{ width: '450px' }}
        header='Confirm'
        modal
        footer={deleteFormDialogFooter}
        onHide={hideDeleteFormDialog}
      >
        <div className='confirmation-content'>
          <i
            className='pi pi-exclamation-triangle mr-3'
            style={{ fontSize: '2rem' }}
          />
          {formEditName && (
            <span>
              Are you sure you want to delete <b>{formEditName.title}</b>?
            </span>
          )}
        </div>
      </Dialog>

      <Dialog
        visible={formTitleDialog}
        style={{ width: '450px' }}
        header='Product Details'
        modal
        className='p-fluid'
        footer={formDialogFooter}
        onHide={hideFormDialog}
      >
        <div className='field'>
          <label htmlFor='title'>Name</label>
          <InputText
            id='title'
            value={formEditName.title}
            onChange={(e) =>
              setFormEditName({ ...formEditName, title: e.target.value })
            }
            required
            autoFocus
          />
          {formSaveSubmitted && !formEditName.title && (
            <small className='p-error'>Name is required.</small>
          )}
        </div>
      </Dialog>

      <div className='card mt-5'>
        <DataTable
          ref={dt}
          value={props.forms}
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

const mapStateProps = (state) => {
  return {
    forms: state.forms,
    folderId: state.selectedLeftSideBarFolder,
  }
}

export default connect(mapStateProps, { getFolderTreeSelect })(Dashboard)
