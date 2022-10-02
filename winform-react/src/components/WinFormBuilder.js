import React, {useState,useEffect} from 'react'
import axios from 'axios';
import {
    Form,
    FormItem,
    Input,
    NumberPicker,
    DatePicker,
    Radio,
    ArrayTable,
    Editable,
    FormButtonGroup,
    Submit,
    Password,
    FormLayout,
    Select,
    Cascader,
    FormGrid,
    Upload,
    ArrayItems,
  } from '@formily/antd'
  import { createSchemaField } from '@formily/react'
  import {
    createForm,
  } from '@formily/core'


function WinFormBuilder(props)  {

    const [formData,setFormData] = useState(null)


    const SchemaField = createSchemaField({
            components: {
              Input,
              FormItem,
              FormGrid,
              FormLayout,
              NumberPicker,
              DatePicker,
              Radio,
              Editable,
              ArrayTable,
              Password,
              Cascader,
              Select,
              ArrayItems,
              Upload,
              FormButtonGroup
            },
            scope: {},
    })

    let form = createForm({
        validateFirst: true,
    })
    

   useEffect(() => {
    axios.post(process.env.REACT_APP_FORM_BUILDER_BACKEND + '/form/getForm', {formId:props.formId}).then(response => {
        console.log('Form data geldi', response)
        setFormData(response.data)
    });
   }, [])

    const renderForm = () => {
        console.log('Render form data', formData)

        if (formData) {
            let fData = JSON.parse(formData.data)
            return (
                <Form
                    form={form}
                    layout='vertical'
                    size='large'
                    onAutoSubmit={console.log}
                >
                    <SchemaField schema={fData.schema} />
                    <Submit block size='large'>
                        KAYDET
                    </Submit>
            </Form>
            )
        } else {
            return (
                <h3>Form bulunamadı</h3>
            )
        }
    }


    return (
        <>
            {renderForm()}
        </>
    )
    
}


export default WinFormBuilder;