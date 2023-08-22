import './style.css'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { DeleteForum, GetSingleForum } from "src/Redux/action/forumCategory_action"
import { CButton } from '@coreui/react'

const SingleForum = () => {
    const dispatch = useDispatch()
    const href = window.location.href.split('/')
    const forumId = href[href.length - 1]
    const forum = useSelector(st => st.ForumCategory_reducer.singleForum)
    const [newForum, setNewForum] = useState(new Date())

    useEffect(() => {
        getForum()
    }, [newForum])

    function getForum() {
        dispatch(GetSingleForum(forumId))
    }

    function deleteForum() {
        const agree = confirm('Вы уверены, что хотите удалить этот форум?')
        agree && dispatch(DeleteForum(forumId))
    }

    return (<>
        <div className="d-grid gap-2 d-md-flex justify-content-md-end" style={{ marginBottom: '10px' }}>
            <CButton color="warning" className="me-md-2">Редактировать</CButton>
            <CButton color="danger" className="me-md-2" onClick={deleteForum}>Удалить</CButton>
        </div>
        <div className="forumCategories">
            <div className='eachForum'>
                <div className='eachForumUser'>
                    <img alt='' src={`${process.env.REACT_APP_IMAGE}/${forum?.user?.avatar}`} />
                    <span>{forum?.user?.name} {forum?.user?.surname}</span>
                </div>
                <div className='eachForumImages'>
                    {forum?.photo?.map((e, i) => (
                        <img alt='' src={`${process.env.REACT_APP_IMAGE}/${e?.photo}`} key={i} />
                    ))}
                </div>
                <div className='eachForumDescription'>
                    <p>{forum?.description}</p>
                </div>
            </div>
        </div>
    </>)
}

export default SingleForum