import React from 'react'
import './Dashboard/Dashboard.css'
function FormLayoutDemo() {
  return (
    <div style={{ marginTop: '400px' }}>
      <div className='lsApp-noForms noForms trash'>
        <div className='lsApp-noForms-icon'>
          <div className='lsApp-noForms-icon-tip'>
            <svg
              className='lsApp-noForms-icon-tip-arrow'
              xmlns='http://www.w3.org/2000/svg'
              width='12'
              height='14'
              fill='none'
              viewBox='0 0 12 14'
            >
              <path
                fill='currentColor'
                d='M6.822.822a1 1 0 00-1.397 0L.707 5.432a1 1 0 00-.085 1.336l4.718 5.95a1 1 0 001.567 0l4.718-5.95a1 1 0 00-.085-1.337L6.822.821z'
              ></path>
            </svg>
          </div>
        </div>
        <div className='lsApp-noForms-text isPrimary'>
          YOU DON'T HAVE ANY DELETED FORMS YET!
        </div>
        <p className='lsApp-noForms-text isSecondary'>
          Your deleted forms will appear here.
        </p>
        <div className='lsApp-noForms-actionButtons'></div>
      </div>
    </div>
  )
}

export default FormLayoutDemo
