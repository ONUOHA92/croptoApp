import React, { useState } from 'react'
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';

function App() {

  const [crypto, setcrypto] = useState("");
  const [img, setImage] = useState("")
  const [name, setName] = useState("")
  const [symbol, setSymbol] = useState("")
  const [link, setLink] = useState("")
  const [ngn, setNig] = useState("")
  const [usd, setUsd] = useState("")
  const [desc, setDesc] = useState("")
  
  



  const handleSubmit = () => {
    const url = "https://api.coingecko.com/api/v3/coins/" + crypto
    axios.get(url)
      .then(res => {
        const resData = res.data
        setImage(resData.image.large);
        setName(resData.name);
        setSymbol(resData.symbol)
        setLink(resData.links.homepage[0])
        setNig( "Nigeria : ₦ " + resData.market_data.current_price.ngn)
        setUsd("United state:  $"  + resData.market_data.current_price.usd)
        setDesc(JSON.stringify( resData.description.en))
      })

      .catch(error => console.log(error))
  }


  function createMarkUp() {
     return {__html: desc}
  }

  return (
    <div style={{ backgroundColor: "crimson", minHeight: "100vh" }} className="App">
      <h1 className="bg-info p-4">Crytocurrency Search</h1>
      <div className="d-flex justify-content-center">
        <div className="col-md-4 mt-5">
          <input type="text" value={crypto}
            className="form-control"
            onChange={(e) => setcrypto(e.target.value)}
            placeholder="Enter your cryptocurrency" required />
        </div>
      </div>

      <button onClick={handleSubmit} className="btn btn-secondary px-5 mt-4">Submit</button>

      <div className="mt-5 container justify-content-center">
        <div className="row">
        <div className="col-md-4 bg-success p-2 rounded">
          <img src={img} width="150" />
          <br />
          <h1 className="text-white">{name}</h1>
          <h2>{symbol}</h2>
          <h2><a className="text-white" href={link}>{link}</a></h2>
          <br />
          <br />
          <h2>{ngn}</h2>
          <h3>{usd}</h3>
        </div>
        <div className="text-white col-md-8 my-auto">
         <div dangerouslySetInnerHTML={createMarkUp()}>

         </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default App;
