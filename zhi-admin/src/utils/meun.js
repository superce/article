import { apiMeunList } from '@src/api/meun'

export async function getMeunList() {
    try {
        const res = await apiMeunList()
        if (res.code === 200) {
            return res.data
        }
    } catch (err) { }
}