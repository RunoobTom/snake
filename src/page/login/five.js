import React from 'react';
import {Button} from 'antd';
import './five.scss';

class Five extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            black: [],
            white: [],
            blackRound: true,
        }
    }

    componentDidUpdate() {
        this.checkWinner();
    }

    checkWinner = () => {
        const { black, white, blackRound } = this.state;
        const array = blackRound ? white : black;
        // 不考虑算法性能 
        try{
            array.forEach(item => {
                const count = [0, 0 ,0, 0];
                for(let i = 1; i < 5; i++) {
                    if(black.indexOf(item + i) > -1) {
                        count[0] ++;
                    }        
                }
                for(let i = 1; i < 5; i++) {
                    if(black.indexOf(item + 15 * i) > -1) {
                        count[1] ++;
                    }        
                }
                for(let i = 1; i < 5; i++) {
                    if(black.indexOf(item + 15 * i + i) > -1) {
                        count[2] ++;
                    }        
                }
                for(let i = 1; i < 5; i++) {
                    if(black.indexOf(item + 15 * i - i) > -1) {
                        count[3] ++;
                    }        
                }
                if(count[0] === 4 || count[1] ===4 || count[2] === 4 || count[3] === 4) {
                    blackRound ? 
                        alert('白方胜')
                        :
                        alert('黑方胜');
                }
            });
            
        }
        catch(err) {
            console.log(err)
        }
    }
    

    renderChessContent = () => {
        const { black, white } = this.state;
        let render = [];
        for( let i = 0; i < 225; i++) {
            const isBlack = black.indexOf(i) > -1;
            const isWhite = white.indexOf(i) > -1;
            render.push(<FiveKey isBlack={isBlack} isWhite={isWhite} handleClick={this.handleClick} index={i} />);
        }
    
        return render;
    };

    handleClick = index => {
        const { blackRound, black, white } = this.state;
        if(black.indexOf(index) === -1 && white.indexOf(index) === -1) {
            blackRound ? black.push(index) : white.push(index);
            this.setState({blackRound: !blackRound, black, white});
        }
    };

    regret = () => {
        const { blackRound, black, white } = this.state;
        blackRound ? white.pop() : black.pop();
        this.setState({blackRound: !blackRound, black, white});
    };

    refresh = () => {
        this.setState({
            black: [],
            white: [],
            blackRound: true
        })
    };

    render() {
        const { blackRound } = this.state;
        return (
            <div>
                <div className='chess-board'>
                    {this.renderChessContent()}
                </div>
                <Button onClick={this.regret}>反悔</Button>
                <Button onClick={this.refresh}>重新开始</Button>
                {blackRound ? '黑棋回合' : '白棋回合'}
            </div>
        )
    }
}

export default Five;

class FiveKey extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { isBlack, isWhite, index, handleClick } = this.props;
        return (
            <div className='chess-grid' >
                <div className='chess-btn' style={{background: isBlack?'black':'', backgroundColor: isWhite ? 'white' :''}} onClick={()=>{handleClick(index);}}></div>
            </div>
        )
    }
}