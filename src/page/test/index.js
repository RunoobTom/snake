import React from 'react';

class Test extends React.Component {
    constructor(props){
        super(props);
        let newObj;
    }
    
    toSnake = obj => {
        for(let key in obj) {
            if(typeof(obj[key]) === 'object') {
                console.log(key);
                this.toSnake(obj[key]);
            } else {
                console.log(key)
            }
        }
    };
    
    render() {
        return(
            <div>
                <button onClick={()=>{this.toSnake({a:[1,2,3,4],b:{c:'qwe',d:'ewq',f:{t:'te'}}})}}>切换</button>
            </div>
        )
    }
}

export default Test;