export default interface userType {
	userId: string;
	avatarUrl: string;
	nickname: string;
}

import { defineStore } from 'pinia';
export const useStore = defineStore('user', {
	state: () => {
		return {
			userId: '',
			avatarUrl: '',
			nickname: ''
		};
	}
});

export const songStore = defineStore('song', {
	state: function (): {
		id: any;
		index: number;
	} {
		return {
			id: '',
			index: 0
		};
	}
});

export const searchStore = defineStore('search', {
	state: function () {
		return {
			keywords: ''
		};
	}
});

export const loading = defineStore('loading', {
	state: function () {
		return {
			show: false
		};
	}
});
