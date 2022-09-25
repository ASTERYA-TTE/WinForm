import { Engine } from '@designable/core'
import {
  transformToSchema,
  transformToTreeNode,
} from '@designable/formily-transformer'
import { message } from 'antd'
import FormService from '../../../services/formService'

export const saveSchema = (designer: Engine, formId: any) => {
  localStorage.setItem(
    'formily-schema',
    JSON.stringify(transformToSchema(designer.getCurrentTree()))
  )
  const params = {
    formId: formId,
    data: JSON.stringify(transformToSchema(designer.getCurrentTree()))
  }
  FormService.updateForm(params)
  message.success('Save Success')
}

export const loadInitialSchema = async (designer: Engine, formId:any) => {
  try {
    // designer.setCurrentTree(
    //   transformToTreeNode(JSON.parse(localStorage.getItem('formily-schema')))
    // )

    const form = await FormService.getForm(formId)
    designer.setCurrentTree(
        transformToTreeNode(JSON.parse(form.data.data.data))
      )
    console.log('Designer load form ',formId, form)

  } catch {}
}
