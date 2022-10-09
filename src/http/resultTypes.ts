export interface GDresultType {
	id: number;
	name: string;
	picUrl?: string;
	playCount: number;
	coverImgUrl?: string;
	creator?: {
		nickname: string;
		avatarDetail: {
			identityIconUrl: string;
		};
	};
}
export interface TagsType {
	hot: boolean;
	id: number;
	name: string;
	type: 0;
}
