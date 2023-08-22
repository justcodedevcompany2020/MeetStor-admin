import './style.css'
import React, { useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCol,
  CForm,
  CFormInput,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux'
import { GetUsers } from 'src/Redux/action/user_action'

const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector(st => st.User_reducer.users)

  useEffect(() => {
    getUsers()
  }, [])

  function getUsers(search) {
    dispatch(GetUsers(search))
  }

  return (
    <>
      <CForm className="row g-3" style={{ marginBottom: '20px' }}>
        <CCol xs="auto">
          <CFormInput id="inputPassword2" placeholder="Поиск" onChange={(e) => getUsers(e.target.value)}
          />
        </CCol>
      </CForm>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardBody>
              <CTable hover>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell className='thw' scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell className='thw' scope="col">Аватар</CTableHeaderCell>
                    <CTableHeaderCell className='thw' scope="col">Имя</CTableHeaderCell>
                    <CTableHeaderCell className='thw' scope="col">Пол</CTableHeaderCell>
                    <CTableHeaderCell className='thw' scope="col">Телефон</CTableHeaderCell>
                    <CTableHeaderCell className='thw' scope="col">Дата рождения</CTableHeaderCell>
                    <CTableHeaderCell className='thw' scope="col">Страна</CTableHeaderCell>
                    <CTableHeaderCell className='thw' scope="col">Город</CTableHeaderCell>
                    <CTableHeaderCell className='thw' scope="col">Семейное положение</CTableHeaderCell>
                    <CTableHeaderCell className='thw' scope="col">Дети</CTableHeaderCell>
                    <CTableHeaderCell className='thw' scope="col">Образование</CTableHeaderCell>
                    <CTableHeaderCell className='thw' scope="col">Специализация</CTableHeaderCell>
                    <CTableHeaderCell className='thw' scope="col">Обо мне</CTableHeaderCell>
                    <CTableHeaderCell className='thw' scope="col">Рост</CTableHeaderCell>
                    <CTableHeaderCell className='thw' scope="col">Вес</CTableHeaderCell>
                    <CTableHeaderCell className='thw' scope="col">Телосложение</CTableHeaderCell>
                    <CTableHeaderCell className='thw' scope="col">Цвет глаз</CTableHeaderCell>
                    <CTableHeaderCell className='thw' scope="col">Цвет волос</CTableHeaderCell>
                    <CTableHeaderCell className='thw' scope="col">Татуировки, пирсинг</CTableHeaderCell>
                    <CTableHeaderCell className='thw' scope="col">Познакомлюсь</CTableHeaderCell>
                    <CTableHeaderCell className='thw' scope="col">Цель знакомства</CTableHeaderCell>
                    <CTableHeaderCell className='thw' scope="col">Баланс</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {users?.data?.length ? users?.data?.map((e, i) => (
                    <CTableRow key={i} onClick={() => window.location = `/#/user/${e?.id}`}>
                      <CTableHeaderCell scope="row">{i + 1}</CTableHeaderCell>
                      <CTableDataCell><img className='userAvatar' alt='' src={`${process.env.REACT_APP_IMAGE}/${e?.avatar}`} /></CTableDataCell>
                      <CTableDataCell>{e?.name}</CTableDataCell>
                      <CTableDataCell>{e?.gender}</CTableDataCell>
                      <CTableDataCell>{e?.phone}</CTableDataCell>
                      <CTableDataCell>{e?.date_of_birth}</CTableDataCell>
                      <CTableDataCell>{e?.country_id}</CTableDataCell>
                      <CTableDataCell>{e?.city_id}</CTableDataCell>
                      <CTableDataCell>{e?.family_status}</CTableDataCell>
                      <CTableDataCell>{e?.children}</CTableDataCell>
                      <CTableDataCell>{e?.education}</CTableDataCell>
                      <CTableDataCell>{e?.specialization}</CTableDataCell>
                      <CTableDataCell>{e?.about_me}</CTableDataCell>
                      <CTableDataCell>{e?.height}</CTableDataCell>
                      <CTableDataCell>{e?.weight}</CTableDataCell>
                      <CTableDataCell>{e?.body_type}</CTableDataCell>
                      <CTableDataCell>{e?.eye_color}</CTableDataCell>
                      <CTableDataCell>{e?.hair_color}</CTableDataCell>
                      <CTableDataCell>{e?.tattoos_piercings}</CTableDataCell>
                      <CTableDataCell>{e?.get_acquainted}</CTableDataCell>
                      <CTableDataCell>{e?.purpose_of_dating}</CTableDataCell>
                      <CTableDataCell>{e?.balance}</CTableDataCell>
                    </CTableRow>
                  ))
                    : <div>
                      <span>Нет данных</span>
                    </div>
                  }
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Users