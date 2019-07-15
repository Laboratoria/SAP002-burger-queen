import React from 'react';
import './Menu.css';
import menuData from './menuData';
import MenuItem from './MenuItem';
import MenuSelector from './MenuSelector';

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: menuData.filter(elem => elem.breakfast),
      breakfast: false
    };
    this.handleChangeMenu = this.handleChangeMenu.bind(this)
  }

  componentDidUpdate() {
    const isBreakfast = this.state.breakfast;
    if (this.state.menu[0].breakfast !== isBreakfast) {
      this.setState({
        menu: menuData.filter(elem => elem.breakfast === isBreakfast),
      })
    }
  }

  handleChangeMenu = (e, breakfast) => {
    const newMenuType = !this.state.breakfast
    if (this.state.breakfast !== breakfast) {
      this.setState({
        breakfast: newMenuType
      })
    }
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
        <MenuSelector onClick={this.handleChangeMenu} />
        <div className="Menu">
          {menuComponents}
        </div>
      </div>
    );
  }
}

export default Menu;
