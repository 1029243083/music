export const setLocalStorage = (key: string, value: string) => {
	localStorage.setItem(key, value);
};

export const getLocalStorage = (key: string) => {
	return localStorage.getItem(key);
};

// 格式化月/日
export const fromatDate = (time: number) => {
	const date = new Date(time);
	const month = date.getMonth() + 1;
	const day = date.getDay();
	return month + '月' + day + '日';
};

// 格式化分秒
export const fromaTime = (time: number) => {
	const date = new Date(time);
	const Minutes = date.getMinutes();
	const Seconds = date.getSeconds();
	return Minutes + ':' + Seconds;
};

// 补0
export const b0 = (date: string) => {
	const arr = date.split(':');
	if (parseInt(arr[0]) < 10) {
		arr[0] = '0' + arr[0];
	}
	if (parseInt(arr[1]) < 10) {
		arr[1] = '0' + arr[1];
	}
	return arr.join(':');
};
