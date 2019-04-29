import React from 'react';
import './index.css';

class Login extends React.Component {
    constructor(props) {
        super(props);
        let intv;
        this.state = {
            direction: 'ArrowUp', // 方向
            timeInterval: 150, // 游戏速度
            status: '开始',  // 游戏开始、暂停、未开始
            body: [
                [12, 12], [12, 13], [12, 14], [12, 15], [12, 16], [12, 17], [12, 18]
            ],
            food: [1, 1],
            score: 0
        }
    }
    
    componentDidMount() {
        document.addEventListener('keydown', this.handleDirection);
    }
    
    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleDirection);
    }
    
    head = () => {
        const { timeInterval, status } = this.state;
        switch(status) {
            case '开始':
                this.setState({status: '暂停'},()=>{
                    this.setFood();
                    this.intv = setInterval(()=> this.chessBoard(), timeInterval);
                });
                break;
            case '暂停':
                clearInterval(this.intv);
                this.setState({status: '继续'});
                break;
            case '继续':
                this.intv = setInterval(()=> this.chessBoard(), timeInterval);
                this.setState({status: '暂停'});
                break;
            default : break;
        }
    };
    
    chessBoard = () => {
        const { status } = this.state;
        if(status !== '暂停') {
            clearInterval(this.intv);
        } else {
            const board = document.getElementById('chessBoard');
            const ctx = board.getContext('2d');
            ctx.clearRect(0,0,400,400);
    
            // 处理body数组
            this.handleBody();
        }
    };
    
    handleBody = () => {
        const { direction, body, food, score } = this.state;
        const array = Object.assign([],body);
        const [x, y] = array[0];
        
        if(!this.isDead(direction)) {
            switch (direction) {
                case 'ArrowUp':
                    array.unshift([x, y - 1]);
                    break;
                case 'ArrowDown':
                    array.unshift([x, y + 1]);
                    break;
                case 'ArrowLeft':
                    array.unshift([x - 1, y]);
                    break;
                case 'ArrowRight':
                    array.unshift([x + 1, y]);
                    break;
                default: break;
            }
            
            if(x === food[0] && y === food[1]) {
                // 吃到食物  刷新食物位置
                this.setFood();
                this.setState({score: score +1});
            } else {
                array.pop();
            }
        } else {
            this.setState({status: '游戏结束'})
        }
        
        this.setState({body: array});
        // 画蛇
        this.paintBody(array);
    };
    
    paintBody = array => {
        const { food } = this.state;
        const board = document.getElementById('chessBoard');
        const ctx = board.getContext('2d');
        array.forEach(value => {
            ctx.fillStyle = "rgb(200,0,0)";
            ctx.fillRect (16*value[0], 16*value[1], 16, 16);
        });
        ctx.fillStyle = "green";
        ctx.fillRect(16 * food[0], 16 * food[1], 16, 16);
    };
    
    isDead = (direction) => {
        const { body } = this.state;
        const head = body[0];
        const checkOnBody = body.slice(1).some(snakeBody => snakeBody.toString() === head.toString());
        const directionJudge = {
            'ArrowUp': () => head[1] === 0,
            'ArrowDown': ()=> head[1] === 24,
            'ArrowLeft': () => head[0] === 0,
            'ArrowRight': () => head[0] === 24,
        };
        const checkOnWall = directionJudge[direction];
        if(checkOnWall() || checkOnBody){
            alert('菜虚鲲');
            clearInterval(this.intv);
            return true
        }else{
            return false
        }
    };
    
    // 设置食物位置
    setFood = () => {
        let foodX = ~~(Math.random() *25);
        let foodY = ~~(Math.random() *25);
        while( this.isCoincide([foodX, foodY])) {
            foodX = ~~(Math.random() *25);
            foodY = ~~(Math.random() *25);
        }
        this.setState({food: [foodX, foodY]})
    };
    
    isCoincide = array => {
        const { body } =this.state;
        return body.some(point => point.toString() === array.toString());
    };
    
    buttonDirection = (e, keyCode) => {
        e.code = keyCode;
        this.handleDirection(e);
    };
    
    restart = () => {
        clearInterval(this.intv);
        this.setState({
            direction: 'ArrowUp', // 方向
            status: '开始',  // 游戏开始、暂停、未开始
            body: [
                [12, 12], [12, 13], [12, 14], [12, 15], [12, 16], [12, 17], [12, 18]
            ],
            food: [1, 1]
        },()=>{
            this.head();
        })
    };
    
    // 处理键盘的事件 把方向存在state里
    handleDirection = (e) => {
        const { status, direction } = this.state;
        const presentDirection = e.code;
        if( status === '暂停' && (presentDirection === 'ArrowUp' || presentDirection === 'ArrowDown' || presentDirection === 'ArrowLeft' || presentDirection === 'ArrowRight')) {
            const directionChange = {
                'ArrowUp': d => d === 'ArrowLeft' || d === 'ArrowRight',
                'ArrowDown': d => d === 'ArrowLeft' || d === 'ArrowRight',
                'ArrowLeft': d => d === 'ArrowUp' || d === 'ArrowDown',
                'ArrowRight': d => d === 'ArrowUp' || d === 'ArrowDown',
            };
            const isChange = directionChange[presentDirection];
            if(isChange(direction)) {
                this.setState({direction: presentDirection})
            }
        }
    };
    
    render() {
        const {status, score} = this.state;
        
        return (
            <div>
                <canvas width='400px' height='400px' id='chessBoard' style={{background: 'black'}}>
                </canvas>
                <div className='operation'>
                    <button className='buttonStart' onClick={this.head} disabled={status === '游戏结束'}>{status}</button>
                    <button className='buttonTop' onClick={(e)=>{this.buttonDirection(e,'ArrowUp')}}>⬆️</button>
                    <button className='buttonMiddle' onClick={(e)=>{this.buttonDirection(e,'ArrowLeft')}}>⬅️</button>
                    <button className='buttonMiddle' style={{float: 'right'}} onClick={(e)=>{this.buttonDirection(e,'ArrowRight')}}>➡️</button>
                    <button className='buttonTop' onClick={(e)=>{this.buttonDirection(e,'ArrowDown')}}>⬇️</button>
                </div>
                <button onClick={this.restart}>重新开始</button>
                <span>得分: {score * 1000}</span>
            </div>
        )
    }
}

export default Login;