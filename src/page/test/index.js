import React from 'react';
import './index.scss';

class Test extends React.Component {
    constructor(props){
        super(props);
        
    }
    
    render() {
        return (
            <div>
                <div className='grail'>
                    <div className="header"/>
                    <div className="content">
                        <div className="middle"/>
                        <div className="left"/>
                        <div className="right"/>
                    </div>
                    <div className="footer"/>
                </div>
                
                <div className='wing'>
                    <div className="header"/>
                    <div className="content">
                        <div className="middle">
                            <div className="inner-middle"/>
                        </div>
                        <div className="left"/>
                        <div className="right"/>
                    </div>
                    <div className="footer"/>
                </div>
            </div>
        );
    }
}

export default Test;