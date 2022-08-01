import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useCookies } from 'react-cookie'

import Back from '../../images/Back.png'

const CustomerSearch = () => {
  const [search, setSearch] = useState('');
  const [customer, setCustomer] = useState([]);
  const [message, setMessage] = useState('');
  const [cookies] = useCookies();

  axios.defaults.withCredentials = true;

  const searchCustomer = (e) => {
    e.preventDefault();
    if (search === '') {
        setMessage('Terdapat kolom yang kosong.');
    } else {
        axios.get(`${process.env.REACT_APP_BNMO_API}/admin/customer-search/${search}`, {
            headers: { 'Authorization': 'Bearer ' + cookies.bnmo_token}
        }).then(response => {
            setCustomer(response.data);
            if (response.data.length === 0) {
                setMessage('Customer tidak ditemukan.');
            } else {
                setMessage('');
            }
        })
    }
  }

  return (
    <div className='container'>
      <div className='row justify-content-center'>
        <div className='col-md-6 col-md-offset-4 border border-secondary mt-3 mb-3'>
            <br></br>
            <h4>Cari Customer</h4>
            <hr></hr>
            <Link to='/' className='left ms-2'><img alt='Back' src={Back} /></Link>
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
                                    <td><img className='w-75 h-75' alt={`${val.username}`} src={`${process.env.REACT_APP_BNMO_API}/image/${val.image}/${cookies.bnmo_token}`} /></td>
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
