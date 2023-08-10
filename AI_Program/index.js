// 生成正则校验规则 区分邮箱、电话号码、身份证号码
function Regx(str) {
    let regx = ''
    switch (str) {
        case 'email':
            regx = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
            break
        case 'phone':
            regx = /^1[3456789]\d{9}$/
            break
        case 'idcard':
            regx = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
            break
    }
    return regx
}

// 打印测试结果
console.log(Regx('email').test('nihao@.com'))
console.log(Regx('phone').test('12345678901'))
console.log(Regx('idcard').test('123456789012345678'))

