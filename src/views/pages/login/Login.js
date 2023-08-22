import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser, cibEyeem } from '@coreui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { AuthLogin } from 'src/Redux/action/auth_action'
import { ClosedEye, OpenEye } from 'src/assets/svg'

const Login = () => {
  const dispatch = useDispatch()
  const loginError = useSelector(st => st.Auth_reducer.loginError)
  const [phone, setphone] = useState('+')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleInputChange = (e) => {
    const inputValue = e.target.value
    if (/^\+?\d*$/.test(inputValue)) {
      setphone(inputValue)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Backspace' && e.target.selectionStart === 0) {
      e.preventDefault();
    } else if (e.key === 'Enter') {
      login()
    }
  }

  function login() {
    // +37493073584
    // 11111111
    dispatch(AuthLogin({ phone, password }))
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Вход</h1>
                    <p className="text-medium-emphasis">Войдите в свой аккаунт</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Телефон"
                        value={phone.startsWith('+') ? phone : '+' + phone}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                      />
                    </CInputGroup>
                    <CInputGroup
                      className="mb-4"
                    >
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type={showPassword ? 'text' : "password"}
                        placeholder="Пароль"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        onKeyDown={e => { e.key === 'Enter' && login() }}
                      />
                      <CInputGroupText onClick={() => setShowPassword(!showPassword)} style={{ cursor: 'pointer' }}>
                        {showPassword ? <OpenEye /> : <ClosedEye />}
                      </CInputGroupText>
                    </CInputGroup>
                    {loginError && (
                      <>
                        <span style={{ color: 'red' }}>
                          Неверный логин или пароль
                        </span>
                        <br /> <br />
                      </>
                    )}
                    <CRow>
                      <CCol xs={6}>
                        <CButton
                          color="primary"
                          className="px-4"
                          onClick={login}
                          disabled={!phone.length || !password.length}
                        >
                          Вход
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Забыли пароль?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
