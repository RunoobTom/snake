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


// 去除字符串中指定字符的最后一个
/*
    lastIndexOf获取index更加简单一点
    获取到index之后可以用slice来处理字符串
    
 */
export const removeLastChar = (str, char) => {
    let key = 0;
    str.split('').forEach((item, index) => {
        if(item === char) {
            key = index;
        }
    });
    return str.split('').filter((_, index) => index!==key).join('');
};

/*
    把大小写字符切换
    正则的test方法，或者使用A和Z的键值
 */
export const toggleUpLowCase = str => {
    return str.split('').map(item => /[A-Z]/.test(item) ? item.toLowerCase() : item.toUpperCase()).join('');
};

/* 
    把js数组转换为XML文件字符串 
*/
export const toXML = arr => {
    let str  = '<resources>\n';
    arr.forEach(item => {
        const content = item.content.replace('&', '&amp;')
        str += `<string name="${item.key}">${content}</string>\n`;
    })
    str += '</resources>';
    console.log(str)
}


