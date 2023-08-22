import { FetchGet, FetchPost } from './fetch'

export const GetForumCategories = (search) => { return FetchPost('/admin/get_forum_category', { search }, 'getForumCategories') }
export const GetSingleForumCategories = (category_id) => { return FetchPost(`/admin/single_page_forum_category`, { category_id }, 'getSingleForumCategories') }
export const DeleteForumCategory = (category_id) => { return FetchPost('/admin/delete_forum_category', { category_id }, 'deleteForumCategory') }
export const GetForums = () => { return FetchGet('/admin/get_forums', 'getForums') }
export const GetSingleForum = (forum_id) => { return FetchPost('/admin/single_page_forum', {forum_id}, 'getSingleForum') }
export const DeleteForum = (forum_id) => {return FetchPost('/admin/delete_forum', {forum_id}, 'deleteForum')}