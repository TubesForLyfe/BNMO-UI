import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

import Back from '../../images/Back.png'

const SaldoRequestHistory = () => {
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState('');
  const [saldoRequest, setSaldoRequest] = useState([]);
  const [saldoRequestList, setSaldoRequestList] = useState([]);
  const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  axios.defaults.withCredentials = true;

  const min = (a, b) => {
    if (a < b) {
      return a;
    } else {
      return b;
    }
  }

  const firstClick = (e) => {
    e.preventDefault();
    if (page > 1) {
        setPage(1);
        const last = 1;
        let saldoHistory = [];
        for (let i = (last - 1) * 10; i < min(saldoRequestList.length, last * 10); i++) {
            saldoHistory[saldoHistory.length] = saldoRequestList[i];
        }
        setSaldoRequest(saldoHistory);
    }
  }

  const prevClick = (e) => {
    e.preventDefault();
    if (page > 1) {
        setPage(page - 1);
        const next = page - 1;
        let saldoHistory = [];
        for (let i = (next - 1) * 10; i < min(saldoRequestList.length, next * 10); i++) {
            saldoHistory[saldoHistory.length] = saldoRequestList[i];
        }
        setSaldoRequest(saldoHistory);
    }
  }

  const nextClick = (e) => {
    e.preventDefault();
    if (page < lastPage) {
        setPage(page + 1);
        const next = page + 1;
        let saldoHistory = [];
        for (let i = (next - 1) * 10; i < min(saldoRequestList.length, next * 10); i++) {
            saldoHistory[saldoHistory.length] = saldoRequestList[i];
        }
        setSaldoRequest(saldoHistory);
    }
  }

  const lastClick = (e) => {
    e.preventDefault();
    if (page < lastPage) {
        setPage(lastPage);
        const last = lastPage;
        let saldoHistory = [];
        for (let i = (last - 1) * 10; i < min(saldoRequestList.length, last * 10); i++) {
            saldoHistory[saldoHistory.length] = saldoRequestList[i];
        }
        setSaldoRequest(saldoHistory);
    }
  }

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BNMO_API}/customer/saldo-request-history`).then(response => {
        setSaldoRequestList(response.data);
        setLastPage(parseInt((response.data.length - 1) / 10) + 1);
        let saldoHistory = [];
        for (let i = 0; i < min(10, response.data.length); i++) {
            saldoHistory[i] = response.data[i];
        }
        setSaldoRequest(saldoHistory);
    })
  }, [])

  return (
    <div className='container'>
      <div className='row justify-content-center'>
        <div className='col-md-6 col-md-offset-6 border border-secondary mt-3 mb-3'>
            <br></br>
            <h4>Riwayat Request Saldo</h4>
            <hr></hr>
            <Link to='/' className='left ms-2'><img src={Back} /></Link>
            <br></br>
            <br></br>
            {saldoRequest.length > 0 && <div className='mx-3'>
                <table className='table table-secondary text-center'>
                    <thead>
                        <tr>
                            <th>Tipe Request</th>
                            <th>Jumlah (IDR)</th>
                            <th>Waktu Request</th>
                            <th>Status</th>
                            <th>Waktu Verifikasi</th>
                        </tr>
                    </thead>
                    {saldoRequest.map((val, key) => {
                        const created_at = new Date(val.created_at.split('.')[0]);
                        const time = val.created_at.split('.')[0].split(' ')[1];
                        const formatted_created_at = created_at.getDate() + ' ' + month[created_at.getMonth()] + ' ' + created_at.getFullYear() + ' ' + time;

                        let formatted_verified_at = ''
                        if (val.verified_at) {
                            const verified_at = new Date(val.verified_at.split('.')[0]);
                            const time = val.verified_at.split('.')[0].split(' ')[1];
                            formatted_verified_at = verified_at.getDate() + ' ' + month[verified_at.getMonth()] + ' ' + verified_at.getFullYear() + ' ' + time; 
                        }
                        
                        return (
                            <tbody>
                                <tr>
                                    {val.type == 'tambah' && <td>Penambahan</td>}
                                    {val.type == 'kurang' && <td>Pengurangan</td>}
                                    <td>{val.jumlah}</td>
                                    <td>{formatted_created_at}</td>
                                    {val.status == '-' && <td className='bg-warning'></td>}
                                    {val.status == 'accepted' && <td className='bg-success'></td>}
                                    {val.status == 'rejected' && <td className='bg-danger'></td>}
                                    <td>{formatted_verified_at}</td>
                                </tr>
                            </tbody>
                        )
                    })}
                </table>
                <div className='d-flex flex-row justify-content-center pointer'>
                    <p onClick={prevClick}>{'<'}</p>
                    {page > 1 && <p className='ms-3' onClick={firstClick}>1</p>}
                    {page - 2 > 1 && <p className='ms-3'>..</p>}
                    {page - 1 > 1 && <p className='ms-3' onClick={prevClick}>{page - 1}</p>}

                    <p className='ms-3'><strong><u>{page}</u></strong></p>

                    {page + 1 < lastPage && <p className='ms-3' onClick={nextClick}>{page + 1}</p>}
                    {page + 2 < lastPage && <p className='ms-3'>..</p>}
                    {page != lastPage && <p className='ms-3' onClick={lastClick}>{lastPage}</p>}
                    <p className='ms-3' onClick={nextClick}>{'>'}</p>
                </div>
            </div>}
        </div>
      </div>
    </div>
  )
}

export default SaldoRequestHistory
