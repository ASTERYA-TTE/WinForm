import React, { useState, useEffect, useRef } from 'react'
import { classNames } from 'primereact/utils'
import { Button } from 'primereact/button'
import { FileUpload } from 'primereact/fileupload'
import { Rating } from 'primereact/rating'
import { RadioButton } from 'primereact/radiobutton'
import { InputNumber } from 'primereact/inputnumber'
import { InputText } from 'primereact/inputtext'
import { Link } from 'react-router-dom'
import { PrimeIcons } from 'primereact/api'

const ProductDetails = () => {
  const [trademarkId, setTrademarkId] = useState()
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

  const [products, setProducts] = useState(null)
  const [productDialog, setProductDialog] = useState(false)
  const [deleteProductDialog, setDeleteProductDialog] = useState(false)
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false)
  const [product, setProduct] = useState(emptyProduct)
  const [selectedProducts, setSelectedProducts] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [globalFilter, setGlobalFilter] = useState(null)
  const toast = useRef(null)
  const dt = useRef(null)

  const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
  }

  const openNew = () => {
    setProduct(emptyProduct)
    setSubmitted(false)
    setProductDialog(true)
  }

  const hideDialog = () => {
    setSubmitted(false)
    setProductDialog(false)
  }

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false)
  }

  const hideDeleteProductsDialog = () => {
    setDeleteProductsDialog(false)
  }

  const saveProduct = () => {
    setSubmitted(true)

    if (product.name.trim()) {
      let _products = [...products]
      let _product = { ...product }
      if (product.id) {
        const index = findIndexById(product.id)

        _products[index] = _product
        toast.current.show({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Updated',
          life: 3000,
        })
      } else {
        _product.id = createId()
        _product.image = 'product-placeholder.svg'
        _products.push(_product)
        toast.current.show({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Created',
          life: 3000,
        })
      }

      setProducts(_products)
      setProductDialog(false)
      setProduct(emptyProduct)
    }
  }

  const editProduct = (product) => {
    setProduct({ ...product })
    setProductDialog(true)
  }

  const confirmDeleteProduct = (product) => {
    setProduct(product)
    setDeleteProductDialog(true)
  }

  const deleteProduct = () => {
    let _products = products.filter((val) => val.id !== product.id)
    setProducts(_products)
    setDeleteProductDialog(false)
    setProduct(emptyProduct)
    toast.current.show({
      severity: 'success',
      summary: 'Successful',
      detail: 'Product Deleted',
      life: 3000,
    })
  }

  const findIndexById = (id) => {
    let index = -1
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === id) {
        index = i
        break
      }
    }

    return index
  }

  const createId = () => {
    let id = ''
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return id
  }

  const importCSV = (e) => {
    const file = e.files[0]
    const reader = new FileReader()
    reader.onload = (e) => {
      const csv = e.target.result
      const data = csv.split('\n')

      // Prepare DataTable
      const cols = data[0].replace(/['"]+/g, '').split(',')
      data.shift()

      const importedData = data.map((d) => {
        d = d.split(',')
        const processedData = cols.reduce((obj, c, i) => {
          c =
            c === 'Status'
              ? 'inventoryStatus'
              : c === 'Reviews'
              ? 'rating'
              : c.toLowerCase()
          obj[c] = d[i].replace(/['"]+/g, '')
          ;(c === 'price' || c === 'rating') && (obj[c] = parseFloat(obj[c]))
          return obj
        }, {})

        processedData['id'] = createId()
        return processedData
      })

      const _products = [...products, ...importedData]

      setProducts(_products)
    }

    reader.readAsText(file, 'UTF-8')
  }

  const exportCSV = () => {
    dt.current.exportCSV()
  }

  const confirmDeleteSelected = () => {
    setDeleteProductsDialog(true)
  }

  const deleteSelectedProducts = () => {
    let _products = products.filter((val) => !selectedProducts.includes(val))
    setProducts(_products)
    setDeleteProductsDialog(false)
    setSelectedProducts(null)
    toast.current.show({
      severity: 'success',
      summary: 'Successful',
      detail: 'Products Deleted',
      life: 3000,
    })
  }

  const onCategoryChange = (e) => {
    let _product = { ...product }
    _product['category'] = e.value
    setProduct(_product)
  }

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || ''
    let _product = { ...product }
    _product[`${name}`] = val

    setProduct(_product)
  }

  const onInputNumberChange = (e, name) => {
    const val = e.value || 0
    let _product = { ...product }
    _product[`${name}`] = val

    setProduct(_product)
  }

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button
          label='New'
          icon='pi pi-plus'
          className='p-button-success mr-2'
          onClick={openNew}
        />
        <Button
          label='Delete'
          icon='pi pi-trash'
          className='p-button-danger'
          onClick={confirmDeleteSelected}
          disabled={!selectedProducts || !selectedProducts.length}
        />
      </React.Fragment>
    )
  }

  const rightToolbarTemplate = () => {
    return (
      <React.Fragment>
        <FileUpload
          mode='basic'
          name='demo[]'
          auto
          url='https://primefaces.org/primereact/showcase/upload.php'
          accept='.csv'
          chooseLabel='Import'
          className='mr-2 inline-block'
          onUpload={importCSV}
        />
        <Button
          label='Export'
          icon='pi pi-upload'
          className='p-button-help'
          onClick={exportCSV}
        />
      </React.Fragment>
    )
  }

  const imageBodyTemplate = (rowData) => {
    return (
      <img
        src={`images/product/${rowData.image}`}
        onError={(e) =>
          (e.target.src =
            'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png')
        }
        alt={rowData.image}
        className='product-image'
      />
    )
  }

  const priceBodyTemplate = (rowData) => {
    return formatCurrency(rowData.price)
  }

  const ratingBodyTemplate = (rowData) => {
    return <Rating value={rowData.rating} readOnly cancel={false} />
  }

  const statusBodyTemplate = (rowData) => {
    return (
      <span
        className={`product-badge status-${rowData.inventoryStatus.toLowerCase()}`}
      >
        {rowData.inventoryStatus}
      </span>
    )
  }

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon='pi pi-pencil'
          className='p-button-rounded p-button-success mr-2'
          onClick={() => editProduct(rowData)}
        />
        <Button
          icon='pi pi-trash'
          className='p-button-rounded p-button-warning'
          onClick={() => confirmDeleteProduct(rowData)}
        />
      </React.Fragment>
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
  const productDialogFooter = (
    <React.Fragment>
      <Button
        label='Cancel'
        icon='pi pi-times'
        className='p-button-text'
        onClick={hideDialog}
      />
      <Button
        label='Save'
        icon='pi pi-check'
        className='p-button-text'
        onClick={saveProduct}
      />
    </React.Fragment>
  )
  const deleteProductDialogFooter = (
    <React.Fragment>
      <Button
        label='No'
        icon='pi pi-times'
        className='p-button-text'
        onClick={hideDeleteProductDialog}
      />
      <Button
        label='Yes'
        icon='pi pi-check'
        className='p-button-text'
        onClick={deleteProduct}
      />
    </React.Fragment>
  )
  const deleteProductsDialogFooter = (
    <React.Fragment>
      <Button
        label='No'
        icon='pi pi-times'
        className='p-button-text'
        onClick={hideDeleteProductsDialog}
      />
      <Button
        label='Yes'
        icon='pi pi-check'
        className='p-button-text'
        onClick={deleteSelectedProducts}
      />
    </React.Fragment>
  )

  return (
    <div className='flex  justify-content-center  mt-8'>
      <div className='card' style={{ width: '600px' }}>
        {' '}
        <div
          visible={productDialog}
          header='Product Details'
          modal
          className='p-fluid'
          footer={productDialogFooter}
          onHide={hideDialog}
        >
          {product.image && (
            <img
              src={`images/product/${product.image}`}
              onError={(e) =>
                (e.target.src =
                  'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png')
              }
              alt={product.image}
              className='product-image block m-auto pb-3'
            />
          )}
          <div className='card'>
            <label htmlFor='fullname'>
              <h3>Full Name</h3>
            </label>

            <div className='field'>
              <label htmlFor='name'>Name</label>
              <InputText
                id='name'
                value={product.name}
                onChange={(e) => onInputChange(e, 'name')}
                required
                autoFocus
                className={classNames({
                  'p-invalid': submitted && !product.name,
                })}
              />
              {submitted && !product.name && (
                <small className='p-error'>Name is required.</small>
              )}
              <div className='field'>
                <label htmlFor='name'>Last Name</label>
                <InputText
                  id='name'
                  value={product.name}
                  onChange={(e) => onInputChange(e, 'name')}
                  required
                  autoFocus
                  className={classNames({
                    'p-invalid': submitted && !product.name,
                  })}
                />
                {submitted && !product.name && (
                  <small className='p-error'>Name is required.</small>
                )}
              </div>
            </div>
          </div>
          <div className='field'>
            <label htmlFor='description'>Email</label>
            <InputText
              id='description'
              value={product.description}
              onChange={(e) => onInputChange(e, 'description')}
              required
              rows={3}
              cols={20}
              type='email'
            />
          </div>

          <div className='field'>
            <label htmlFor='description'>ContactNumber</label>
            <InputText
              id='description'
              value={product.description}
              onChange={(e) => onInputChange(e, 'description')}
              required
              rows={3}
              cols={20}
              type='number'
            />
          </div>
          <br />
          <br />
          <div>
            <div className='card'>
              <label htmlFor='fullname'>
                <h3>BillingName</h3>
              </label>
              <div className='field'>
                <label htmlFor='name'>Street Address</label>
                <InputText
                  id='name'
                  value={product.name}
                  onChange={(e) => onInputChange(e, 'name')}
                  required
                  autoFocus
                  className={classNames({
                    'p-invalid': submitted && !product.name,
                  })}
                />
                {submitted && !product.name && (
                  <small className='p-error'>Adress is required.</small>
                )}
                <div className='field'>
                  <label htmlFor='name'>Street Address Line 2</label>
                  <InputText
                    id='name'
                    value={product.name}
                    onChange={(e) => onInputChange(e, 'name')}
                    required
                    autoFocus
                    className={classNames({
                      'p-invalid': submitted && !product.name,
                    })}
                  />
                  {submitted && !product.name && (
                    <small className='p-error'>Adress is required.</small>
                  )}
                </div>
                <div className='formgrid grid'>
                  <div className='field col'>
                    <label htmlFor='city'>City</label>
                    <InputNumber
                      id='price'
                      value={product.price}
                      onValueChange={(e) => onInputNumberChange(e, 'price')}
                      mode='currency'
                      currency='USD'
                      locale='en-US'
                    />
                  </div>
                  <div className='field col'>
                    <label htmlFor='quantity'>State / Province</label>
                    <InputNumber
                      id='quantity'
                      value={product.quantity}
                      onValueChange={(e) => onInputNumberChange(e, 'quantity')}
                      integeronly
                    />
                  </div>
                </div>
                <div className='field'>
                  <label htmlFor='name'>Postal / Zip Code</label>
                  <InputText
                    id='name'
                    value={product.name}
                    onChange={(e) => onInputChange(e, 'name')}
                    required
                    autoFocus
                    className={classNames({
                      'p-invalid': submitted && !product.name,
                    })}
                  />
                  {submitted && !product.name && (
                    <small className='p-error'>Zip Code is required.</small>
                  )}
                </div>
                <div className='field'>
                  <label className='mb-3'>Send Gift</label>
                  <div className='formgrid grid'>
                    <div className='field-radiobutton col-6'>
                      <RadioButton
                        inputId='category1'
                        name='category'
                        value='Accessories'
                        onChange={onCategoryChange}
                        checked={product.category === 'Accessories'}
                      />
                      <label htmlFor='category1'>Yes</label>
                    </div>
                    <div className='field-radiobutton col-6'></div>
                    <div className='field-radiobutton col-6'>
                      <RadioButton
                        inputId='category3'
                        name='category'
                        value='Electronics'
                        onChange={onCategoryChange}
                        checked={product.category === 'Electronics'}
                      />
                      <label htmlFor='category3'>No</label>
                    </div>
                  </div>
                </div>
              </div>
              <div className='field'>
                <label className='mb-3'>Payment Methods</label>
                <div className='formgrid grid'>
                  <div className='field-radiobutton col-6'>
                    <RadioButton
                      inputId='category1'
                      name='category'
                      value='Accessories'
                      onChange={onCategoryChange}
                      checked={product.category === 'Accessories'}
                    />
                    <label htmlFor='category1'>
                      <i className='pi pi-credit-card'></i> Debit or Credit Card
                    </label>
                  </div>
                  <div className='field-radiobutton col-6'></div>
                  <div className='field-radiobutton col-6'>
                    <RadioButton
                      inputId='category3'
                      name='category'
                      value='Electronics'
                      onChange={onCategoryChange}
                      checked={product.category === 'Electronics'}
                    />
                    <img
                      src='https://cdn.jotfor.ms/assets/img/payments/PG-PP.svg'
                      alt=''
                      width={'72px'}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <Button>
          <Link to='/app' style={{ color: 'white', width: '100px' }}>
            Back
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default ProductDetails
