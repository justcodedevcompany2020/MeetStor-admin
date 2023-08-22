import './style.css'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteAvatar, DeleteFromBlacklist, GetCities, GetCountries, GetSingleUser } from 'src/Redux/action/user_action';
import { CButton, CCol, CForm, CFormInput, CFormSelect, CInputGroup, CInputGroupText } from '@coreui/react';
import AddBlacklist from '../popup/addBlacklist';

const SingleUser = () => {
    const dispatch = useDispatch()
    const token = localStorage.getItem('token')
    const singleUser = useSelector(st => st.User_reducer.singleUser)
    const countries = useSelector(st => st.User_reducer.countries)
    const cities = useSelector(st => st.User_reducer.cities)
    const userIsBlacklisted = useSelector(st => st.User_reducer.userIsBlacklisted)
    const [validated, setValidated] = useState(false)
    const [userId, setUserId] = useState('')
    const [openBlacklist, setOpenblacklist] = useState(false)
    const [details, setDetails] = useState({
        user_id: '',
        avatar: '',
        name: '',
        surname: '',
        gender: '',
        phone: '',
        date_of_birth: '',
        country_id: '',
        city_id: '',
        family_status: '',
        children: '',
        education: '',
        specialization: '',
        about_me: '',
        height: '',
        weight: '',
        body_type: '',
        eye_color: '',
        hair_color: '',
        tattoos_piercings: '',
        get_acquainted: '',
        purpose_of_dating: '',
        balance: '',
        email: '',
        password: '',
    })

    useEffect(() => {
        const href = window.location.href.split('/')
        setUserId(href[href.length - 1])
        dispatch(GetSingleUser(href[href.length - 1]))
        dispatch(GetCountries(details.country_id))
    }, [])

    useEffect(() => {
        dispatch(GetCities(singleUser.country_id))
    }, [singleUser, countries, details])

    useEffect(() => {
        if (singleUser) {
            setDetails({
                user_id: +singleUser?.id,
                avatar: singleUser?.avatar,
                name: singleUser?.name,
                surname: singleUser?.surname,
                gender: singleUser?.gender,
                phone: singleUser?.phone,
                date_of_birth: singleUser?.date_of_birth,
                country_id: singleUser?.country_id,
                city_id: singleUser?.city_id,
                family_status: singleUser?.family_status,
                children: singleUser?.children,
                education: singleUser?.education,
                specialization: singleUser?.specialization,
                about_me: singleUser?.about_me,
                height: singleUser?.height,
                weight: singleUser?.weight,
                body_type: singleUser?.body_type,
                eye_color: singleUser?.eye_color,
                hair_color: singleUser?.hair_color,
                tattoos_piercings: singleUser?.tattoos_piercings,
                get_acquainted: singleUser?.get_acquainted,
                purpose_of_dating: singleUser?.purpose_of_dating,
                balance: singleUser?.balance,
                email: singleUser?.email,
                password: '',
            })
        }
    }, [singleUser])

    const handleSubmit = (event) => {
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        } else {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);
            const formData = new FormData();
            formData.append("user_id", details.user_id);
            formData.append("name", details.name);
            formData.append("surname", details.surname);
            formData.append("email", details.email);
            formData.append("gender", details.gender);
            formData.append("phone", details.phone);
            formData.append("date_of_birth", details.date_of_birth);
            formData.append("country_id", details.country_id);
            formData.append("city_id", details.city_id);
            formData.append("family_status", details.family_status);
            formData.append("children", details.children);
            formData.append("education", details.education);
            formData.append("specialization", details.specialization);
            formData.append("about_me", details.about_me);
            formData.append("height", details.height);
            formData.append("weight", details.weight);
            formData.append("body_type", details.body_type);
            formData.append("eye_color", details.eye_color);
            formData.append("hair_color", details.hair_color);
            formData.append("tattoos_piercings", details.tattoos_piercings);
            formData.append("get_acquainted", details.get_acquainted);
            formData.append("purpose_of_dating", details.purpose_of_dating);
            formData.append("balance", details.balance);
            if (details.password.length) {
                formData.append("password", details.password);
            }
            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formData,
                redirect: 'follow'
            };
            fetch("https://socnetworkbackend.justcode.am/api/admin/update_user_data", requestOptions)
                .then(response => response.json())
                .then(result => {
                    if (result.status) {
                        window.location = '/#/base/users'
                    }
                })
                .catch(error => console.log('error', error));
        }
        setValidated(true)
    }

    const deleteAvatar = () => {
        const agree = confirm('Вы уверены, что хотите удалить аватар пользователя?')
        if (agree) {
            dispatch(DeleteAvatar(userId))
        }
    }

    const deleteFromBlacklist = () => {
        dispatch(DeleteFromBlacklist(details?.user_id))
    }

    return (
        <>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end" onClick={() => { userIsBlacklisted ? deleteFromBlacklist() : setOpenblacklist(true) }}>
                <CButton color="warning">{userIsBlacklisted ? 'Удалить из черного списка' : 'Добавить в черный список'}</CButton>
            </div>
            {openBlacklist && <AddBlacklist
                open={openBlacklist}
                setOpen={setOpenblacklist}
                user_id={details.user_id}
            />}
            <CForm
                className="row g-3 needs-validation"
                noValidate
                validated={validated}
                onSubmit={handleSubmit}
            >
                <CInputGroup className="has-validation m-1">
                    <img alt='' src={`${process.env.REACT_APP_IMAGE}/${details?.avatar}`} className='singleAvatar' />
                </CInputGroup>
                <div className="d-grid gap-2 d-md-flex justify-content-md-start" style={{ marginBottom: '10px', width: 'fit-content' }} onClick={deleteAvatar}>
                    <CButton color="danger">Удалить аватар</CButton>
                </div>
                <CInputGroup className="has-validation m-1">
                    <CInputGroupText id="inputGroupPrepend00">Электронная почта</CInputGroupText>
                    <CFormInput
                        aria-describedby="inputGroup-sizing-default"
                        type="text"
                        id="validationDefault02"
                        required
                        value={details.email}
                        onChange={(e) => setDetails({ ...details, email: e.target.value })}
                    />
                </CInputGroup>
                <CInputGroup className="has-validation m-1">
                    <CInputGroupText id="inputGroupPrepend00">Имя</CInputGroupText>
                    <CFormInput
                        aria-describedby="inputGroup-sizing-default"
                        type="text"
                        id="validationDefault02"
                        required
                        value={details.name}
                        onChange={(e) => setDetails({ ...details, name: e.target.value })}
                    />
                </CInputGroup>
                <CInputGroup className="has-validation m-1">
                    <CInputGroupText id="inputGroupPrepend00">Фамилия</CInputGroupText>
                    <CFormInput
                        aria-describedby="inputGroup-sizing-default"
                        type="text"
                        id="validationDefault02"
                        required
                        value={details.surname}
                        onChange={(e) => setDetails({ ...details, surname: e.target.value })}
                    />
                </CInputGroup>
                <CInputGroup className="has-validation m-1">
                    <CInputGroupText component="label" htmlFor="inputGroupSelect01">Пол</CInputGroupText>
                    <CFormSelect
                        id="inputGroupPrepend01"
                        required
                        aria-describedby="inputGroup-sizing-default"
                        type="text"
                        value={details.gender}
                        onChange={(e) => setDetails({ ...details, gender: e.target.value })}
                    >
                        <option value=''>Выбирать...</option>
                        <option value="Мужской">Мужской</option>
                        <option value="Женский">Женский</option>
                    </CFormSelect>
                </CInputGroup>
                <CInputGroup className="has-validation m-1">
                    <CInputGroupText id="inputGroupPrepend02">Телефон</CInputGroupText>
                    <CFormInput
                        aria-describedby="inputGroup-sizing-default"
                        id="inputGroupPrepend02"
                        required
                        type="text"
                        value={details.phone}
                        onChange={(e) => setDetails({ ...details, phone: e.target.value })}
                    />
                </CInputGroup>
                <CInputGroup className="has-validation m-1">
                    <CInputGroupText id="inputGroupPrepend02">Дата рождения</CInputGroupText>
                    <CFormInput
                        aria-describedby="inputGroup-sizing-default"
                        id="inputGroupPrepend02"
                        required
                        type="date"
                        value={details.date_of_birth}
                        onChange={(e) => setDetails({ ...details, date_of_birth: e.target.value })}
                    />
                </CInputGroup>
                <CInputGroup className="has-validation m-1">
                    <CInputGroupText id="inputGroupPrepend02">Страна</CInputGroupText>
                    <CFormSelect
                        id="inputGroupPrepend01"
                        required
                        aria-describedby="inputGroup-sizing-default"
                        type="text"
                        value={singleUser.country_id}
                        onChange={(e) => {
                            setDetails({ ...details, country_id: e.target.value })
                            singleUser.country_id = e.target.value
                        }}
                    >
                        {countries.map((e, i) => (
                            <option value={e?.id} key={i}>{e?.name}</option>
                        ))}
                    </CFormSelect>
                </CInputGroup>
                <CInputGroup className="has-validation m-1">
                    <CInputGroupText id="inputGroupPrepend02">Город</CInputGroupText>
                    <CFormSelect
                        id="inputGroupPrepend01"
                        required
                        aria-describedby="inputGroup-sizing-default"
                        type="text"
                        value={singleUser.city_id}
                        onChange={(e) => setDetails({ ...details, city_id: e.target.value })}
                    >
                        {cities.map((e, i) => (
                            <option value={e?.id} key={i}>{e?.name}</option>
                        ))}
                    </CFormSelect>
                </CInputGroup>
                <CInputGroup className="has-validation m-1">
                    <CInputGroupText id="inputGroupPrepend02">Семейное положение</CInputGroupText>
                    <CFormSelect
                        id="inputGroupPrepend01"
                        required
                        aria-describedby="inputGroup-sizing-default"
                        type="text"
                        value={details.family_status}
                        onChange={(e) => setDetails({ ...details, family_status: e.target.value })}
                    >
                        <option value=''>Выбирать...</option>
                        <option value="Женат">Женат</option>
                        <option value="Замужем">Замужем</option>
                        <option value="Разведен">Разведен</option>
                        <option value="Не женат">Не женат</option>
                        <option value="Не замужем">Не замужем</option>
                    </CFormSelect>
                </CInputGroup>
                <CInputGroup className="has-validation m-1">
                    <CInputGroupText id="inputGroupPrepend02">Дети</CInputGroupText>
                    <CFormSelect
                        id="inputGroupPrepend01"
                        required
                        aria-describedby="inputGroup-sizing-default"
                        type="text"
                        value={details.children}
                        onChange={(e) => setDetails({ ...details, children: e.target.value })}
                    >
                        <option value=''>Выбирать...</option>
                        <option value="Да">Да</option>
                        <option value="Нет">Нет</option>
                    </CFormSelect>
                </CInputGroup>
                <CInputGroup className="has-validation m-1">
                    <CInputGroupText id="inputGroupPrepend02">Образование</CInputGroupText>
                    <CFormInput
                        aria-describedby="inputGroup-sizing-default"
                        id="inputGroupPrepend02"
                        value={details.education}
                        onChange={(e) => setDetails({ ...details, education: e.target.value })}
                    />
                </CInputGroup>
                <CInputGroup className="has-validation m-1">
                    <CInputGroupText id="inputGroupPrepend02">Специализация</CInputGroupText>
                    <CFormInput
                        aria-describedby="inputGroup-sizing-default"
                        id="inputGroupPrepend02"
                        value={details.specialization}
                        onChange={(e) => setDetails({ ...details, specialization: e.target.value })}
                    />
                </CInputGroup>
                <CInputGroup className="has-validation m-1">
                    <CInputGroupText id="inputGroupPrepend02">Обо мне</CInputGroupText>
                    <CFormInput
                        aria-describedby="inputGroup-sizing-default"
                        id="inputGroupPrepend02"
                        value={details.about_me}
                        onChange={(e) => setDetails({ ...details, about_me: e.target.value })}
                    />
                </CInputGroup>
                <CInputGroup className="has-validation m-1">
                    <CInputGroupText id="inputGroupPrepend02">Рост</CInputGroupText>
                    <CFormInput
                        aria-describedby="inputGroup-sizing-default"
                        id="inputGroupPrepend02"
                        value={details.height}
                        onChange={(e) => setDetails({ ...details, height: e.target.value })}
                    />
                </CInputGroup>
                <CInputGroup className="has-validation m-1">
                    <CInputGroupText id="inputGroupPrepend02">Вес</CInputGroupText>
                    <CFormInput
                        aria-describedby="inputGroup-sizing-default"
                        id="inputGroupPrepend02"
                        value={details.weight}
                        onChange={(e) => setDetails({ ...details, weight: e.target.value })}
                    />
                </CInputGroup>
                <CInputGroup className="has-validation m-1">
                    <CInputGroupText id="inputGroupPrepend02">Телосложение</CInputGroupText>
                    <CFormSelect
                        id="inputGroupPrepend01"
                        required
                        aria-describedby="inputGroup-sizing-default"
                        type="text"
                        value={details.body_type}
                        onChange={(e) => setDetails({ ...details, body_type: e.target.value })}
                    >
                        <option value=''>Выбирать...</option>
                        <option value="Обычное">Обычное</option>
                        <option value="Крупное">Крупное</option>
                        <option value="Худощавое">Худощавое</option>
                    </CFormSelect>
                </CInputGroup>
                <CInputGroup className="has-validation m-1">
                    <CInputGroupText id="inputGroupPrepend02">Цвет глаз</CInputGroupText>
                    <CFormSelect
                        id="inputGroupPrepend01"
                        required
                        aria-describedby="inputGroup-sizing-default"
                        type="text"
                        value={details.eye_color}
                        onChange={(e) => setDetails({ ...details, eye_color: e.target.value })}
                    >
                        <option value=''>Выбирать...</option>
                        <option value="Карие">Карие</option>
                        <option value="Зелёные">Зелёные</option>
                        <option value="Голубые">Голубые</option>
                        <option value="Коричневые">Коричневые</option>
                    </CFormSelect>
                </CInputGroup>
                <CInputGroup className="has-validation m-1">
                    <CInputGroupText id="inputGroupPrepend02">Цвет волос</CInputGroupText>
                    <CFormSelect
                        id="inputGroupPrepend01"
                        required
                        aria-describedby="inputGroup-sizing-default"
                        type="text"
                        value={details.hair_color}
                        onChange={(e) => setDetails({ ...details, hair_color: e.target.value })}
                    >
                        <option value=''>Выбирать...</option>
                        <option value="Русые">Русые</option>
                        <option value="Блонди">Блонди</option>
                        <option value="Брюнет">Брюнет</option>
                        <option value="Рыжие">Рыжие</option>
                        <option value="Светлые">Светлые</option>
                    </CFormSelect>
                </CInputGroup>
                <CInputGroup className="has-validation m-1">
                    <CInputGroupText id="inputGroupPrepend02">Татуировки, пирсинг</CInputGroupText>
                    <CFormSelect
                        id="inputGroupPrepend01"
                        required
                        aria-describedby="inputGroup-sizing-default"
                        type="text"
                        value={details.tattoos_piercings}
                        onChange={(e) => setDetails({ ...details, tattoos_piercings: e.target.value })}
                    >
                        <option value=''>Выбирать...</option>
                        <option value="Да">Да</option>
                        <option value="Нет">Нет</option>
                    </CFormSelect>
                </CInputGroup>
                <CInputGroup className="has-validation m-1">
                    <CInputGroupText id="inputGroupPrepend02">Познакомлюсь</CInputGroupText>
                    <CFormInput
                        aria-describedby="inputGroup-sizing-default"
                        id="inputGroupPrepend02"
                        value={details.get_acquainted}
                        onChange={(e) => setDetails({ ...details, get_acquainted: e.target.value })}
                    />
                </CInputGroup>
                <CInputGroup className="has-validation m-1">
                    <CInputGroupText id="inputGroupPrepend02">Цель знакомства</CInputGroupText>
                    <CFormInput
                        aria-describedby="inputGroup-sizing-default"
                        id="inputGroupPrepend02"
                        value={details.purpose}
                        onChange={(e) => setDetails({ ...details, purpose: e.target.value })}
                    />
                </CInputGroup>
                <CInputGroup className="has-validation m-1">
                    <CInputGroupText id="inputGroupPrepend02">Баланс</CInputGroupText>
                    <CFormInput
                        aria-describedby="inputGroup-sizing-default"
                        id="inputGroupPrepend02"
                        required
                        value={details.balance}
                        onChange={(e) => setDetails({ ...details, balance: e.target.value })}
                    />
                </CInputGroup>
                <CInputGroup className="has-validation m-1">
                    <CInputGroupText id="inputGroupPrepend02">Пароль</CInputGroupText>
                    <CFormInput
                        aria-describedby="inputGroup-sizing-default"
                        id="inputGroupPrepend03"
                        type="text"
                        value={details.password}
                        onChange={(e) => setDetails({ ...details, password: e.target.value })}
                        minLength={8}
                    />
                </CInputGroup>
                <CCol xs={12} className="position-relative">
                    <CButton color="primary" type="submit">
                        Сохранить
                    </CButton>
                </CCol>
            </CForm>
        </>
    )
}

export default SingleUser