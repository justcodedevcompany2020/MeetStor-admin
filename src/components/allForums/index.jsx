import './style.css'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { GetForums } from "src/Redux/action/forumCategory_action"
import { CButton } from '@coreui/react'
import CreateForum from '../popup/createForum'

const AllForums = () => {
    const dispatch = useDispatch()
    const forums = useSelector(st => st.ForumCategory_reducer.allForums)
    const [openCreate, setOpenCreate] = useState(false)
    const [newForum, setNewForum] = useState(new Date())

    useEffect(() => {
        getForums()
    }, [newForum])

    function getForums() {
        dispatch(GetForums())
    }

    return (<>
        {openCreate &&
            <CreateForum
                open={openCreate}
                setOpen={setOpenCreate}
                setNewForum={setNewForum}
            />
        }
        <div className="d-grid gap-2 d-md-flex justify-content-md-end" style={{ marginBottom: '10px' }}>
            <CButton color="primary" className="me-md-2" onClick={() => setOpenCreate(true)}>Создать форум</CButton>
        </div>
        <div className="forumCategories">
            {forums.length
                ? forums.map((e, i) => (
                    <div key={i} className='eachForum' onClick={() => window.location = `/#/forum/${e?.id}`}>
                        <div className='eachForumUser'>
                            <img alt='' src={`${process.env.REACT_APP_IMAGE}/${e?.user?.avatar}`} />
                            <span>{e?.user?.name} {e?.user?.surname}</span>
                        </div>
                        <div className='eachForumImages'>
                            {e?.photo?.map((e, i) => (
                                <img alt='' src={`${process.env.REACT_APP_IMAGE}/${e?.photo}`} key={i} />
                            ))}
                        </div>
                        <div className='eachForumDescription'>
                            <p>{e?.description}</p>
                        </div>
                    </div>
                ))
                : <span>Нет форумов</span>
            }
        </div>
    </>)
}

export default AllForums