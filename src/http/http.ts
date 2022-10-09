import axios from 'axios';
import {
	host,
	loginCreate,
	loginKey,
	loginCheck,
	loginStatus,
	userDetail,
	loginCellphone,
	sendVerifyCode,
	verifyVerifyCode,
	loginStatusInfo,
	getBanner,
	recommendResource,
	tags,
	highquality,
	toplist,
	playlistDetail,
	artist,
	personalizedNewsong,
	videoList,
	videoGroupById,
	gdDetail,
	songDetail,
	commentPlayList,
	playlistSubscribers,
	eventApi,
	personalFm,
	comment,
	checkMusic,
	songUrlV1,
	searchHotDetail,
	cloudsearch
} from './api';
import { GDresultType, TagsType } from './resultTypes';
import { loading } from '../store/user';

const request = axios.create({
	baseURL: host
});

// 添加请求拦截器
request.interceptors.request.use(
	function (config) {
		const isShow = loading();

		const cookie = localStorage.getItem('cookie');
		if (cookie) {
			if (config.url?.includes('?')) {
				config.url += '&cookie=' + encodeURIComponent(cookie);
			} else {
				config.url += '?cookie=' + encodeURIComponent(cookie);
			}
		}
		isShow.show = true;
		// 在发送请求之前做些什么
		return config;
	},
	function (error) {
		// 对请求错误做些什么
		return Promise.reject(error);
	}
);

request.interceptors.response.use(
	function (response) {
		const isShow = loading();

		// 2xx 范围内的状态码都会触发该函数。
		// 对响应数据做点什么
		isShow.show = false;
		return response;
	},
	function (error) {
		// 超出 2xx 范围的状态码都会触发该函数。
		// 对响应错误做点什么
		return Promise.reject(error);
	}
);

interface responseType<T> {
	data: T;
}

// 登录key
export const getLoginKey = async () => {
	// 返回结果类型
	type LoginKeyType = {
		code: number;
		unikey: string;
	};
	// 请求key值
	const res = await request.get<responseType<LoginKeyType>>(
		`${loginKey}?timerstamp=${Date.now()}`
	);
	const { unikey } = res.data.data;
	return unikey;
};

// 二维码登录获取二维码
export const getLoginCreate = async (key: string) => {
	type LoginCreateType = {
		qrurl: string;
		qrimg: string;
	};
	const res = await request.get<responseType<LoginCreateType>>(
		`${loginCreate}?key=${key}&qrimg=true&timerstamp=${Date.now()}`
	);
	return res.data.data.qrimg;
};

// 二维码检测扫码状态接口
export const getloginStatus = async (key: string) => {
	type loginStatusType = {
		code: number;
		cookie: string;
		message: string;
	};
	const res = await request.get<loginStatusType>(
		`${loginCheck}?key=${key}&timerstamp=${Date.now()}`
	);
	return res.data;
};

// 获取登录状态返回用户ID
export const getloginStatusCookie = async (cookie: string) => {
	type LoginStatusCookieType = {
		account: {
			id: number;
		};
	};
	const res = await request.post<responseType<LoginStatusCookieType>>(
		`${loginStatus}?timerstamp=${Date.now()}`,
		{
			cookie
		}
	);
	console.log(res.data.data.account.id);

	return res.data.data.account.id;
};

// 手机号登录
export const loginByPhone = async (phone: string, password: string) => {
	const res = await request.get(
		`${loginCellphone}?phone=${phone}&password=${password}&timerstamp=${Date.now()}`
	);
	return res.data;
};

// 手机发送验证码
export const getVerifyCode = async (phone: string) => {
	await request.get(`${sendVerifyCode}?phone=${phone}`);
};

// 验证验证码
export const verifyCode = async (phone: string, code: string) => {
	try {
		const res = await request.get(
			`${verifyVerifyCode}?phone=${phone}&captcha=${code}&timerstamp=${Date.now()}`
		);
		return res.data.data;
	} catch (error) {
		return false;
	}
};

// 获取用户详情
export const getUserDetail = async (id: number) => {
	const res = await request.get(`${userDetail}?uid=${id}`);
	// console.log(res);
	return res;
};

// 获取登录状态 可获取到用户信息
export const getStatus = async () => {
	const res = await request.get(`${loginStatusInfo}?timerstamp=${Date.now()}`);
	return res.data;
};

// 获取轮播图
export const getBannerInfo = async (type: number) => {
	const res = await request.get(`${getBanner}?type=${type}`);
	return res;
};

// 获取推荐歌单
export const getrEcommendResource = async (limit: number = 20) => {
	interface personalizedType {
		code: number;
		result: [GDresultType];
	}
	const res = await request.get<personalizedType>(
		`${recommendResource}?limit=${limit}&timerstamp=${Date.now()}`
	);
	return res;
};

// 获取精品歌单标签列表
export const getTagsList = async () => {
	const res = await request.get<{ tags: TagsType[] }>(tags);
	return res;
};

// 获取精品歌单列表
export const getHighquality = async (name: string, before?: number, limit: number = 50) => {
	let api = highquality;
	if (name) {
		api += `?cat=${name}`;
	}
	if (before) {
		api += `&before=${name}`;
	}
	api += `&limit=${limit}`;
	const res = await request.get(api);
	return res;
};

// 获取排行榜
export const getToplist = async () => {
	const res = await request.get(toplist);
	return res;
};

// 获取歌单详情
export const getPlaylistDetail = async (id: number, limit: number = 10, offset: number = 0) => {
	const res = request.get(`${playlistDetail}?id=${id}&limit=${limit}&offset=${offset}`);
	return res;
};

// 获取歌手数据
export const artistList = async (type: number, area: number, initial: string | null) => {
	let api = artist;
	if (type !== undefined && type !== null) {
		api += `?type=${type}`;
	}
	if (area !== undefined && area !== null) {
		api += `&area=${area}`;
	}
	if (initial !== undefined && initial !== null) {
		api += `&initial=${initial}`;
	}

	api += '&limit=15';
	const res = await request.get(api);
	return res;
};

// 获取歌手音乐
export const getPersonalizedNewsong = async (limit: number) => {
	let api = personalizedNewsong;
	if (limit) {
		api += `${personalizedNewsong}?limit=${limit}`;
	}
	const res = await request.get(api);
	return res;
};

// 获取视频分类列表
export const getVideoTags = async () => {
	const res = await request.get(videoList);
	return res;
};

// 获取视频列表
export const getVideoListById = async (id: number, offset: number) => {
	let api = videoGroupById;
	if (id) {
		api += `${videoGroupById}?id=${id}`;
	}
	if (offset) {
		api += `&offset=${offset}`;
	}
	const res = await request.get(api);
	return res;
};

// 获取歌单详情
export const GetdgDetail = async (id: number) => {
	const res = await request.get(gdDetail + '?id=' + id);
	return res;
};

// 获取歌曲详情
export const getSongDetail = async (str: string) => {
	const res = await request.get(songDetail + '?ids=' + str);
	return res;
};

// 获取评论
export const getCommentPlayList = async (id: number, limit: number, offset: number) => {
	let api = commentPlayList;
	if (id !== undefined) {
		api += `?id=${id}`;
	}
	if (limit !== undefined) {
		api += `&limit=${limit}`;
	}
	if (offset !== undefined) {
		api += `&offset=${offset}`;
	}
	const res = await request.get(api);
	return res;
};

// 获取评论
export const getPlaylistSubscribers = async (id: number, limit: number, offset: number) => {
	let api = playlistSubscribers;
	if (id !== undefined) {
		api += `?id=${id}`;
	}
	if (limit !== undefined) {
		api += `&limit=${limit}`;
	}
	if (offset !== undefined) {
		api += `&offset=${offset}`;
	}
	const res = await request.get(api);
	return res;
};

// 获取动态消息
export const getEvent = async () => {
	const res = await request.get(eventApi);
	return res;
};

//私人FM
export const getPersonalFm = async () => {
	const res = await request.get(personalFm);
	return res;
};

// 新版评论接口
export const getComment = async (
	id: number,
	type: number,
	pageNo: number = 1,
	pageSize: number = 20,
	sortType: number = 1
) => {
	const api = `${comment}?id=${id}&type=${type}&pageNo=${pageNo}&pageSize=${pageSize}&sortType=${sortType}`;
	const res = await request.get(api);
	return res;
};

// 检查音乐是否可用
export const getCheckMusic = async (id: string) => {
	const res = await request.get(checkMusic + '?id=' + id);
	return res;
};

// 获取音乐url
export const getSongUrlV1 = async (id: string) =>
	request.get(songUrlV1 + '?id=' + id + '&level=lossless');

// 获取热搜
export const getSearchSuggest = async () => {
	const res = await request.get(`${searchHotDetail}`);
	return res;
};

// 搜索
export const getCloudsearch = async (keywords: string) => {
	const res = await request.get(`${cloudsearch}?keywords=${keywords}`);
	return res;
};
