import './style.css'
import { CloseIcon } from 'src/assets/svg';
import { CButton, CCol, CForm, CFormInput, CFormLabel, CFormSelect, CInputGroup, CInputGroupText } from '@coreui/react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CreateModerators } from 'src/Redux/action/moderator_action';

const CreateModerator = ({ open, setOpen }) => {
    const dispatch = useDispatch()
    const newModerator = useSelector(st => st.Moderator_reducer.newUser)
    const errors = useSelector(st => st.Moderator_reducer)

    const [validated, setValidated] = useState(false)
    const [details, setDetails] = useState({
        name: '',
        gender: '',
        phone: '',
        dateOfBirth: '',
        password: '',
        passwordConfirmation: ''
    })

    useEffect(() => {
        if (newModerator) {
            setDetails({
                name: '',
                gender: '',
                phone: '',
                dateOfBirth: '',
                password: '',
                passwordConfirmation: ''
            })
            close()
        }
    }, [newModerator])

    const handleSubmit = (event) => {
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        } else {
            dispatch(CreateModerators(details.name, details.dateOfBirth, details.phone, details.password, details.passwordConfirmation, details.gender))
        }
        setValidated(true)
    }

    function close() {
        setOpen(false)
    }

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
                    <CInputGroup className="has-validation m-1">
                        <CInputGroupText id="inputGroupPrepend00">Name</CInputGroupText>
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
                        <CInputGroupText component="label" htmlFor="inputGroupSelect01">Gender</CInputGroupText>
                        <CFormSelect
                            id="inputGroupPrepend01"
                            required
                            aria-describedby="inputGroup-sizing-default"
                            type="text"
                            value={details.gender}
                            onChange={(e) => setDetails({ ...details, gender: e.target.value })}
                        >
                            <option value=''>Choose...</option>
                            <option value="1">Male</option>
                            <option value="2">Female</option>
                        </CFormSelect>
                    </CInputGroup>
                    <CInputGroup className="has-validation m-1">
                        <CInputGroupText id="inputGroupPrepend02">Phone</CInputGroupText>
                        <CFormInput
                            aria-describedby="inputGroup-sizing-default"
                            id="inputGroupPrepend02"
                            required
                            type="text"
                            value={details.phone}
                            onChange={(e) => setDetails({ ...details, phone: e.target.value })}
                        />
                    </CInputGroup>
                    {errors.phoneError &&
                        <CInputGroup className="has-validation m-1">
                            <span style={{ color: 'red' }}>The phone has already been taken.</span>
                        </CInputGroup>
                    }
                    <CInputGroup className="has-validation m-1">
                        <CInputGroupText id="inputGroupPrepend02">Date of birth</CInputGroupText>
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
                        <CInputGroupText id="inputGroupPrepend02">Password</CInputGroupText>
                        <CFormInput
                            aria-describedby="inputGroup-sizing-default"
                            id="inputGroupPrepend03"
                            required
                            type="text"
                            value={details.password}
                            onChange={(e) => setDetails({ ...details, password: e.target.value })}
                            minLength={8}
                        />
                    </CInputGroup>
                    <CInputGroup className="has-validation m-1">
                        <CInputGroupText id="inputGroupPrepend02">Password confirmation</CInputGroupText>
                        <CFormInput
                            aria-describedby="inputGroup-sizing-default"
                            id="inputGroupPrepend04"
                            required
                            type="text"
                            value={details.passwordConfirmation}
                            onChange={(e) => setDetails({ ...details, passwordConfirmation: e.target.value })}
                            minLength={8}
                        />
                    </CInputGroup>
                    {errors.passwordError &&
                        <CInputGroup className="has-validation m-1">
                            <span style={{ color: 'red' }}>The password confirmation field must match password.</span>
                        </CInputGroup>
                    }
                    <CCol xs={12} className="position-relative">
                        <CButton color="primary" type="submit">
                            Submit form
                        </CButton>
                    </CCol>
                </CForm>
            </div>
        </div>
    )
}

export default CreateModerator;