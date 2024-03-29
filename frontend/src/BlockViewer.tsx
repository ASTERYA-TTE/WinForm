import React, { useState } from 'react'
import { classNames } from 'primereact/utils'
import AppCodeHighlight from './AppCodeHighlight'

const BlockViewer = (props: {
  code: string
  header: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal
  new: any
  containerClassName: string
  previewStyle: React.CSSProperties
  children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal
}) => {
  const [blockView, setBlockView] = useState('PREVIEW')

  const copyCode = async (event: { preventDefault: () => void }) => {
    await navigator.clipboard.writeText(props.code)
    event.preventDefault()
  }

  return (
    <div className='block-viewer'>
      <div className='block-section'>
        <div className='block-header'>
          <span className='block-title'>
            <span>{props.header}</span>
            {props.new && <span className='badge-new'>New</span>}
          </span>
          <div className='block-actions'>
            <button
              tabIndex={0}
              className={classNames('p-link', {
                'block-action-active': blockView === 'PREVIEW',
              })}
              onClick={() => setBlockView('PREVIEW')}
            >
              <span>Preview</span>
            </button>
            <button
              className={classNames('p-link', {
                'block-action-active': blockView === 'CODE',
              })}
              style={{ color: 'var(--menu-text-color)' }}
              onClick={() => setBlockView('CODE')}
            >
              <span>Code</span>
            </button>
            <button
              tabIndex={0}
              className='p-link block-action-copy'
              onClick={copyCode}
            >
              <i className='pi pi-copy'></i>
            </button>
          </div>
        </div>
        <div className='block-content'>
          {blockView === 'PREVIEW' && (
            <div
              className={props.containerClassName}
              style={props.previewStyle}
            >
              {props.children}
            </div>
          )}

          {blockView === 'CODE' && (
            <AppCodeHighlight>{props.code}</AppCodeHighlight>
          )}
        </div>
      </div>
    </div>
  )
}

export default BlockViewer
