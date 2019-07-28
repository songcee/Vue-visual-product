const fun = {
  mergeObject(source, target) {
    // 合并对象，遇到对象则合并，其他覆盖
    let handler = function (source, target) {
      let keys = Object.keys(source)
      // 1.判断源对象是否需要处理
      if (keys.length) {
        keys.map(key => {
          // 源属性
          let item = source[key]
          // 1.1.target是否存在该属性，有则做处理，无则跳过
          let flag = target.hasOwnProperty(key)
          if (flag) {
            // 1.1.1.判断类型是否相等，同类型才可以执行覆盖
            if (typeof item === typeof target[key]) {
              // 1.2.不是对象则覆盖、是数组则覆盖
              if (typeof item !== 'object' || (typeof item === 'object' && item instanceof Array)) {
                source[key] = target[key]
                // 1.3.是对象则递归处理
              } else if (typeof item === 'object' && typeof target === 'object') {
                source[key] = handler(item, target[key])
              }
            }
          }
        })
      }
      return source
    }
    return handler(source, target)
  },

  // 将obj2中的值更新到对应的obj1上
  objAssign(obj1, obj2) {
    if (!obj1 || !obj2) return
    for (let i in obj2) {
      if (obj1.hasOwnProperty(i) && typeof obj1[i] != 'object') {
        obj1[i] = obj2[i]
      } else {
        this.objAssign(obj1[i], obj2[i])
      }
    }
  },

  // 判断是否为对象
  isObject(o) {
    return (typeof o === 'object' || typeof o === 'function') && o !== null
  },

  // 对象深拷贝
  deepClone(obj, hash = new WeakMap()) {
    if (!this.isObject(obj)) {
      return obj
    }
    // 查表
    if (hash.has(obj)) return hash.get(obj)

    let isArray = Array.isArray(obj)
    let cloneObj = isArray ? [] : {}
    // 哈希表设值
    hash.set(obj, cloneObj)

    let result = Object.keys(obj).map(key => {
      return {
        [key]: this.deepClone(obj[key], hash)
      }
    })
    return Object.assign(cloneObj, ...result)
  }
}

export default fun