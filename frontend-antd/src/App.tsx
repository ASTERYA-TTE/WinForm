import React, { useMemo, useState, useEffect, useRef } from 'react'
import {
  createForm,
  onFieldValueChange,
  onFormValuesChange,
} from '@formily/core'
import { createSchemaField, FormConsumer } from '@formily/react'
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
import { Tabs, Card, Button, Spin } from 'antd'
import * as ICONS from '@ant-design/icons'
import { action } from '@formily/reactive'
import {WinFormBuilder} from 'winform-react'

const form = createForm({
  effects() {
    onFieldValueChange('select', (field) => {
      form.setFieldState('input', (state) => {
        //For the initial linkage, if the field cannot be found, setFieldState will push the update into the update queue until the field appears before performing the operation
        state.display = field.value
      })
    })
  },
  validateFirst: true,
})

const normalForm = createForm({
  validateFirst: true,
})

const phoneForm = createForm({
  validateFirst: true,
})

const normalSchema = {
  type: 'object',
  properties: {
    username: {
      type: 'string',
      title: 'Username',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        prefix: "{{icon('UserOutlined')}}",
      },
    },
    password: {
      type: 'string',
      title: 'Password',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Password',
      'x-component-props': {
        prefix: "{{icon('LockOutlined')}}",
      },
    },
  },
}

const phoneSchema = {
  type: 'object',
  properties: {
    phone: {
      type: 'string',
      title: 'Phone Number',
      required: true,
      'x-validator': 'phone',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        prefix: "{{icon('PhoneOutlined')}}",
      },
    },
    verifyCode: {
      type: 'string',
      title: 'Verification Code',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'VerifyCode',
      'x-component-props': {
        prefix: "{{icon('LockOutlined')}}",
      },
      'x-reactions': [
        {
          dependencies: ['.phone#value', '.phone#valid'],
          fulfill: {
            state: {
              'component[1].readyPost': '{{$deps[0] && $deps[1]}}',
              'component[1].phoneNumber': '{{$deps[0]}}',
            },
          },
        },
      ],
    },
  },
}
const IDUpload = (props: any) => {
  return (
    <Upload
      {...props}
      action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
      headers={{
        authorization: 'authorization-text',
      }}
    >
      <Button>Upload a copy</Button>
    </Upload>
  )
}

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
    IDUpload,
    ArrayItems,
  },
  scope: {
    icon(name: any) {
      return React.createElement(ICONS[name])
    },
    fetchAddress: (field: any) => {
      const transform = (data = {}) => {
        return Object.entries(data).reduce((buf, [key, value]) => {
          if (typeof value === 'string')
            return buf.concat({
              label: value,
              value: key,
            })
          const { name, code, cities, districts }: any = value
          const _cities = transform(cities)
          const _districts = transform(districts)
          return buf.concat({
            label: name,
            value: code,
            children: _cities.length
              ? _cities
              : _districts.length
              ? _districts
              : undefined,
          })
        }, [])
      }
      field.loading = true
      fetch('//unpkg.com/china-location/dist/location.json')
        .then((res) => res.json())
        .then(
          action.bound((data) => {
            field.dataSource = transform(data)
            field.loading = false
          })
        )
    },
  },
})

const schema = {
  type: 'object',
  properties: {
    required_1: {
      name: 'required_1',
      title: 'Required',
      type: 'string',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    required_2: {
      name: 'required_2',
      title: 'Required Obje',
      type: 'string',
      'x-validator': {
        required: true,
      },
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    required_3: {
      name: 'required_3',
      title: 'Required Array',
      type: 'string',
      'x-validator': [
        {
          required: true,
        },
      ],
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    max_1: {
      name: 'max_1',
      title: 'Maximum value (>5 error)',
      type: 'number',
      maximum: 5,
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
    },
    max_2: {
      name: 'max_2',
      title: 'Maximum value (>5 error)',
      type: 'number',
      'x-validator': {
        maximum: 5,
      },
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
    },
    max_3: {
      name: 'max_3',
      title: 'Maximum value (>5 error)',
      type: 'number',
      'x-validator': [
        {
          maximum: 5,
        },
      ],
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
    },
    max_4: {
      name: 'max_4',
      title: 'Maximum value (>=5 error))',
      type: 'number',
      exclusiveMaximum: 5,
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
    },
    max_5: {
      name: 'max_5',
      title: 'Maximum value (>=5 error))',
      type: 'number',
      'x-validator': {
        exclusiveMaximum: 5,
      },
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
    },
    max_6: {
      name: 'max_6',
      title: 'Maximum value (>=5 error))',
      type: 'number',
      'x-validator': [
        {
          exclusiveMaximum: 5,
        },
      ],
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
    },
    min_1: {
      name: 'min_1',
      title: 'Minimum value (<5 error))',
      type: 'number',
      minimum: 5,
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
    },
    min_2: {
      name: 'min_2',
      title: 'Minimum value (<5 error))',
      type: 'number',
      'x-validator': {
        minimum: 5,
      },
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
    },
    min_3: {
      name: 'min_3',
      title: 'Minimum value (<5 error))',
      type: 'string',
      'x-validator': [
        {
          minimum: 5,
        },
      ],
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
    },
    min_4: {
      name: 'min_4',
      title: 'Minimum value (<=5 error))',
      type: 'number',
      exclusiveMinimum: 5,
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
    },
    min_5: {
      name: 'min_5',
      title: 'Minimum value (<=5 error))',
      type: 'number',
      'x-validator': {
        exclusiveMinimum: 5,
      },
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
    },
    min_6: {
      name: 'min_6',
      title: 'Minimum value (<=5 error))',
      type: 'number',
      'x-validator': [
        {
          exclusiveMinimum: 5,
        },
      ],
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
    },
    length_1: {
      name: 'length_1',
      title: 'Length is 5',
      type: 'string',
      'x-validator': {
        len: 5,
      },
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    length_2: {
      name: 'length_2',
      title: 'Length is 5',
      type: 'string',
      'x-validator': [
        {
          len: 5,
        },
      ],
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    maxlength_1: {
      name: 'maxlength_1',
      title: 'Maximum length is 5',
      type: 'string',
      maxLength: 5,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    maxlength_2: {
      name: 'maxlength_2',
      title: 'Maximum length is 5',
      type: 'string',
      'x-validator': {
        max: 5,
      },
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    maxlength_3: {
      name: 'maxlength_3',
      title: 'Maximum length is 5',
      type: 'string',
      'x-validator': [
        {
          max: 5,
        },
      ],
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    minlength_1: {
      name: 'minlength_1',
      title: 'Minimum length is 5',
      type: 'string',
      minLength: 5,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    minlength_2: {
      name: 'minlength_2',
      title: 'Minimum length is 5',
      type: 'string',
      'x-validator': {
        min: 5,
      },
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    minlength_3: {
      name: 'minlength_3',
      title: 'Minimum length is 5',
      type: 'string',
      'x-validator': [
        {
          min: 5,
        },
      ],
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    whitespace: {
      name: 'whitespace',
      title: 'Exclude pure whitespace characters',
      type: 'string',
      'x-validator': [
        {
          whitespace: true,
        },
      ],
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    enum: {
      name: 'enum',
      title: 'Enumeration match',
      type: 'string',
      'x-validator': [
        {
          enum: ['1', '2', '3'],
        },
      ],
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    const: {
      name: 'const',
      title: 'Constant match',
      type: 'string',
      const: '123',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    multipleOf: {
      name: 'multipleOf',
      title: 'Divisible match',
      type: 'string',
      multipleOf: 2,
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
    },
  },
}

const schema1 = {
  type: 'object',
  properties: {
    visible_destructor: {
      type: 'boolean',
      title: 'Whether to display deconstructed fields',
      default: true,
      enum: [
        { label: 'yes', value: true },
        { label: 'no', value: false },
      ],
      'x-decorator': 'FormItem',
      'x-component': 'Radio.Group',
    },
    undestructor: {
      type: 'string',
      title: 'before deconstruction',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker.RangePicker',
    },
    '[startDate,endDate]': {
      type: 'string',
      title: 'after deconstruction',
      default: ['2020-11-20', '2021-12-30'],
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker.RangePicker',
      'x-reactions': {
        dependencies: ['visible_destructor'],
        fulfill: {
          state: {
            visible: '{{!!$deps[0]}}',
          },
        },
      },
    },
  },
}

const schema2 = {
  type: 'object',
  properties: {
    projects: {
      type: 'array',
      title: 'Projects',
      'x-decorator': 'FormItem',
      'x-component': 'ArrayTable',
      items: {
        type: 'object',
        properties: {
          column_1: {
            type: 'void',
            'x-component': 'ArrayTable.Column',
            'x-component-props': {
              width: 50,
              title: 'Sort',
              align: 'center',
            },
            properties: {
              sortable: {
                type: 'void',
                'x-component': 'ArrayTable.SortHandle',
              },
            },
          },
          column_2: {
            type: 'void',
            'x-component': 'ArrayTable.Column',
            'x-component-props': {
              width: 50,
              title: 'Index',
              align: 'center',
            },
            properties: {
              index: {
                type: 'void',
                'x-component': 'ArrayTable.Index',
              },
            },
          },
          column_3: {
            type: 'void',
            'x-component': 'ArrayTable.Column',
            'x-component-props': {
              title: 'Price',
            },
            properties: {
              price: {
                type: 'number',
                default: 0,
                'x-decorator': 'Editable',
                'x-component': 'NumberPicker',
                'x-component-props': {
                  addonAfter: '$',
                },
              },
            },
          },
          column_4: {
            type: 'void',
            'x-component': 'ArrayTable.Column',
            'x-component-props': {
              title: 'Count',
            },
            properties: {
              count: {
                type: 'number',
                default: 0,
                'x-decorator': 'Editable',
                'x-component': 'NumberPicker',
                'x-component-props': {
                  addonAfter: '$',
                },
              },
            },
          },
          column_5: {
            type: 'void',
            'x-component': 'ArrayTable.Column',
            'x-component-props': {
              title: 'Total',
            },
            properties: {
              total: {
                type: 'number',
                'x-read-pretty': true,
                'x-decorator': 'FormItem',
                'x-component': 'NumberPicker',
                'x-component-props': {
                  addonAfter: '$',
                },
                'x-reactions': {
                  dependencies: ['.price', '.count'],
                  when: '{{$deps[0] && $deps[1]}}',
                  fulfill: {
                    state: {
                      value: '{{$deps[0] * $deps[1]}}',
                    },
                  },
                },
              },
            },
          },
          column_6: {
            type: 'void',
            'x-component': 'ArrayTable.Column',
            'x-component-props': {
              title: 'Operations',
            },
            properties: {
              item: {
                type: 'void',
                'x-component': 'FormItem',
                properties: {
                  remove: {
                    type: 'void',
                    'x-component': 'ArrayTable.Remove',
                  },
                  moveDown: {
                    type: 'void',
                    'x-component': 'ArrayTable.MoveDown',
                  },
                  moveUp: {
                    type: 'void',
                    'x-component': 'ArrayTable.MoveUp',
                  },
                },
              },
            },
          },
        },
      },
      properties: {
        add: {
          type: 'void',
          title: 'Add',
          'x-component': 'ArrayTable.Addition',
        },
      },
    },
    total: {
      type: 'number',
      title: 'Total',
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
      'x-component-props': {
        addonAfter: '$',
      },
      'x-pattern': 'readPretty',
      'x-reactions': {
        dependencies: ['.projects'],
        when: '{{$deps.length > 0}}',
        fulfill: {
          state: {
            value:
              '{{$deps[0].reduce((total,item)=>item.total ? total+item.total : total,0)}}',
          },
        },
      },
    },
  },
}

const schema4 = {
  type: 'object',
  properties: {
    username: {
      type: 'string',
      title: 'Username',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    name: {
      type: 'void',
      title: 'Name',
      'x-decorator': 'FormItem',
      'x-decorator-props': {
        asterisk: true,
        feedbackLayout: 'none',
      },
      'x-component': 'FormGrid',
      properties: {
        firstName: {
          type: 'string',
          required: true,
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          'x-component-props': {
            placeholder: 'firstName',
          },
        },
        lastName: {
          type: 'string',
          required: true,
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          'x-component-props': {
            placeholder: 'lastname',
          },
        },
      },
    },
    email: {
      type: 'string',
      title: 'Email',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-validator': 'email',
    },
    gender: {
      type: 'string',
      title: 'Gender',
      enum: [
        {
          label: 'male',
          value: 1,
        },
        {
          label: 'female',
          value: 2,
        },
        {
          label: 'third gender',
          value: 3,
        },
      ],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
    },
    birthday: {
      type: 'string',
      required: true,
      title: 'Birthday',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker',
    },
    address: {
      type: 'string',
      required: true,
      title: 'Address',
      'x-decorator': 'FormItem',
      'x-component': 'Cascader',
      'x-reactions': '{{fetchAddress}}',
    },
    idCard: {
      type: 'string',
      required: true,
      title: 'ID',
      'x-decorator': 'FormItem',
      'x-component': 'IDUpload',
    },
    contacts: {
      type: 'array',
      required: true,
      title: 'Contacts',
      'x-decorator': 'FormItem',
      'x-component': 'ArrayItems',
      items: {
        type: 'object',
        'x-component': 'ArrayItems.Item',
        properties: {
          sort: {
            type: 'void',
            'x-decorator': 'FormItem',
            'x-component': 'ArrayItems.SortHandle',
          },
          popover: {
            type: 'void',
            title: 'Contact Informations',
            'x-decorator': 'Editable.Popover',
            'x-component': 'FormLayout',
            'x-component-props': {
              layout: 'vertical',
            },
            'x-reactions': [
              {
                fulfill: {
                  schema: {
                    title: '{{$self.query(".name").value() }}',
                  },
                },
              },
            ],
            properties: {
              name: {
                type: 'string',
                title: 'Name',
                required: true,
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': {
                  style: {
                    width: 300,
                  },
                },
              },
              email: {
                type: 'string',
                title: 'Email',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-validator': [{ required: true }, 'email'],
                'x-component-props': {
                  style: {
                    width: 300,
                  },
                },
              },
              phone: {
                type: 'string',
                title: 'Phone Number',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-validator': [{ required: true }, 'phone'],
                'x-component-props': {
                  style: {
                    width: 300,
                  },
                },
              },
            },
          },
          remove: {
            type: 'void',
            'x-decorator': 'FormItem',
            'x-component': 'ArrayItems.Remove',
          },
        },
      },
      properties: {
        addition: {
          type: 'void',
          title: 'Add Contact',
          'x-component': 'ArrayItems.Addition',
        },
      },
    },
  },
}
const MyForm = (props: { values: any; onChange: (arg0: any) => void }) => {
  const form = useMemo(
    () =>
      createForm({
        values: props.values,
        effects: () => {
          onFormValuesChange((form) => {
            props.onChange(form.values)
          })
        },
      }),
    []
  )
  const count = useRef(1)

  useEffect(() => {
    form.setValues(props.values, 'overwrite')
  }, [JSON.stringify(props.values)])

  return (
    <Form form={form}>
      <SchemaField>
        <SchemaField.String
          name='input'
          x-decorator='FormItem'
          x-component='Input'
          x-component-props={{ placeholder: 'controlled target' }}
        />
      </SchemaField>
      Form component rendering times：{count.current++}
    </Form>
  )
}

export default () => {
  const [values, setValues] = useState({ input: '' })
  const count = useRef(1)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      form.setInitialValues({
        username: 'Aston Martin',
        firstName: 'Aston',
        lastName: 'Martin',
        email: 'aston_martin@aston.com',
        gender: 1,
        birthday: '1836-01-03',
        address: ['110000', '110000', '110101'],
        idCard: [
          {
            name: 'this is image',
            thumbUrl:
              'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            uid: 'rc-upload-1615825692847-2',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          },
        ],
        contacts: [
          {
            name: 'Zhang San',
            phone: '13245633378',
            email: 'zhangsan@gmail.com',
          },
          { name: 'Li Si', phone: '16873452678', email: 'lisi@gmail.com' },
        ],
      })
      setLoading(false)
    }, 2000)
  }, [])
  return (

    <div>
      <WinFormBuilder formId="633997bd41c18ddda81343dd"/>
    

      <Form form={form} labelCol={6} wrapperCol={10}>
        <SchemaField schema={schema} />
        <br />
        <hr />
        <SchemaField schema={schema1} />
        <code>
          <pre>
            <FormConsumer>
              {(form) => JSON.stringify(form.values, null, 2)}
            </FormConsumer>
          </pre>
        </code>
      </Form>
      <br />
      <hr />
      <div>
        <FormItem>
          <Input
            value={values.input}
            placeholder='controller'
            onChange={(event) => {
              setValues({ ...values, input: event.target.value })
            }}
          />
        </FormItem>
        <MyForm
          values={values}
          onChange={(values) => {
            setValues({ ...values })
          }}
        />
        root component rendering times: {count.current++}
      </div>
      <br />
      <hr />
      <Form form={form} layout='vertical'>
        <SchemaField schema={schema2} />
        <FormButtonGroup>
          <Submit onSubmit={console.log}>submit</Submit>
        </FormButtonGroup>
      </Form>
      <br />
      <hr />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          background: '#eee',
          padding: '40px 0',
        }}
      >
        <Card style={{ width: 400 }}>
          <Tabs style={{ overflow: 'visible', marginTop: -10 }}>
            <Tabs.TabPane key='1' tab='Password Login'>
              <Form
                form={normalForm}
                layout='vertical'
                size='large'
                onAutoSubmit={console.log}
              >
                <SchemaField schema={normalSchema} />
                <Submit block size='large'>
                  Log in
                </Submit>
              </Form>
            </Tabs.TabPane>
            <Tabs.TabPane key='2' tab='Mobile Login'>
              <Form
                form={phoneForm}
                layout='vertical'
                size='large'
                onAutoSubmit={console.log}
              >
                <SchemaField schema={phoneSchema} />
                <Submit block size='large'>
                  Log in
                </Submit>
              </Form>
            </Tabs.TabPane>
          </Tabs>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <a href='#Sign up'>Sign up</a>
            <a href='#Forgot password'>Forgot password?</a>
          </div>
        </Card>
      </div>
      <br />
      <hr />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          background: '#eee',
          padding: '40px 0',
        }}
      >
        <Card title='Edit User' style={{ width: 620 }}>
          <Spin spinning={loading}>
            <Form
              form={form}
              labelCol={5}
              wrapperCol={16}
              onAutoSubmit={console.log}
            >
              <SchemaField schema={schema4} />
              <FormButtonGroup.FormItem>
                <Submit block size='large'>
                  Submit
                </Submit>
              </FormButtonGroup.FormItem>
            </Form>
          </Spin>
        </Card>
      </div>
      <br />
      <hr />
    </div>
  )
}
