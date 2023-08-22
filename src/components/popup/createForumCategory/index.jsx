import './style.css'
import { CloseIcon } from 'src/assets/svg'
import { CButton, CCol, CForm, CFormInput, CFormSelect } from '@coreui/react'
import { useState } from 'react'

const CreateForumCategory = ({ open, setOpen, setNewCategory }) => {
    const token = localStorage.getItem('token')
    const [validated, setValidated] = useState(false)
    const [name, setName] = useState('')
    const [icon, setIcon] = useState()
    const [privacy, setPrivacy] = useState('Открытый')
    const [color, setColor] = useState('#32709F')

    const handleSubmit = (event) => {
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        } else {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);

            const formdata = new FormData();
            formdata.append("name", name);
            formdata.append("color", color);
            formdata.append("open_or_close", privacy);
            formdata.append("icon", icon);

            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            fetch("https://socnetworkbackend.justcode.am/api/admin/create_forum_category", requestOptions)
                .then(response => response.json())
                .then(result => {
                    if (result.status) {
                        setNewCategory(new Date)
                        setName('')
                        setIcon('')
                        setPrivacy('Открытый')
                        setColor('#32709F')
                        close()
                    }
                })
                .catch(error => console.log('error', error));
        }
        setValidated(true)
    }

    function handleImageChange(event) {
        setIcon(event.target.files[0])
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
                        type="text"
                        label="Выберите имя"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <CFormInput
                        type="file"
                        label="Выбрать Значок"
                        onChange={handleImageChange}
                        required
                    />
                    <CFormSelect
                        label="Выберите приватность"
                        options={[
                            { label: 'Открытый', value: 'Открытый' },
                            { label: 'Закрытый', value: 'Закрытый' },
                        ]}
                        value={privacy}
                        onChange={(e) => setPrivacy(e.target.value)}
                        required
                    />
                    <CFormInput
                        type="color"
                        label="Выберите цвет фона"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        required
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

export default CreateForumCategory