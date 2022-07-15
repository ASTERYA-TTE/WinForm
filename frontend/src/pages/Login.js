import React from 'react'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { Button } from 'primereact/button'

export const Login = () => {
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
        <div className='login-panel'>
          <div className='login-form' style={{ marginTop: '300px' }}>
            <h2>Login</h2>
            <p>
              Already have an account? <a href='/'>Login</a>
            </p>
            <InputText placeholder='Full Name' />
            <InputText placeholder='Email' />
            <Password placeholder='Password' />
            <Button label='CONTINUE' type='button'></Button>
          </div>
          <p>
            A problem? <a href='/'>Click here</a> and let us help you.
          </p>
        </div>
      </div>
    </div>
  )
}
