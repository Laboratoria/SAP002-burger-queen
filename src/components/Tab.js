import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

class TabMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          condition: true
        };
      }
    
      handleClick = () => {
        this.setState({
          condition: !this.state.condition
        })
      }
      
      render(){
        return (
    <Tabs>
      <TabList className="nav-container">
        <Tab className={ this.state.condition ? "nav-link active tab-left" : "nav-link disabled rab-left" }
                onClick={ this.handleClick }> 
              <h3>{this.props.text1}</h3>
              </Tab>
              <Tab className={ this.state.condition ? "nav-link disabled tab-right" : "nav-link active tab-right" }
                onClick={ this.handleClick }>   
              <h3>{this.props.text2}</h3>
              </Tab>
            </TabList>
          <TabPanel>
          {
              this.props.content1
          }
          </TabPanel>
          <TabPanel> 
              {
                  this.props.content2
              }
        
          </TabPanel>  
         </Tabs>
    )
      }
}


export default TabMenu;