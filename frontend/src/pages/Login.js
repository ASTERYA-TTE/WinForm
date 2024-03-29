import React, { useState } from 'react'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { Button } from 'primereact/button'
import { Link } from 'react-router-dom'

const Login = () => {
  const [login, setLogin] = useState(true)
  return (
    <div className='login-body'>
      <div className='login-wrapper'>
        <div className='login-image'>
          <div className='login-image-content' style={{ marginTop: '300px' }}>
            <h1>Winform</h1>
            <h1>Hesabınıza</h1>
            <h1>Giriş Yapın </h1>
            <h3>
              Yeni Nesil Form Oluşturma Uygulaması
              <br />
              Basit ve kullanıcı dostu form ile birkaç tıklamayla
              <br />
              İhtiyacınıza göre çeşitli online örnek formları kullanın. <br />
              <br />
            </h3>
          </div>
          <div className='image-footer'>
            <p>Winform</p>
            <div className='icons'>
              <a href='http://github.com/ASTERYA-TTE/WinForm/tree/main/frontend'>
                <i className='pi pi-github'></i>
              </a>

              <i className='pi pi-twitter'></i>
            </div>
          </div>
        </div>
        <div className='login-panel ' style={{ marginTop: '300px' }}>
          <div className='login-form'>
            <div className='login-panel-mobil'>
              <h3 style={{ marginTop: '-300px' }}>Winform</h3>
            </div>

            <p>
              Already have an account? <a href='/userlogin'>Login</a>
            </p>
            <InputText placeholder='Full Name' />
            <InputText placeholder='Email' />
            <Password placeholder='Password' />
            <Link to='/home'>
              {login && <Button label='CONTINUE' type='button'></Button>}
            </Link>
          </div>
          <p>
            A problem? <a href='/'>Click here</a> and let us help you.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
