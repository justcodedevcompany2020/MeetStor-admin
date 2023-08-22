import './style.css'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { GetForumCategories } from "src/Redux/action/forumCategory_action"
import { CButton, CFormInput } from '@coreui/react'
import CreateForumCategory from '../popup/createForumCategory'

const ForumCategories = () => {
    const dispatch = useDispatch()
    const categories = useSelector(st => st.ForumCategory_reducer.allForumCategories)
    const [openCreate, setOpenCreate] = useState(false)
    const [newCategory, setNewCategory] = useState(new Date())

    useEffect(() => {
        getCategories()
    }, [newCategory])

    function getCategories(search) {
        dispatch(GetForumCategories(search))
    }

    return (<>
        {openCreate &&
            <CreateForumCategory
                open={openCreate}
                setOpen={setOpenCreate}
                setNewCategory={setNewCategory}
            />
        }
        <div className='categoriesTop'>
            <CFormInput placeholder="Поиск" onChange={(e) => getCategories(e.target.value)} style={{ width: '300px', marginBottom: '20px' }} />
            <div className="d-grid gap-2 d-md-flex justify-content-md-end" style={{ marginBottom: '10px' }}>
                <CButton color="primary" className="me-md-2" onClick={() => setOpenCreate(true)}>Создать категорию</CButton>
            </div>
        </div>
        <div className="forumCategories">
            {categories.length
                ? categories.map((e, i) => (
                    <div className="eachForum" style={{ background: e?.color }} key={i} onClick={() => window.location = `/#/forumCategory/${e?.id}`}>
                        <img alt='' src={`${process.env.REACT_APP_IMAGE}/${e?.icon}`} />
                        <span>{e?.name}</span>
                        <span>Приватность: {e?.open_or_close}</span>
                    </div>
                ))
                : <span>Нет категорий форума</span>
            }
        </div>
    </>)
}

export default ForumCategories