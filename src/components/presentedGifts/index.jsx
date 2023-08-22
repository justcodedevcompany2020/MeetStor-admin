import './style.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetPresentedGifts } from 'src/Redux/action/gift_action'
import { CCard, CCardBody, CCardImage, CCardText } from '@coreui/react'

const PresentedGifts = () => {
    const dispatch = useDispatch()
    const presentedGifts = useSelector(st => st.Gift_reducer.presentedGifts)

    useEffect(() => {
        dispatch(GetPresentedGifts())
    }, [])

    return (
        <>
            <div className='allGifts'>
                {presentedGifts?.length
                    ? presentedGifts.map((e, i) => (
                        <CCard style={{ width: '18rem' }} key={i}>
                            <CCardImage className='giftImage' orientation="top" src={`${process.env.REACT_APP_IMAGE}/${e?.photo}`} />
                            <CCardBody>
                                <CCardText>Имя: {e?.name}</CCardText>
                                <CCardText>Цена: {e?.price} ₽</CCardText>
                            </CCardBody>
                        </CCard>
                    ))
                    : <span>Нет врученных подарков</span>}
            </div>
        </>
    )
}

export default PresentedGifts