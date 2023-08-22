import { CButton, CCol, CForm, CFormInput, CFormLabel, CFormSelect, CInputGroup, CInputGroupText } from '@coreui/react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteModerator, GetSingleModerator, UpdateModerator } from 'src/Redux/action/moderator_action';

const SingleModerator = () => {
    const dispatch = useDispatch()
    const singleModerator = useSelector(st => st.Moderator_reducer.singleModerator)
    const [validated, setValidated] = useState(false)
    const [userId, setUserId] = useState('')
    const [details, setDetails] = useState({
        name: '',
        gender: '',
        phone: '',
        dateOfBirth: '',
        password: '',
    })

    useEffect(() => {
        const href = window.location.href.split('/')
        setUserId(href[href.length - 1])
        dispatch(GetSingleModerator(href[href.length - 1]))
    }, [])

    useEffect(() => {
        if (singleModerator) {
            setDetails({
                name: singleModerator?.name,
                gender: singleModerator?.gender,
                phone: singleModerator?.phone,
                dateOfBirth: singleModerator?.date_of_birth,
                password: '',
            })
        }
    }, [singleModerator])

    const handleSubmit = (event) => {
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        } else {
            let data = {
                user_id: userId,
                name: details.name,
                gender: details.gender,
                phone: details.phone,
                date_of_birth: details.dateOfBirth,
            }
            if (details.password.length) {
                data = {
                    ...data,
                    password: details.password
                }
            }
            dispatch(UpdateModerator(data))
        }
        setValidated(true)
    }

    const deleteModerator = () => {
        const agree = confirm('Вы уверены, что хотите удалить этого модератора?')
        if (agree) {
            dispatch(DeleteModerator(userId))
        }
    }

    return (
        <>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end" style={{ marginBottom: '20px' }} onClick={deleteModerator}>
                <CButton color="danger">Удалить</CButton>
            </div>
            <CForm
                className="row g-3 needs-validation"
                noValidate
                validated={validated}
                onSubmit={handleSubmit}
            >
                <CInputGroup className="has-validation m-1">
                    <CInputGroupText id="inputGroupPrepend00">Имя</CInputGroupText>
                    <CFormInput
                        aria-describedby="inputGroup-sizing-default"
                        type="text"
                        id="validationDefault02"
                        required
                        value={details.name}
                        onChange={(e) => setDetails({ ...details, name: e.target.value })}
                    />
                </CInputGroup>
                <CInputGroup className="has-validation m-1">
                    <CInputGroupText component="label" htmlFor="inputGroupSelect01">Пол</CInputGroupText>
                    <CFormSelect
                        id="inputGroupPrepend01"
                        required
                        aria-describedby="inputGroup-sizing-default"
                        type="text"
                        value={details.gender}
                        onChange={(e) => setDetails({ ...details, gender: e.target.value })}
                    >
                        <option value=''>Выбирать...</option>
                        <option value="1">Мужской</option>
                        <option value="2">Женский</option>
                    </CFormSelect>
                </CInputGroup>
                <CInputGroup className="has-validation m-1">
                    <CInputGroupText id="inputGroupPrepend02">Телефон</CInputGroupText>
                    <CFormInput
                        aria-describedby="inputGroup-sizing-default"
                        id="inputGroupPrepend02"
                        required
                        type="text"
                        value={details.phone}
                        onChange={(e) => setDetails({ ...details, phone: e.target.value })}
                    />
                </CInputGroup>
                <CInputGroup className="has-validation m-1">
                    <CInputGroupText id="inputGroupPrepend02">Дата рождения</CInputGroupText>
                    <CFormInput
                        aria-describedby="inputGroup-sizing-default"
                        id="inputGroupPrepend02"
                        required
                        type="date"
                        value={details.dateOfBirth}
                        onChange={(e) => setDetails({ ...details, dateOfBirth: e.target.value })}
                    />
                </CInputGroup>
                <CInputGroup className="has-validation m-1">
                    <CInputGroupText id="inputGroupPrepend02">Пароль</CInputGroupText>
                    <CFormInput
                        aria-describedby="inputGroup-sizing-default"
                        id="inputGroupPrepend03"
                        type="text"
                        value={details.password}
                        onChange={(e) => setDetails({ ...details, password: e.target.value })}
                        minLength={8}
                    />
                </CInputGroup>
                <CCol xs={12} className="position-relative">
                    <CButton color="primary" type="submit">
                        Сохранить
                    </CButton>
                </CCol>
            </CForm>
        </>
    )
}

export default SingleModerator