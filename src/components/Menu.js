import React from 'react';
import './Menu.css';
import menuData from './menuData';
import MenuItem from './MenuItem';

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: menuData.filter(elem => !elem.breakfast),
    };

    this.handleChange = this.handleChange.bind(this)

  }

  handleChange = (e) => {
    const newMenuType = e.target.value
    this.setState({
      menu: menuData
        .filter(elem => elem.breakfast === eval(newMenuType)),
    })
  }

  render() {
    const menuComponents = this.state.menu.map(elem =>
      <MenuItem
        name={elem.name}
        price={elem.price}
        imgUrl={elem.imgUrl}
        key={elem.id}
        onClick={() => this.props.onClick(elem.id)}
      />
    )

    return (
      <div>
        <div className="container py-2">
          <select className="Menu-select mt-1" onChange={this.handleChange}>
            <option value={false}>Almoço</option>
            <option value={true}>Café da manhã</option>
          </select>
        </div>
        <div className="Menu d-flex container flex-wrap m-0">
          {menuComponents}
        </div>
      </div>
    );
  }
}

export default Menu;
