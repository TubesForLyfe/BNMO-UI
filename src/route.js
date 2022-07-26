import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { useCookies } from "react-cookie";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import CustomerHome from "./pages/customer/CustomerHome";
import SaldoRequest from "./pages/customer/SaldoRequest";
import SaldoRequestHistory from "./pages/customer/SaldoRequestHistory";
import SaldoTransfer from "./pages/customer/SaldoTransfer";
import SaldoTransferHistory from "./pages/customer/SaldoTransferHistory";

import AdminHome from "./pages/admin/AdminHome";
import VerifyAccount from "./pages/admin/VerifyAccount";
import VerifySaldoRequest from "./pages/admin/VerifySaldoRequest";
import CustomerSearch from "./pages/admin/CustomerSearch";

const RouteManager = () => {
    const [cookies, setCookies] = useCookies();

    return (
        <Router>
            <Switch>
                {cookies.bnmo_token == "adminmahbebas" && <div>
                    <Route path="/" exact component={AdminHome} />
                    <Route path="/verifikasi-akun-customer" component={VerifyAccount} />
                    <Route path="/verifikasi-request-saldo-customer" component={VerifySaldoRequest} />
                    <Route path="/cari-customer" component={CustomerSearch} />
                    <Route path="*">
                        <Redirect to="/" />
                    </Route>
                </div>}

                {cookies.bnmo_token != "adminmahbebas" && cookies.bnmo_token != null && <div>
                    <Route path="/" exact component={CustomerHome} />
                    <Route path="/request-saldo" component={SaldoRequest} />
                    <Route path="/riwayat-request-saldo" component={SaldoRequestHistory} />
                    <Route path="/transfer-saldo" component={SaldoTransfer} />
                    <Route path="/riwayat-transfer-saldo" component={SaldoTransferHistory} />
                    <Route path="*">
                        <Redirect to="/" />
                    </Route>
                </div>}

                {cookies.bnmo_token == null && <div>
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="*">
                        <Redirect to="/login" />
                    </Route>
                </div>}
            </Switch>
        </Router>
    )
}

export default RouteManager;