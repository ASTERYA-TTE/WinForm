import { Button, Modal } from 'antd'
import React, { useRef, useState } from 'react'
import Draggable from 'react-draggable'

function CreateNewFolderModal() {
  const [visible, setVisible] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  })
  const draggleRef = useRef(null)

  const showModal = () => {
    setVisible(true)
  }

  const handleOk = (e) => {
    console.log(e)
    setVisible(false)
  }

  const handleCancel = (e) => {
    console.log(e)
    setVisible(false)
  }

  const onStart = (_event, uiData) => {
    const { clientWidth, clientHeight } = window.document.documentElement
    const targetRect = draggleRef.current?.getBoundingClientRect()

    if (!targetRect) {
      return
    }

    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    })
  }
  return (
    <div>
      <Button onClick={showModal}>Open Draggable Modal</Button>
      <Modal
        title={
          <div
            style={{
              width: '100%',
              cursor: 'move',
            }}
            onMouseOver={() => {
              if (disabled) {
                setDisabled(false)
              }
            }}
            onMouseOut={() => {
              setDisabled(true)
            }}
            onFocus={() => {}}
            onBlur={() => {}} // end
          ></div>
        }
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        modalRender={(modal) => (
          <Draggable
            disabled={disabled}
            bounds={bounds}
            onStart={(event, uiData) => onStart(event, uiData)}
          >
            <div ref={draggleRef}>{modal}</div>
          </Draggable>
        )}
      >
        <div className='input-modal-header'>
          <div className='input-modal-header-title icon-addNewFolder'>
            Add New Folder
          </div>
        </div>
        <div className='input-modal-content'>
          <label className='input-modal-content-label'>Folder Name</label>
          <input
            id='input-modal-content-input'
            className='input-modal-content-input'
            placeholder='Add folder name here'
          />
        </div>
      </Modal>
    </div>
  )
}

export default CreateNewFolderModal
