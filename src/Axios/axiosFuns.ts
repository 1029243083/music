import { AxiosResponse } from 'axios';
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

/**
 * 
 * 获取音乐的url
 */
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

/**
 * 获取音乐评论
 * @param id 
 * @param limit 
 */
export async function getCommit(id: number, limit: number) {
    return await (await axios.get(`/comment/music?id=${id}&limit=${limit}`)).data;
}

/**
 * 获取歌手
 * @param limit 获取数量 
 * @param type 根据分类来选
 * @param area 根据语种来选
 * @param initial 根据name来选
 */
export async function getSinger(limit: number, type: number, area: number, initial: number) {
    const res = await axios.get(`/artist/list?type=${type}&area=${area}&initial=${initial}&limit=${limit}`);
    return res.data;
}

/**
 * 获取歌手详情
 * @param id 歌手id
 */
export async function getSingerInfo(id: string) {
    const res = await axios.get(`/artist/detail?id=${id}`);
    return res.data
}

/**
 * 可以获取歌手的部分信息和热门歌曲
 * @param id 歌手id
 */
export async function getSingerSong(id: string) {
    const res = await axios.get(`/artists?id=${id}`);
    return res.data
}

/**
 * 获取歌手描述
 * @param id 歌手id
 */
export async function getSingerMess(id: string) {
    const res = await axios.get(`/artist/desc?id=${id}`);
    return res.data
}

/**
 * 获取相似歌手
 * @param id 歌手id
 */
export async function getSimiSinger(id: string) {
    const res = await axios.get(`/simi/artist?id=${id}`);
    return res.data
}

/**
 * 获取所用的排行榜
 */
export async function getToplist() {
    const res: AxiosResponse<{ list: any[] }> = await axios.get(`/toplist`);
    return res.data
}

/**
 * 获取搜索数据
 * @param keywords 关键字
 * @param limit 条数
 * @param type 类型
 */
export async function search(keywords: string, limit: number = 10, type: number = 1) {
    const res = await axios.get(`/cloudsearch?keywords=${keywords}&limit=${limit}&type=${type}`);
    return res.data;
}

/**
 * 获取轮播图数据
 */
export async function getBanner() {
    const res = await axios.get(`/banner?type=0`);
    return res.data
}

/**
 * 推荐歌单
 */
export async function getPersonalized() {
    const res = await axios.get(`/personalized?limit=10`);
    return res.data
}