export const host = 'http://localhost:3000';

// ==========================================================================================
// 登录
export const loginKey = '/login/qr/key'; // 登录时后去的key值
export const loginCreate = '/login/qr/create'; // 获取登录二维码
export const loginCheck = '/login/qr/check'; // 轮询这个接口可以查看二维码状态
export const loginStatus = '/login/status'; // 获取登录状态
export const loginCellphone = '/login/cellphone'; // 手机号登录
export const loginStatusInfo = '/user/account'; // 获取登录状态

// ==========================================================================================
export const sendVerifyCode = '/captcha/sent'; // 发送验证码
export const verifyVerifyCode = '/captcha/verify'; // 验证验证码

// ==========================================================================================
export const userDetail = '/user/detail'; // 用户详情
export const getBanner = '/banner'; // 获取轮播图
export const recommendResource = '/personalized'; // 个性推荐的推荐歌单
export const tags = '/playlist/highquality/tags'; // 获取精品歌单标签列表
export const highquality = '/top/playlist/highquality'; // 获取精品歌单列表
export const toplist = '/toplist'; // 获取排行榜
export const playlistDetail = 'playlist/track/all'; // 获取歌单详情 排行榜也是歌单
export const artist = '/artist/list'; // 获取歌手分类
export const personalizedNewsong = '/personalized/newsong'; // 推荐新音乐
export const videoList = '/video/category/list'; // 视频分类列表
export const videoGroupById = '/video/group'; // 获取分类视频
export const gdDetail = '/playlist/detail'; // 歌单详情
export const songDetail = '/song/detail'; // 获取歌曲详情
export const commentPlayList = '/comment/playlist'; // 获取评论
export const playlistSubscribers = '/playlist/subscribers'; // 获取歌单收藏者
export const eventApi = '/event?pagesize=30&lasttime=-1'; // 获取动态消息
export const personalFm = '/personal_fm'; // 私人FM
export const comment = '/comment/new'; // 新版评论
export const checkMusic = '/check/music'; // 检查音乐是否可用
export const songUrlV1 = '/song/url/v1'; // 获取音乐url
export const searchHotDetail = '/search/hot/detail'; // 热搜
export const cloudsearch = '/cloudsearch'; // 搜索
