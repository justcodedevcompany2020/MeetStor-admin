import './style.css'
import { useState } from 'react'
import { CloseIcon } from 'src/assets/svg'
import { CButton, CCol, CForm, CFormInput, CInputGroup } from '@coreui/react'

const EditGift = ({ open, setOpen, gift_id, setNewGift }) => {
    const token = localStorage.getItem('token')
    const [price, setPrice] = useState('')
    const [validated, setValidated] = useState(false)

    const handleSubmit = (event) => {
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        } else {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);

            let formdata = new FormData();
            formdata.append("gift_id", gift_id);
            formdata.append("price", price);

            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            fetch("https://socnetworkbackend.justcode.am/api/admin/update_gift", requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log(result)
                    if (result.status) {
                        setNewGift(new Date())
                        setPrice('')
                        setOpen(false)
                    }
                })
                .catch(error => console.log('error', error));
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
                    <h5>Укажите новую цену</h5>
                    <CInputGroup className="has-validation m-1">
                        <CFormInput
                            required
                            value={price}
                            type='number'
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </CInputGroup>
                    <CCol xs={12} className="position-relative">
                        <CButton color="primary" type="submit">
                            Обновить
                        </CButton>
                    </CCol>
                </CForm>
            </div>
        </div>
    )
}

export default EditGift