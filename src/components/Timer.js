import React from 'react';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      start: Date.now()
    };
  }

  tick() {
    this.setState(state => ({
      time: Date.now() - this.state.start
    }), 1);
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div>
        Tempo: {this.state.time}
      </div>
    );
  }
}

export default Timer;