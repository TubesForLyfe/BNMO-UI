import React from 'react'
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'

const AdminHome = () => {
  const [cookies, setCookies, removeCookies] = useCookies();

  const logout = () => {
    removeCookies('bnmo_token');
  }

  return (
    <div className='container'>
      <div className='row justify-content-center'>
        <div className='col-md-4 col-md-offset-4 border border-secondary mt-3 mb-3'>
            <br></br>
            <h4>Menu</h4>
            <hr></hr>
            <Link to='/verifikasi-akun-customer'><button className='btn btn-block btn-info'>Verifikasi Akun Customer</button></Link>
            <br></br>
            <br></br>
            <Link to='/verifikasi-request-saldo-customer'><button className='btn btn-block btn-info'>Verifikasi Request Saldo Customer</button></Link>
            <br></br>
            <br></br>
            <Link to='/cari-customer'><button className='btn btn-block btn-info'>Cari Customer</button></Link>
            <br></br>
            <br></br>
            <button className='btn btn-danger' onClick={logout}>Log Out</button>
            <br></br>
            <br></br>
        </div>
      </div>
    </div>
  )
}

export default AdminHome
