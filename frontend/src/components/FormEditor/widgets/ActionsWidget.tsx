import React, { useEffect } from 'react'
import { Space, Button, Radio } from 'antd'
import { useDesigner, TextWidget } from '@designable/react'
import { GlobalRegistry } from '@designable/core'
import { observer } from '@formily/react'
import { loadInitialSchema, saveSchema } from '../service'

export const ActionsWidget = observer(() => {
  const designer = useDesigner()
  useEffect(() => {
    loadInitialSchema(designer)
  }, [])
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
          saveSchema(designer)
        }}
      >
        <TextWidget>Save</TextWidget>
      </Button>
      <Button
        type='primary'
        onClick={() => {
          saveSchema(designer)
        }}
      >
        <TextWidget>Publish</TextWidget>
      </Button>
      <Button
        type='primary'
        onClick={() => {
          window.location.href = '/app#/app'
        }}
        style={{
          backgroundColor: 'white',
          border: 'none',
          color: '#1976d2 ',
        }}
      >
        <TextWidget>Dashboard</TextWidget>
      </Button>
    </Space>
  )
})
