import React, {useState} from 'react'
import axios from 'axios'

function App() {

  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  const url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=f084b110c1254297bf650786d37062d9`
  //const url2 = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${location}&units=metric&appid=f084b110c1254297bf650786d37062d9`

  const searchLocation = (event) => {
    if(event.key === 'Enter'){
      axios.get(url).then((response) =>{
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }

  return (
    <div className="App">
      <div className='search'>
        <input 
        value = {location}
        onChange = {event => setLocation(event.target.value)} 
        placeholder="Enter location"
        onKeyPress={searchLocation} 
        type="text"/>
      </div>
      {data.name !== undefined &&
      <div className='container'>
        <div className='top'>
          <div className='location'>
            <p>{data.name}</p>
          </div>
          <div className='temperature'>
            {data.main ? <h1>{data.main.temp}°C</h1> : null}
          </div>
          <div className='description'>
          {data.main ? <h1>{data.weather[0].main}<img alt='' src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`}/>  </h1> : null}
          </div>
        </div>
        {data.name !== undefined &&
          <div className="bottom">
            <div className="feels">
              {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°C</p> : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} KM</p> : null}
              <p>Wind Speed</p>
            </div>
            <div className='temp_min'>
              {data.main ? <p className='bold'>{data.main.temp_min}°C</p> : null}
              <p>Min temp</p>
            </div>
            <div className='temp_min'>
              {data.main ? <p className='bold'>{data.main.temp_max}°C</p> : null}
              <p>Max temp</p>
              </div>
         </div>
        }
      </div>}
     
    </div>
  );
}

export default App;
