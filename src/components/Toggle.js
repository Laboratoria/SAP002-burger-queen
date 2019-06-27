import React from 'react';

class Toggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: "saloon"
        }
    }
    
    render (){
        return (
            <div className="Align-toggle">
                <input className="Radio-toggle" type="radio" name="toggle" id="saloon" value="saloon" checked={this.state.selected === "saloon"} onChange={(e) => this.setState({ selected: e.target.value})}/>
                <input className="Radio-toggle" type="radio" name="toggle" id="kitchen" value="kitchen" checked={this.state.selected === "kitchen"} onChange={(e) => this.setState({ selected: e.target.value})}/>
                
                <label className="Toggle Toggle-order">
                    <span></span>
                    </label>
                <label htmlFor="saloon" className="Saloon-order">Salão</label>
                <label htmlFor="kitchen" className="Kitchen-order">Cozinha</label>   
            </div>
            );
        }
    }
    export default Toggle;