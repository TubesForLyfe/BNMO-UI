import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import Select from 'react-select';

import Back from '../../images/Back.png'

const SaldoTransfer = () => {
  const [username, setUsername] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('');
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [failMessage, setFailMessage] = useState('');

  axios.defaults.withCredentials = true;

  const transferSaldo = (e) => {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_BNMO_API}/customer/saldo-transfer`, {
      username: username,
      amount: parseFloat(amount),
      currency: currency
    }).then(response => {
      if (response.data.message) {
        setFailMessage(response.data.message);
        setSuccessMessage('');
      } else {
        setSuccessMessage(response.data);
        setFailMessage('');
      }
    })
  }

  useEffect(() => {
    // GET All Currency Data
    if (!("all_currency" in window.localStorage)) {
      var APILayerHeaders = new Headers();
      APILayerHeaders.append("apikey", process.env.REACT_APP_APILAYER_API_KEY);

      var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: APILayerHeaders
      };
      fetch(`${process.env.REACT_APP_APILAYER_API}/currency_data/list`, requestOptions).then(response => response.text())
        .then(result => {
          window.localStorage.setItem("all_currency", JSON.stringify(JSON.parse(result).currencies));
        });
    }

    const all_currency = JSON.parse(window.localStorage.getItem("all_currency"));
    const all_currency_key = Object.keys(all_currency);
    let currency_data = [];
    for (let i = 0; i < all_currency_key.length; i++) {
      currency_data.push({ value: all_currency_key[i], label: `${all_currency_key[i]} - ${all_currency[all_currency_key[i]]}` })
    }
    setCurrencyOptions(currency_data);
  }, [])

  return (
    <div className='container'>
      <div className='row justify-content-center'>
        <div className='col-md-4 col-md-offset-4 border border-secondary mt-3 mb-3'>
            <br></br>
            <h4>Transfer Saldo</h4>
            <hr></hr>
            <Link to='/' className='left ms-2'><img src={Back} /></Link>
            <br></br>
            <br></br>
            <div className='form-group'>
                <label for='username' className='left'>Username Pemilik Rekening Tujuan</label>
                <br></br>
                <input type='text' className='form-control' name='username' onChange={e => setUsername(e.target.value)} />
            </div>
            <div className='form-group'>
                <label for='amount' className='left'>Jumlah</label>
                <input type='text' className='form-control' name='amount' onChange={e => setAmount(e.target.value)} />
            </div>
            <div class='form-group'>
                <label for='money-type' className='left'>Jenis Mata Uang</label>
                <br></br>
                <Select options={currencyOptions} name='money-type' className='txt-left' placeholder='' onChange={e => setCurrency(e.value)} />
            </div>
            <br></br>
            <p className='text-danger'>{failMessage}</p>
            <p className='text-success'>{successMessage}</p>
            <div className='form-group'>
                <button className='btn btn-block btn-primary' onClick={transferSaldo}>Transfer</button>
            </div>
            <br></br>
        </div>
      </div>
    </div>
  )
}

export default SaldoTransfer
