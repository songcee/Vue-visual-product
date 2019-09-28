// 格式验证的方法集合

const validation = {
    // 沪深市场股票
    'hs_code': function (data) {
        let reg = /^(((002|000|300|600)[\d]{3})|60[\d]{4})$/
        if (reg.test(data)) {
            return true
        } else {
            return false
        }
    },
    // 年-月-日
    'YYYY-MM-DD': function (data) {
        let reg = /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/
        if (reg.test(data)) {
            return true
        } else {
            return false
        }
    }
}

export default validation