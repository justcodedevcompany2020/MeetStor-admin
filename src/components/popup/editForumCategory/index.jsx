import './style.css'
import { useState } from 'react'
import { CloseIcon } from 'src/assets/svg'
import { CButton, CCol, CForm, CFormInput, CFormSelect } from '@coreui/react'

const EditForumCategory = ({ open, setOpen, category, setUpdate }) => {
    const token = localStorage.getItem('token')
    const [validated, setValidated] = useState(false)
    const [name, setName] = useState(category?.name)
    const [icon, setIcon] = useState()
    const [privacy, setPrivacy] = useState(category?.open_or_close)
    const [color, setColor] = useState(category?.color)

    const handleSubmit = (event) => {
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        } else {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);

            const formdata = new FormData();
            formdata.append("category_id", category?.id);
            formdata.append("name", name);
            formdata.append("color", color);
            formdata.append("open_or_close", privacy);
            if (icon) {
                formdata.append("icon", icon);
            }

            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            fetch("https://socnetworkbackend.justcode.am/api/admin/update_forum_category", requestOptions)
                .then(response => response.json())
                .then(result => {
                    if (result.status) {
                        setUpdate(new Date())
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
                        label="Имя"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <CFormInput
                        type="file"
                        label="Значок"
                        onChange={handleImageChange}
                    />
                    <CFormSelect
                        label="Приватность"
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
                        label="Цвет фона"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        required
                    />
                    <CCol xs={12} className="position-relative">
                        <CButton color="primary" type="submit">
                            Сохранить
                        </CButton>
                    </CCol>
                </CForm>
            </div>
        </div>
    )
}

export default EditForumCategory