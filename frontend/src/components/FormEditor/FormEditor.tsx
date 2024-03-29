import '../../../node_modules/antd/dist/antd.less'
import React, { useMemo, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { LogoWidget } from './widgets/LogoWidget'

import {
  Designer,
  DesignerToolsWidget,
  ViewToolsWidget,
  Workspace,
  OutlineTreeWidget,
  ResourceWidget,
  HistoryWidget,
  StudioPanel,
  CompositePanel,
  WorkspacePanel,
  ToolbarPanel,
  ViewportPanel,
  ViewPanel,
  SettingsPanel,
  ComponentTreeWidget,
} from '@designable/react'
import {
  SettingsForm,
  setNpmCDNRegistry,
} from '@designable/react-settings-form'
import {
  createDesigner,
  GlobalRegistry,
  Shortcut,
  KeyCode,
} from '@designable/core'
import {
  ActionsWidget,
  PreviewWidget,
  SchemaEditorWidget,
  MarkupSchemaWidget,
} from './widgets'

import { saveSchema } from './service'
import {
  Form,
  Field,
  Input,
  Select,
  TreeSelect,
  Cascader,
  Radio,
  Checkbox,
  Slider,
  Rate,
  NumberPicker,
  Transfer,
  Password,
  DatePicker,
  TimePicker,
  Upload,
  Switch,
  Text,
  Card,
  ArrayCards,
  ObjectContainer,
  ArrayTable,
  Space,
  FormTab,
  FormCollapse,
  FormLayout,
  FormGrid,
} from '@designable/formily-antd'

setNpmCDNRegistry('//unpkg.com')

GlobalRegistry.registerDesignerLocales({
  'tr-TR': {
    sources: {
      Inputs: 'Yazı Girdileri',
      Layouts: 'Düzenler',
      Arrays: 'Diziler',
      Displays: 'Görüntüler',
    },
  },
  'en-US': {
    sources: {
      Inputs: 'Inputs',
      Layouts: 'Layouts',
      Arrays: 'Arrays',
      Displays: 'Displays',
    },
  },
})

const FormEditor = () => {
  const location = useLocation()

  useEffect(() => {
    //  Formu al
    console.log('Editor use effect location state', location.state)
  }, [location.state])

  const engine = useMemo(
    () =>
      createDesigner({
        shortcuts: [
          new Shortcut({
            codes: [
              [KeyCode.Meta, KeyCode.S],
              [KeyCode.Control, KeyCode.S],
            ],
            handler(ctx) {
              if (location.state) {
                saveSchema(ctx.engine, location.state.formId)
              }
            },
          }),
        ],
        rootComponentName: 'Form',
      }),
    []
  )
  return (
    <Designer engine={engine}>
      <StudioPanel logo={<LogoWidget />} actions={<ActionsWidget />}>
        <CompositePanel>
          <CompositePanel.Item title='panels.Component' icon='Component'>
            <ResourceWidget
              title='sources.Inputs'
              sources={[
                Input,
                Password,
                NumberPicker,
                Rate,
                Slider,
                Select,
                TreeSelect,
                Cascader,
                Transfer,
                Checkbox,
                Radio,
                DatePicker,
                TimePicker,
                Upload,
                Switch,
                ObjectContainer,
              ]}
            />
            <ResourceWidget
              title='sources.Layouts'
              sources={[
                Card,
                FormGrid,
                FormTab,
                FormLayout,
                FormCollapse,
                Space,
              ]}
            />
            <ResourceWidget
              title='sources.Arrays'
              sources={[ArrayCards, ArrayTable]}
            />
            <ResourceWidget title='sources.Displays' sources={[Text]} />
          </CompositePanel.Item>
          <CompositePanel.Item title='panels.OutlinedTree' icon='Outline'>
            <OutlineTreeWidget />
          </CompositePanel.Item>
          <CompositePanel.Item title='panels.History' icon='History'>
            <HistoryWidget />
          </CompositePanel.Item>
        </CompositePanel>
        <Workspace id='form'>
          <WorkspacePanel>
            <ToolbarPanel>
              <DesignerToolsWidget />
              <ViewToolsWidget
                use={['DESIGNABLE', 'JSONTREE', 'MARKUP', 'PREVIEW']}
              />
            </ToolbarPanel>
            <ViewportPanel style={{ height: '100%' }}>
              <ViewPanel type='DESIGNABLE'>
                {() => (
                  <ComponentTreeWidget
                    components={{
                      Form,
                      Field,
                      Input,
                      Select,
                      TreeSelect,
                      Cascader,
                      Radio,
                      Checkbox,
                      Slider,
                      Rate,
                      NumberPicker,
                      Transfer,
                      Password,
                      DatePicker,
                      TimePicker,
                      Upload,
                      Switch,
                      Text,
                      Card,
                      ArrayCards,
                      ArrayTable,
                      Space,
                      FormTab,
                      FormCollapse,
                      FormGrid,
                      FormLayout,
                      ObjectContainer,
                    }}
                  />
                )}
              </ViewPanel>
              <ViewPanel type='JSONTREE' scrollable={false}>
                {(tree, onChange) => (
                  <SchemaEditorWidget tree={tree} onChange={onChange} />
                )}
              </ViewPanel>
              <ViewPanel type='MARKUP' scrollable={false}>
                {(tree) => <MarkupSchemaWidget tree={tree} />}
              </ViewPanel>
              <ViewPanel type='PREVIEW'>
                {(tree) => <PreviewWidget tree={tree} />}
              </ViewPanel>
            </ViewportPanel>
          </WorkspacePanel>
        </Workspace>
        <SettingsPanel title='panels.PropertySettings'>
          <SettingsForm uploadAction='https://www.mocky.io/v2/5cc8019d300000980a055e76' />
        </SettingsPanel>
      </StudioPanel>
    </Designer>
  )
}

export default FormEditor
