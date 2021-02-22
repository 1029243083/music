import { createStore, Store } from 'vuex';
import { login, outLogin } from '../Axios/axiosFuns';
type user = {
    id: string,
    name: string,
    avatarUrl: string
};
export type arType = {
    id: number,
    name: string
};
type alType = {
    id: number,
    name: number,
    picUrl: string
};
export type song = {
    id?: number,
    name?: string,
    ar?: arType[],
    al?: alType,
    dt?: number
}
export interface IState {
    user: user,
    song: song,
    songList: song[],
    index: number
};
const store: Store<IState> = createStore({
    state() {
        return {
            user: {
                id: '',
                name: '',
                avatarUrl: ''
            },
            song: {},
            songList: [],
            index: 0
        }
    },
    mutations: {
        setUser(state: IState, userInfo: user) {
            state.user = userInfo;
        },
        setSong(state: IState, songInfo: song) {
            state.song = songInfo;
        },
        setSongList(state: IState, songList: song[]) {
            state.songList = songList;
        },
        setIndex(state: IState, index: number) {
            state.index = index;
            if (!state.songList[state.index]) return;
            store.commit('setSong', state.songList[state.index])
        }
    },
    actions: {
        async loginAction(context, { phone, password }) {
            const { profile } = await login(phone, password);
            if (!profile) {
                return false;
            } else {
                context.commit('setUser', {
                    id: profile.userId.toString(),
                    name: profile.nickname,
                    avatarUrl: profile.avatarUrl
                } as user)
                return true;
            }
        },
        async outLogin() {
            await outLogin();
        }
    }
})

export default store