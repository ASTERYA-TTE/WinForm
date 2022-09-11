import React from 'react'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { Button } from 'primereact/button'
import { Link } from 'react-router-dom'

const UserLogin = () => {
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
              <i className='pi pi-github'></i>
              <i className='pi pi-twitter'></i>
            </div>
          </div>
        </div>
        <div className='login-panel ' style={{ marginTop: '300px' }}>
          <div className='login-form'>
            <div className='login-panel-mobil'>
              <h3 style={{ marginTop: '-300px' }}>Winform</h3>
            </div>
            <p style={{ color: ' #1976d2' }}>Login</p>
            <InputText placeholder='Email' />
            <Password placeholder='Password' />
            <Link to='/app'>
              <Button label='CONTINUE' type='button'></Button>
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

export default UserLogin
