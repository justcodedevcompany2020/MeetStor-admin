import { FetchPost } from './fetch'

export const GetModerators = (search) => { return FetchPost('/admin/get_moderators_list', { search }, 'getModerators') }
export const DeleteModerator = (user_id) => { return FetchPost('/admin/delete_moderator', { user_id }, 'deleteModerator') }
export const CreateModerators = (name, date_of_birth, phone, password, password_confirmation, gender) => { return FetchPost('/admin/create_moderator', { name, date_of_birth, phone, password, password_confirmation, gender }, 'createModerator') }
export const GetSingleModerator = (user_id) => { return FetchPost('/admin/single_page_moderator', { user_id }, 'singleModerator') }
export const UpdateModerator = (data) => { return FetchPost('/admin/update_moderator_account', { date_of_birth: data.date_of_birth, gender: data.gender, name: data.name, phone: data.phone, user_id: +data.user_id }, 'updateModerator') }  