import './style.css'
import { useEffect, useState } from 'react'
import { CloseIcon } from 'src/assets/svg'
import { CButton, CCol, CForm, CFormInput, CFormSelect, CFormTextarea } from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux'
import { GetForumCategories } from 'src/Redux/action/forumCategory_action'

const CreateForum = ({ open, setOpen, setNewForum }) => {
    const dispatch = useDispatch()
    const token = localStorage.getItem('token')
    const categories = useSelector(st => st.ForumCategory_reducer.allForumCategories)
    const [validated, setValidated] = useState(false)
    const [description, setDescription] = useState('')
    const [categoryId, setCategoryId] = useState(categories[0]?.id)
    var formdata = new FormData();

    useEffect(() => {
        dispatch(GetForumCategories())
    }, [])

    useEffect(() => {
        categories && setCategoryId(categories[0]?.id)
    }, [categories])

    const handleSubmit = (event) => {
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        } else {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);

            formdata.append("category_id", categoryId);
            formdata.append("description", description);

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            fetch("https://socnetworkbackend.justcode.am/api/admin/create_forum", requestOptions)
                .then(response => response.json())
                .then(result => {
                    if (result.status) {
                        setNewForum(new Date())
                        setOpen(false)
                    }
                })
                .catch(error => console.log('error', error));
        }
        setValidated(true)
    }

    function handleImageChange(event) {
        Object.values(event.target.files).forEach(element => {
            formdata.append("photo[]", element);
        })
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
                    <CFormTextarea
                        label="Напишите описание"
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></CFormTextarea>
                    <CFormSelect
                        label="Выберите приватность"
                        value={categories?.id}
                        onChange={(e) => setCategoryId(e.target.value)}
                        required
                    >
                        {categories?.length && categories?.map((e, i) => (
                            <option value={e?.id} key={i}>{e?.name}</option>
                        ))}

                    </CFormSelect>
                    <CFormInput
                        type="file"
                        label="Выбрать Значок"
                        multiple
                        onChange={handleImageChange}
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

export default CreateForum