import './style.css'
import { CloseIcon } from 'src/assets/svg'
import { CButton, CCol, CForm, CFormInput } from '@coreui/react'
import { useState } from 'react'

const CreateGift = ({ open, setOpen, setNewGift }) => {
    const token = localStorage.getItem('token')
    const [validated, setValidated] = useState(false)
    const [photo, setPhoto] = useState()
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')

    const handleSubmit = (event) => {
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        } else {
            const myHeaders = new Headers()
            myHeaders.append("Authorization", `Bearer ${token}`)

            let formdata = new FormData()
            formdata.append("photo", photo)
            formdata.append("name", name)
            formdata.append("price", price)

            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            }
            fetch(`${process.env.REACT_APP_HOSTNAME}/admin/create_new_gift`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    if (result.status) {
                        setNewGift(new Date())
                        setPhoto('')
                        setName('')
                        setPrice('')
                        setOpen(false)
                    }
                })
                .catch(error => console.log('error', error))
        }
        setValidated(true)
    }

    function handleImageChange(event) {
        setPhoto(event.target.files[0])
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
                    <CFormInput
                        type="file"
                        label="Выбрать изображение"
                        onChange={handleImageChange}
                    />
                    <CFormInput
                        type="text"
                        label="Выберите имя"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <CFormInput
                        type="number"
                        label="Выберите цену"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <CCol xs={12} className="position-relative">
                        <CButton color="primary" type="submit">
                            Создать
                        </CButton>
                    </CCol>
                </CForm>
            </div>
        </div>
    )
}

export default CreateGift