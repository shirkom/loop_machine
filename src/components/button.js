import {Component} from 'react'
import './button.css'

class Button extends Component {
    state = {
        value: false,
    }
    render()
    {   
        let className = this.state.value ? "Button ButtonOn" : "Button ButtonOff";

        return (
        
            <div className={className} onClick={e => {
                this.props.onClick(!this.state.value);
                this.setState({value: !this.state.value});
            }}>
            
                <img className='Img' src={this.props.img}></img>    
            </div>
        ) 
    }
}

export default Button

