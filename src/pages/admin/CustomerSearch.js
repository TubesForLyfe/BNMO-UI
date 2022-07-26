import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import Back from '../../images/Back.png'

const CustomerSearch = () => {
  const [search, setSearch] = useState('');
  const [customer, setCustomer] = useState([]);
  const [message, setMessage] = useState('');

  axios.defaults.withCredentials = true;

  const searchCustomer = (e) => {
    e.preventDefault();
    axios.get(`${process.env.REACT_APP_BNMO_API}/admin/customer-search/${search}`).then(response => {
        setCustomer(response.data);
        if (response.data.length == 0) {
            setMessage('Customer tidak ditemukan.');
        } else {
            setMessage('');
        }
    })
  }

  return (
    <div className='container'>
      <div className='row justify-content-center'>
        <div className='col-md-6 col-md-offset-4 border border-secondary mt-3 mb-3'>
            <br></br>
            <h4>Cari Customer</h4>
            <hr></hr>
            <Link to='/' className='left ms-2'><img src={Back} /></Link>
            <br></br>
            <br></br>
            <div className='form-group mx-5'>
                <label for='search' className='left'>Masukkan Nama Atau Username</label>
                <input type='text' className='form-control' name='search' onChange={e => setSearch(e.target.value)} />
            </div>
            <br></br>
            <div className='form-group'>
                <button className='btn btn-block btn-primary' onClick={searchCustomer}>Cari</button>
            </div>
            <br></br>
            {customer.length > 0 && <div className='mx-3'>
                <table className='table table-secondary text-center'>
                    <thead>
                        <tr>
                            <th>Nama</th>
                            <th>Username</th>
                            <th>Foto KTP</th>
                            <th>Saldo</th>
                        </tr>
                    </thead>
                    {customer.map((val, key) => {
                        return (
                            <tbody>
                                <tr>
                                    <td>{val.nama}</td>
                                    <td>{val.username}</td>
                                    <td><img className='w-75 h-75' src={`${process.env.REACT_APP_BNMO_API}/image/${val.image}`} /></td>
                                    <td>{val.saldo}</td>
                                </tr>
                            </tbody>
                        )
                    })}
                </table>
            </div>}
            <p className='text-danger'>{message}</p>
        </div>
      </div>
    </div>
  )
}

export default CustomerSearch
