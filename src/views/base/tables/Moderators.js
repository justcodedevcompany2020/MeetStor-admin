import './style.css'
import React, { useEffect } from 'react'
import {
  CButton,
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
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetModerators } from 'src/Redux/action/moderator_action'
import CreateModerator from 'src/components/popup/createModerator'

const Moderators = () => {
  const dispatch = useDispatch()
  const newModerator = useSelector(st => st.Moderator_reducer.newUser)
  const moderators = useSelector(st => st.Moderator_reducer.moderators)
  const [openCreate, setOpenCreate] = useState(false)

  useEffect(() => {
    getModerators()
  }, [])

  useEffect(() => {
    newModerator && getModerators()
  }, [newModerator])

  function getModerators(search) {
    dispatch(GetModerators(search))
  }

  function addModerator() {
    setOpenCreate(true)
  }

  return (
    <>
      <CForm className="row g-3">
        <CCol xs="auto">
          <CFormInput id="inputPassword2" placeholder="Поиск" onChange={(e) => getModerators(e.target.value)} />
        </CCol>
      </CForm>
      <div className="d-grid gap-2 d-md-flex justify-content-md-end" style={{ marginBottom: '10px' }}>
        <CButton color="primary" className="me-md-2" onClick={addModerator}>+ Add Moderator</CButton>
      </div>
      <CreateModerator
        open={openCreate}
        setOpen={setOpenCreate}
      />
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardBody>
              <CTable hover>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell className='thw' scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell className='thw' scope="col">Имя</CTableHeaderCell>
                    <CTableHeaderCell className='thw' scope="col">Пол</CTableHeaderCell>
                    <CTableHeaderCell className='thw' scope="col">Телефон</CTableHeaderCell>
                    <CTableHeaderCell className='thw' scope="col">Дата рождения</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {moderators?.data?.length ? moderators?.data?.map((e, i) => (
                    <CTableRow key={i} onClick={() => window.location = `/#/moderator/${e?.id}`}>
                      <CTableHeaderCell scope="row">{i + 1}</CTableHeaderCell>
                      <CTableDataCell>{e?.name}</CTableDataCell>
                      <CTableDataCell>{e?.gender}</CTableDataCell>
                      <CTableDataCell>{e?.phone}</CTableDataCell>
                      <CTableDataCell>{e?.date_of_birth}</CTableDataCell>
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

export default Moderators