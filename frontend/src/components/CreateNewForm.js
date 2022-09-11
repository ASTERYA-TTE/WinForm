import { Button } from 'primereact/button'
import React from 'react'
import { Link } from 'react-router-dom'
import './Dashboard/Dashboard.css'
function CreateNewForm() {
  return (
    <div>
      <div>
        <div className='grid mt-8 md:w-auto h-24rem'>
          <div className='col-4 create-form-destop'>
            <div
              className='col '
              style={{
                alignItems: 'center',
                backgroundColor: '#c8ceed',
                border: '2px solid transparent',
                borderRadius: '10px',
                height: '100%',
                width: '100%',
              }}
            ></div>
          </div>

          <div className='col-4 create-form-destop'>
            {' '}
            <Link to='/edit'>
              <div
                className='col '
                style={{
                  alignItems: 'center',
                  backgroundColor: 'whitesmoke',
                  border: '2px solid transparent',
                  borderRadius: '10px',
                  borderRightColor: 'white',
                  height: '100%',
                  width: '100%',
                  justifyContent: 'center',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: '70%',
                    height: '70%',
                    marginLeft: '70px',
                  }}
                  className='mt-6'
                >
                  <svg
                    viewBox='0 0 1024 1024'
                    style={{ backgroundColor: 'white' }}
                  >
                    <path
                      d='M381.6 864H162.4c-6.9 0-12.4 4.6-12.4 10.3v19.3c0 5.7 5.6 10.3 12.4 10.3h219.1c6.8 0 12.4-4.6 12.4-10.3v-19.3c0.1-5.7-5.5-10.3-12.3-10.3zM382 780.6H162c-6.9 0-12.5 4.6-12.5 10.3v19.3c0 5.7 5.6 10.3 12.5 10.3h220c6.9 0 12.5-4.6 12.5-10.3v-19.3c0-5.7-5.6-10.3-12.5-10.3zM162.4 737.2h219.1c6.8 0 12.4-4.6 12.4-10.3v-19.3c0-5.7-5.6-10.3-12.4-10.3H162.4c-6.9 0-12.4 4.6-12.4 10.3v19.3c0 5.7 5.6 10.3 12.4 10.3z'
                      fill='#C8C8E3'
                    />
                    <path
                      d='M977.1 0H46.9C21 0 0 21 0 46.9v930.2c0 25.9 21 46.9 46.9 46.9h930.2c25.9 0 46.9-21 46.9-46.9V46.9C1024 21 1003 0 977.1 0z m-18.7 911.6c0 25.9-21 46.9-46.9 46.9H112.4c-25.9 0-46.9-21-46.9-47V112.4c0-25.9 21-46.9 46.9-46.9h799.1c25.9 0 46.9 21 46.9 46.9v799.2z'
                      fill='#c8ceed'
                    />
                    <path
                      d='M207.9 342.7h608.2c32 0 57.9-25.9 57.9-57.9v-83c0-32-25.9-57.9-57.9-57.9H207.9c-32 0-57.9 25.9-57.9 57.9v83c0 32 25.9 57.9 57.9 57.9zM200 201.8c0-4.4 3.5-7.9 7.9-7.9h608.2c4.4 0 7.9 3.5 7.9 7.9v83c0 4.4-3.5 7.9-7.9 7.9H207.9c-4.4 0-7.9-3.5-7.9-7.9v-83zM806.4 405.7h-277c-37.3 0-67.6 30.2-67.6 67.6v363.2c0 37.3 30.2 67.6 67.6 67.6h277c37.3 0 67.6-30.2 67.6-67.6V473.3c0-37.4-30.2-67.6-67.6-67.6zM824 836.4c0 9.7-7.9 17.6-17.6 17.6h-277c-9.7 0-17.6-7.9-17.6-17.6V473.3c0-9.7 7.9-17.6 17.6-17.6h277c9.7 0 17.6 7.9 17.6 17.6v363.1zM272 649.7c67.4 0 122-54.6 122-122s-54.6-122-122-122-122 54.6-122 122 54.6 122 122 122z m0-204c45.2 0 82 36.8 82 82s-36.8 82-82 82-82-36.8-82-82 36.8-82 82-82z'
                      fill='#C8C8E3'
                    />
                  </svg>
                  <svg
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 162 204'
                    width='120'
                    height='147'
                    display={{}}
                    style={{ marginLeft: '-150px', marginTop: '120px' }}
                  >
                    <circle cx='118' cy='156' r='35' fill='#09F'></circle>
                    <path
                      d='M118.5 174c.82 0 1.367-.269 1.914-.806l13.637-13.393a2.682 2.682 0 10-3.759-3.828l-9.058 8.896v-25.135a2.734 2.734 0 10-5.468 0v25.135l-9.058-8.896a2.682 2.682 0 10-3.759 3.828l13.637 13.393c.547.537 1.094.806 1.914.806z'
                      fill='#fff'
                    ></path>
                  </svg>
                </div>
                <br />
                <h3 style={{ marginLeft: '100px' }}>
                  <b>Use Designable Template</b>
                </h3>
              </div>
            </Link>
          </div>
          <div className='col-4 create-form-destop'>
            {' '}
            <div
              className='col'
              style={{
                backgroundColor: '#c8ceed',
                border: '2px solid transparent',
                borderRadius: '10px',
                height: '100%',
                width: '100%',
              }}
            ></div>
          </div>
        </div>
      </div>
      <div>
        <div className='grid mt-8 md:w-auto h-24rem'>
          <div className='col-4 create-form-mobil'>
            <div
              className='col '
              style={{
                alignItems: 'center',
                backgroundColor: '#c8ceed',
                border: '2px solid transparent',
                borderRadius: '10px',
                height: '100%',
                width: '100%',
              }}
            ></div>
          </div>

          <div className='col-4 create-form-mobil'>
            {' '}
            <Link to='/edit'>
              <div
                className='col '
                style={{
                  alignItems: 'center',
                  backgroundColor: '#c8ceed',
                  border: '2px solid transparent',
                  borderRadius: '10px',
                  height: '100%',
                  width: '100%',
                }}
              >
                <h3
                  style={{ display: 'flex', justifyContent: 'center' }}
                  className='mt-8'
                >
                  <b>Use Designable Template</b>
                </h3>
              </div>
            </Link>
          </div>
          <div className='col-4 create-form-mobil'>
            {' '}
            <div
              className='col'
              style={{
                backgroundColor: '#c8ceed',
                border: '2px solid transparent',
                borderRadius: '10px',
                height: '100%',
                width: '100%',
              }}
            >
              <svg
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 162 204'
                class='jfWizard-list-item-icon-svg'
                width='120'
                height='147'
                display={{}}
              >
                <rect width='162' height='204' rx='4' fill='#fff'></rect>
                <rect
                  x='9'
                  y='9'
                  width='144'
                  height='46'
                  rx='4'
                  fill='#C8C8E3'
                ></rect>
                <rect
                  x='9'
                  y='90'
                  width='144'
                  height='14'
                  rx='7'
                  fill='#C8C8E3'
                ></rect>
                <rect
                  x='9'
                  y='137'
                  width='60'
                  height='14'
                  rx='7'
                  fill='#C8C8E3'
                ></rect>
                <rect
                  x='9'
                  y='67'
                  width='144'
                  height='14'
                  rx='7'
                  fill='#E6E6F5'
                ></rect>
                <rect
                  x='9'
                  y='114'
                  width='60'
                  height='14'
                  rx='7'
                  fill='#E6E6F5'
                ></rect>
                <circle cx='118' cy='156' r='35' fill='#09F'></circle>
                <path
                  d='M118.5 174c.82 0 1.367-.269 1.914-.806l13.637-13.393a2.682 2.682 0 10-3.759-3.828l-9.058 8.896v-25.135a2.734 2.734 0 10-5.468 0v25.135l-9.058-8.896a2.682 2.682 0 10-3.759 3.828l13.637 13.393c.547.537 1.094.806 1.914.806z'
                  fill='#fff'
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateNewForm
