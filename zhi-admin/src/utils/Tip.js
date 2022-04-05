import { ElMessage } from 'element-plus'
import { ElLoading } from 'element-plus';
let LoadingService = null
export const hideLoading = () => {
    LoadingService && LoadingService.close()
}
export const successMsg = (msg) => {
    hideLoading()
    ElMessage({ type: 'success', message: msg, duration: 1400 })
}
// export const loading = ElLoading.service({
//     lock: true,
//     text: 'Loading',
//     spinner: 'el-icon-loading',
//     background: 'rgba(0, 0, 0, 0.7)',
// });
export const failMsg = (err) => {
    if (!isCancel(err)) {
        hideLoading()
        let msg = '系統出錯'
        if ((typeof err) === 'object') {
            msg = err.msgTip || err.msg || err.message || err.Message || '系統出錯'
        } else if (typeof err === 'string') {
            msg = err
        }
        ElMessage({ type: 'error', message: msg, duration: 1400 })
    }
}
export const isCancel = (e) => {
    return typeof e === 'string' && (e === 'cancel' || e === 'close')
}
export default {
    successMsg,
    failMsg,
    // loading
}
