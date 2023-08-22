import './style.css'
import { CloseIcon } from 'src/assets/svg';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddToBlacklist } from 'src/Redux/action/user_action';
import { CButton, CCol, CForm, CFormInput, CInputGroup } from '@coreui/react';

const AddBlacklist = ({ open, setOpen, user_id }) => {
    const dispatch = useDispatch()
    const [date, setDate] = useState('')
    const [validated, setValidated] = useState(false)
    const userIsBlacklisted = useSelector(st => st.User_reducer.userIsBlacklisted)

    const handleSubmit = (event) => {
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        } else {
            dispatch(AddToBlacklist(user_id, date))
        }
        setValidated(true)
    }

    function close() {
        setOpen(false)
    }

    useEffect(() => {
        if (userIsBlacklisted) {
            setDate('')
            setOpen(false)
        }
    }, [userIsBlacklisted])

    return (
        <div className={open ? 'activePopup' : 'inactive'}>
            <div className='pop' style={{ width: '600px' }}>
                <div className='close' onClick={close}>
                    <CloseIcon />
                </div>
                <CForm
                    className="row g-3 needs-validation"
                    noValidate
                    validated={validated}
                    onSubmit={handleSubmit}
                >
                    <h5>Выберите дату, до которой вы хотите добавить этого пользователя в черный список</h5>
                    <CInputGroup className="has-validation m-1">
                        <CFormInput
                            aria-describedby="inputGroup-sizing-default"
                            id="inputGroupPrepend02"
                            required
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </CInputGroup>
                    <CCol xs={12} className="position-relative">
                        <CButton color="primary" type="submit">
                            Добавить
                        </CButton>
                    </CCol>
                </CForm>
            </div>
        </div>
    )
}

export default AddBlacklist;