import { FetchGet, FetchPost } from './fetch'

export const GetAllGifts = () => { return FetchGet(`/admin/get_all_gifts`, 'getGifts') }
export const GetPresentedGifts = () => { return FetchPost('/admin/get_sended_gifts', {}, 'getPresentedGifts') }