
const __TokenKey = ''
const __prefix = ''
const makeName = (name) => {
    if (name.startsWith(__prefix)) {
        return name
    }
    return __prefix + '_' + name
}

/**
 * 设置session
 * @param name
 * @param value
 * @returns {boolean}
 *
 */
export const setSession = (name, value) => {
    if (!name || !value) {
        return false
    }
    if (typeof value !== 'string') {
        value = JSON.stringify(value)
    }
    name = makeName(name)
    window.sessionStorage.setItem(name, value)
}

/**
 * 获取session
 * @param name
 * @returns {*|value|*}
 */
export const getSession = (name) => {
    name = makeName(name)
    let value = window.sessionStorage.getItem(name)
    if (value && value.length > 0) {
        let result
        try {
            result = JSON.parse(value)
        } catch (e) {
            result = value
        }
        return result
    }
    return value
}

/**
 * 移除session
 * @param name
 */
export const removeSession = (name) => {
    name = makeName(name)
    window.sessionStorage.removeItem(name)
}

/**
 * 清空session
 */
export const clearSession = () => {
    window.sessionStorage.clear()
}

/**
 * 设置local存储
 * @param name
 * @param value
 * @returns {boolean}
 */
export const setLocal = (name, value) => {
    if (!name) {
        return false
    }
    if (typeof value !== 'string') {
        value = JSON.stringify(value)
    }
    name = makeName(name)
    window.localStorage.setItem(name, value)
}

/**
 * 获取local 存储
 * @param name
 * @returns {string|*}
 */
export const getLocal = (name) => {
    name = makeName(name)
    let value = window.localStorage.getItem(name)
    if (value && value.length > 0) {
        let result
        try {
            result = JSON.parse(value)
        } catch (e) {
            result = value
        }
        return result
    }
    return value
}

export const getLocalBoolean = (name) => {
    name = makeName(name)
    let value = window.localStorage.getItem(name)
    if (value && value.length > 0) {
        let r = Number(value)
        if (isNaN(r)) {
            return !!(value)
        }
        return Boolean(r)
    }
    return true
}

/**
 * 移除local存储
 * @param name 键名
 */
export const removeLocal = (name) => {
    name = makeName(name)
    window.localStorage.removeItem(name)
}

/**
 * 清空local存储
 */
export const clearLocal = () => {
    Object.keys(window.localStorage).forEach(key => {
        if (key.startsWith(__prefix)) {
            removeLocal(key)
        }
    })
}

