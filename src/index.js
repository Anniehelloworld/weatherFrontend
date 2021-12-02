import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';
//import App from './App';
import reportWebVitals from './reportWebVitals';

class FlavorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '210200',
                  weatherInfo: {
                  }
        };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    //alert('Your favorite flavor is: ' + this.state.value);
    axios.get('http://localhost:8080/weather/getWeatherInfo', {
      params: { 
        city: this.state.value
      }
    })
        .then((res) => {
            console.log('成功！');
            this.setState({
              weatherInfo:res.data,
              
          })
        })
        .catch(error => {
            console.log(error)
        })
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          选择你想知道的天气情况城市：
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="210200">大连</option>
            <option value="210100">沈阳</option>
            <option value="210300">鞍山</option>
          </select>
        </label>
        <input type="submit" value="提交" />
        <div >city:   {this.state.weatherInfo.city}</div>
        <div >updatedTime:   {this.state.weatherInfo.updatedTime}</div>
        <div >weather:   {this.state.weatherInfo.weather}</div>
        <div>temperature:   {this.state.weatherInfo.temperature}</div>
        <div>wind:   {this.state.weatherInfo.wind}</div>
      </form>
      
     
    );
  }
}


ReactDOM.render(
  //<React.StrictMode>
  //  <App />
  //</React.StrictMode>,
  <FlavorForm />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
