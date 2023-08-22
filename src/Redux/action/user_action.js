import { FetchGet, FetchPost } from './fetch'

export const GetUsers = (search) => { return FetchPost('/admin/get_users', { search }, 'getUsers') }
export const GetSingleUser = (user_id) => { return FetchPost('/admin/single_page_user', { user_id }, 'singleUser', 'singleUserError') }
export const DeleteAvatar = (user_id) => { return FetchPost('/admin/delete_user_photo', { user_id }, 'deleteAvatar') }
export const GetCountries = () => { return FetchGet(`/country_and_city`, 'getCountries') }
export const GetCities = (id) => { return FetchGet(`/country_and_city/${id}`, 'getCities', 'getCitiesError') }
export const AddToBlacklist = (user_id, date) => { return FetchPost('/admin/add_user_in_black_list', { user_id, date }, 'addBlacklist') }
export const DeleteFromBlacklist = (user_id) => { return FetchPost('/admin/delete_user_in_black_list', { user_id }, 'removeFromBlacklist') }