import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

import Back from '../../images/Back.png'

const SaldoTransferHistory = () => {
  const [username, setUsername] = useState('');
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState('');
  const [saldoTransfer, setSaldoTransfer] = useState([]);
  const [saldoTransferList, setSaldoTransferList] = useState([]);
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
        for (let i = (last - 1) * 10; i < min(saldoTransferList.length, last * 10); i++) {
            saldoHistory[saldoHistory.length] = saldoTransferList[i];
        }
        setSaldoTransfer(saldoHistory);
    }
  }

  const prevClick = (e) => {
    e.preventDefault();
    if (page > 1) {
        setPage(page - 1);
        const next = page - 1;
        let saldoHistory = [];
        for (let i = (next - 1) * 10; i < min(saldoTransferList.length, next * 10); i++) {
            saldoHistory[saldoHistory.length] = saldoTransferList[i];
        }
        setSaldoTransfer(saldoHistory);
    }
  }

  const nextClick = (e) => {
    e.preventDefault();
    if (page < lastPage) {
        setPage(page + 1);
        const next = page + 1;
        let saldoHistory = [];
        for (let i = (next - 1) * 10; i < min(saldoTransferList.length, next * 10); i++) {
            saldoHistory[saldoHistory.length] = saldoTransferList[i];
        }
        setSaldoTransfer(saldoHistory);
    }
  }

  const lastClick = (e) => {
    e.preventDefault();
    if (page < lastPage) {
        setPage(lastPage);
        const last = lastPage;
        let saldoHistory = [];
        for (let i = (last - 1) * 10; i < min(saldoTransferList.length, last * 10); i++) {
            saldoHistory[saldoHistory.length] = saldoTransferList[i];
        }
        setSaldoTransfer(saldoHistory);
    }
  }

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BNMO_API}/customer/profile`).then(response => {
        setUsername(response.data.username);
    })
    axios.get(`${process.env.REACT_APP_BNMO_API}/customer/saldo-transfer-history`).then(response => {
        setSaldoTransferList(response.data);
        setLastPage(parseInt((response.data.length - 1) / 10) + 1);
        let saldoHistory = [];
        for (let i = 0; i < min(10, response.data.length); i++) {
            saldoHistory[i] = response.data[i];
        }
        setSaldoTransfer(saldoHistory);
    })
  }, [])

  return (
    <div className='container'>
      <div className='row justify-content-center'>
        <div className='col-md-6 col-md-offset-6 border border-secondary mt-3 mb-3'>
            <br></br>
            <h4>Riwayat Transfer Saldo</h4>
            <hr></hr>
            <Link to='/' className='left ms-2'><img src={Back} /></Link>
            <br></br>
            <br></br>
            {saldoTransfer.length > 0 && <div className='mx-3'>
                <table className='table table-secondary text-center'>
                    <thead>
                        <tr>
                            <th>Username Pihak Kedua</th>
                            <th>Jumlah (IDR)</th>
                            <th>Waktu Transfer</th>
                        </tr>
                    </thead>
                    {saldoTransfer.map((val, key) => {
                        const created_at = new Date(val.created_at.split('.')[0]);
                        const time = val.created_at.split('.')[0].split(' ')[1];
                        const formatted_created_at = created_at.getDate() + ' ' + month[created_at.getMonth()] + ' ' + created_at.getFullYear() + ' ' + time;
                        
                        return (
                            <tbody>
                                <tr>
                                    {val.from_username == username && <td>{val.to_username}</td>}
                                    {val.to_username == username && <td>{val.from_username}</td>}
                                    {val.from_username == username && <td className='text-danger'>- {val.jumlah}</td>}
                                    {val.to_username == username && <td className='text-success'>+ {val.jumlah}</td>}
                                    <td>{formatted_created_at}</td>
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

export default SaldoTransferHistory
