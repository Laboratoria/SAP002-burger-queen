import React from 'react';
import './Menu.css';

class MenuSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakfast: false,
    };
  }
  changeMenu = (e, param) => {
    this.props.onClick(e, param);
    if (param !== this.state.breakfast) {
      const breakfast = !this.state.breakfast
      this.setState({ breakfast })
    }
  }
  render() {

    return (
      <div className="">
        <button
          onClick={(e) => this.changeMenu(e, false)}
          className={`Menu-button ${this.state.breakfast ? "Menu-active" : "Menu-not-active"}`}>
          Almoço
        </button>
        <button onClick={(e) => this.changeMenu(e, true)}
          className={`Menu-button ${this.state.breakfast ? "Menu-not-active" : "Menu-active"}`}>
          Café da manhã
        </button>
      </div>
    )
  }
}

export default MenuSelector