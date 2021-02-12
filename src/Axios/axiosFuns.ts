import axios from './index';

/**
 * 登录
 * @param phone 手机号
 * @param password 密码
 */
export async function login(phone: string, password: string) {
    const res = await axios.get(`/login/cellphone?phone=${phone}&password=${password}`);
    return res.data
}

/**
 * 退出登录
 */
export async function outLogin() {
    const res = await axios.get('/logout');
    return res.data;
}

/**
 * 获取热门歌单分类
 */
export async function getPlaylistHot() {
    const res = await axios.get('/playlist/hot');
    return res.data;
}

/**
 * 获取歌单 ( 网友精选碟 )
 */

export async function getPlayList(order: 'new' | 'hot', cat: string = '全部', limit: number = 50, offset: number) {
    const res = await axios.get(`/top/playlist?limit=${limit}&order=${order}&cat=${cat}&offset=${offset}`);
    return res.data;
}

/**
 * 获取歌单的详情
 * @param id 歌单的id
 */
export async function getSongSheetInfo(id: number) {
    const res = await axios.get(`/playlist/detail?id=${id}`);
    return res.data;
}

/**
 * 获取音乐的信息
 * @param ids 
 */
export async function getSoneAllInfo(ids: any[]) {
    const arr = ids.map(id => id.id);
    const parmas = arr.join(',');
    const res = await axios.get(`/song/detail?ids=${parmas} `);
    return res.data;
}

export async function getSongUrl(id: number | number[]) {
    if (typeof id === 'number') {
        return await axios.get(`/song/url?id=${id}`);
    } else if (Array.isArray(id)) {
        const newIds = id.join(',');
        return await axios.get(`/song/url?id=${newIds}`);
    } else {
        return null
    }
}