import './style.css'
import { CButton } from '@coreui/react'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import EditForumCategory from '../popup/editForumCategory'
import { DeleteForumCategory, GetSingleForumCategories } from "src/Redux/action/forumCategory_action"

const SingleForumCategory = () => {
    const dispatch = useDispatch()
    const category = useSelector(st => st.ForumCategory_reducer.singleForumCategory)
    const [categoryId, setCategoryId] = useState('')
    const [openEdit, setOpenEdit] = useState(false)
    const [update, setUpdate] = useState(new Date())

    useEffect(() => {
        const href = window.location.href.split('/')
        setCategoryId(href[href.length - 1])
        dispatch(GetSingleForumCategories(href[href.length - 1]))
    }, [update])

    function deleteCategory() {
        const agree = confirm('Вы уверены, что хотите удалить эту категорию форума?')
        agree && dispatch(DeleteForumCategory(categoryId))
    }

    return (<>
        {openEdit &&
            <EditForumCategory
                open={openEdit}
                setOpen={setOpenEdit}
                category={category}
                setUpdate={setUpdate}
            />
        }
        <div className="d-grid gap-2 d-md-flex justify-content-md-end" style={{ marginBottom: '10px' }}>
            <CButton color="warning" className="me-md-2" onClick={() => setOpenEdit(true)}>Редактировать</CButton>
            <CButton color="danger" className="me-md-2" onClick={deleteCategory}>Удалить</CButton>
        </div>
        <div className="eachForum" style={{ background: category?.color }} onClick={() => window.location = `/#/forumCategory/${category?.id}`}>
            <img alt='' src={`${process.env.REACT_APP_IMAGE}/${category?.icon}`} />
            <span>{category?.name}</span>
            <span>Приватность: {category?.open_or_close}</span>
        </div>
    </>)
}

export default SingleForumCategory