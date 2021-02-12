import { Ref } from "vue";
import { getPlayList } from "../../Axios/axiosFuns";

export async function getData(orderRef: Ref<"new" | "hot">, carRef: Ref<string>, limitRef: Ref<number>, offset: Ref<number>) {
    const res = await getPlayList(orderRef.value, carRef.value, limitRef.value, offset.value);
    return res;
}