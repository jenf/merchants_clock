import React, { Component } from 'react';
import './App.css';

class Start extends Component {
	render() {
		var winner=<div className="winner">{this.props.winner}</div>;
		if (this.props.winner=='logo') {
			winner=<div className='status'><img src="https://cf.geekdo-images.com/images/pic153968_t.jpg"/></div>;
		}
		return (
		<div>
		{winner}
		<button onClick={() => this.props.onClick()}>Begin the Clock!</button>
		</div>
		);
	}
}

class Clock extends Component {
	constructor(props) {
		super(props);
		this.state = {value:200, stop:50, delta: 10}
   	        this.pressed = this.pressed.bind(this);
	}

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      2000
    );
    document.addEventListener('click', this.pressed, false);
  }

  tick() {
     var newtime=this.state.value-this.state.delta;
     if (newtime < this.state.stop) {
	     if (this.state.stop==50) {
		     this.props.onTimeout();
	     }
	     else
	     {
		     this.props.onPressed(this.state.stop);
	     }
     }
     else
     {
     	this.setState({value:newtime, stop:this.state.stop, delta:this.state.delta});
     }
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
    document.removeEventListener('click', this.pressed, false);
  }

  pressed() {
	  if (this.state.value == 200 && this.state.stop==50) {
		  this.setState({value:400, stop: 200, delta: 10});
	  }
	  else {
		  this.props.onPressed(this.state.value);
	  }
  }

	render() {
		var extra='';
		if (this.state.value==200 && this.state.stop==50) {
			extra=', press to restart at $400';
		}
		return (<div>
			<div className='status'>Dutch auction till ${this.state.stop}{extra}</div>
			<button className="clock">${this.state.value}</button>
			</div>
		       );
	}
}

class App extends Component {
  constructor(props) {
	  super(props);
	  this.state = {winner: 'logo'}
  }

  beginClock() {
	  this.setState({winner: null});
  }

  clockTimeout() {
	  this.setState({winner: 'Nobody bid by $50'});
  }

  clockPressed(price) {
	  this.setState({winner: 'Won at $'+price});
  }

  render() {
    var mode=<Clock onTimeout={() => this.clockTimeout()} onPressed={(price) => this.clockPressed(price)} />;
    <Start onClick={() => this.beginClock()} />

    if (this.state.winner!==null) {
	    mode=<Start onClick={() => this.beginClock()} winner={this.state.winner}/>
    }
    return (
      <div className="App">
        <div className="App-header">
          Merchants of Amsterdam Clock
        </div>
	{mode}
      </div>
    );
  }
}

export default App;
