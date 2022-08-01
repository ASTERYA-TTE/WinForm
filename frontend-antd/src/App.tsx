import React from 'react';
import { createForm } from '@formily/core'
import { createSchemaField } from '@formily/react'
//import FormEditor from './components/FormEditor/FormEditor';
//import FormEditorBasic from './components/FormEditorBasic/FormEditorBasic';
import { Form, FormItem, Input, Password, Submit, TreeSelect  } from '@formily/antd'

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    Password,
    TreeSelect,
  },
})

const myForm = {
    "type": "object",
    "properties": {
      "7mt2txag1fq": {
        "type": "string",
        "title": "Input",
        "x-decorator": "FormItem",
        "x-component": "Input",
        "x-validator": [],
        "x-component-props": {},
        "x-decorator-props": {},
        "x-designable-id": "7mt2txag1fq",
        "x-index": 0
      },
      "rj8dpfsg44d": {
        "type": "string",
        "title": "TextArea",
        "x-decorator": "FormItem",
        "x-component": "Input.TextArea",
        "x-validator": [],
        "x-component-props": {},
        "x-decorator-props": {},
        "x-designable-id": "rj8dpfsg44d",
        "x-index": 1
      },
      "hgjxngf7w4x": {
        "title": "TreeSelect",
        "x-decorator": "FormItem",
        "x-component": "TreeSelect",
        "x-validator": [],
        "x-component-props": {},
        "x-decorator-props": {
          "style": {
            "backgroundColor": "rgba(128,122,161,1)"
          }
        },
        "x-designable-id": "hgjxngf7w4x",
        "x-index": 2
      }
    },
    "x-designable-id": "l7pulr2o5b8"
  }


const form = createForm();

const App = () => {
  return (
    <div>
      <Form form={form} onAutoSubmit={console.log}>
        <SchemaField schema={myForm} />

        <Submit block size="large">
                Log in
              </Submit>
      </Form>
      
      <h1>Merhaba</h1>
    </div>
  )
}

export default App;