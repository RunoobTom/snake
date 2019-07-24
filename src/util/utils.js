// 把字符串转换为驼峰标准
export const toCamel = str => {
    return typeof str === 'string'
        ? str
            .split('_')
            .map(item => item.toLocaleLowerCase())
            .reduce(
                (pre, item, index) => {
                    if (item === '') {
                        return pre;
                    }
                    if (index === 0) {
                        return pre
                    } else {
                        return `${pre}${item[0].toLocaleUpperCase()}${item.slice(1)}`
                    }
                }
            )
        : str
};

// 生成五个不重复2～32随机数的数组
export const randomArray = (array, length, max, min) => {
    console.log(array, 'array');
    const randomNumber = Math.round(Math.random() * (max - min) + min);
    const newArray = array;
    if(newArray.indexOf(randomNumber) === -1 ) {
        newArray.push(randomNumber);
    }
    if(newArray.length === length) {
        return; //递归出口；为什么外面取不到return的值
    } else {
        randomArray(newArray, length, max, min);
    }
};