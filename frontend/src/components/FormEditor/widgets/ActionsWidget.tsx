import React, { useEffect } from 'react'
import { Space, Button, Radio } from 'antd'
import { useDesigner, TextWidget } from '@designable/react'
import { GlobalRegistry } from '@designable/core'
import { observer } from '@formily/react'
import { loadInitialSchema, saveSchema } from '../service'
import { useLocation } from 'react-router-dom'

export const ActionsWidget = observer(() => {
  const location = useLocation()
  const designer = useDesigner()
  useEffect(() => {
    if (location.state) {
      loadInitialSchema(designer, location.state.formId)
    }
  }, [location.state])
  const supportLocales = ['tr-tr', 'en-us']
  useEffect(() => {
    if (!supportLocales.includes(GlobalRegistry.getDesignerLanguage())) {
      GlobalRegistry.setDesignerLanguage('en-us')
    }
  }, [])
  return (
    <Space style={{ marginRight: 10 }}>
      <Radio.Group
        value={GlobalRegistry.getDesignerLanguage()}
        optionType='button'
        options={[
          { label: 'Türkçe', value: 'tr-tr' },
          { label: 'English', value: 'en-us' },
        ]}
        onChange={(e) => {
          GlobalRegistry.setDesignerLanguage(e.target.value)
        }}
      />

      <Button
        onClick={() => {
          console.log('Location state ne geliyor', location)
          if (location.state && location.state.formId) {
            saveSchema(designer, location.state.formId)
          }
        }}
      >
        <TextWidget>Save</TextWidget>
      </Button>
      <Button
        type='primary'
        onClick={() => {
          // Publish aksiyonu
        }}
      >
        <TextWidget>Publish</TextWidget>
      </Button>
    </Space>
  )
})
