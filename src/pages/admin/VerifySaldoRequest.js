import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import Back from '../../images/Back.png'

const VerifySaldoRequest = () => {
  const [unverifiedSaldoRequest, setUnverifiedSaldoRequest] = useState([]);
  const [message, setMessage] = useState('');
  const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BNMO_API}/admin/unverified-saldo-request`).then(response => {
        setUnverifiedSaldoRequest(response.data);
    })
  }, [])

  const acceptSaldoRequest = (username, created_at) => {
    axios.get(`${process.env.REACT_APP_BNMO_API}/admin/accept-saldo-request/${username}/${created_at}`).then(response => {
        setMessage(response.data.message);
        axios.get(`${process.env.REACT_APP_BNMO_API}/admin/unverified-saldo-request`).then(response => {
            setUnverifiedSaldoRequest(response.data);
        })
    })
  }

  const rejectSaldoRequest = (username, created_at) => {
    axios.get(`${process.env.REACT_APP_BNMO_API}/admin/reject-saldo-request/${username}/${created_at}`).then(response => {
        setMessage(response.data.message);
        axios.get(`${process.env.REACT_APP_BNMO_API}/admin/unverified-saldo-request`).then(response => {
            setUnverifiedSaldoRequest(response.data);
        })
    })
  }

  return (
    <div className='container'>
      <div className='row justify-content-center'>
        <div className='col-md-6 col-md-offset-4 border border-secondary mt-3 mb-3'>
            <br></br>
            <h4>Verifikasi Request Saldo Customer</h4>
            <hr></hr>
            <Link to='/' className='left ms-2'><img src={Back} /></Link>
            <br></br>
            <br></br>
            {unverifiedSaldoRequest.length > 0 && <div className='mx-3'>
                <table className='table table-secondary text-center'>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Tipe Request</th>
                            <th>Jumlah (IDR)</th>
                            <th>Waktu Request</th>
                            <th>Terima</th>
                            <th>Tolak</th>
                        </tr>
                    </thead>
                    {unverifiedSaldoRequest.map((val, key) => {
                        const created_at = new Date(val.created_at.split('.')[0]);
                        const time = val.created_at.split('.')[0].split(' ')[1];
                        const formatted_created_at = created_at.getDate() + ' ' + month[created_at.getMonth()] + ' ' + created_at.getFullYear() + ' ' + time;
                        
                        return (
                            <tbody>
                                <tr>
                                    <td>{val.username}</td>
                                    {val.type == 'tambah' && <td>Penambahan</td>}
                                    {val.type == 'kurang' && <td>Pengurangan</td>}
                                    <td>{val.jumlah}</td>
                                    <td>{formatted_created_at}</td>
                                    <td><button className='btn btn-primary' onClick={e => {
                                        e.preventDefault();
                                        acceptSaldoRequest(val.username, val.created_at);
                                    }}>Terima</button></td>
                                    <td><button className='btn btn-primary' onClick={e => {
                                        e.preventDefault();
                                        rejectSaldoRequest(val.username, val.created_at);
                                    }}>Tolak</button></td>
                                </tr>
                            </tbody>
                        )
                    })}
                </table>
            </div>}
            <p className='text-success'>{message}</p>
        </div>
      </div>
    </div>
  )
}

export default VerifySaldoRequest
