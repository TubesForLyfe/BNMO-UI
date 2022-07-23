import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { useCookies } from "react-cookie";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import CustomerHome from "./pages/customer/CustomerHome";

import AdminHome from "./pages/admin/AdminHome";
import VerifyAccount from "./pages/admin/VerifyAccount";

const RouteManager = () => {
    const [cookies, setCookies] = useCookies();

    return (
        <Router>
            <Switch>
                {cookies.bnmo_token == "adminmahbebas" && <div>
                    <Route path="/" exact component={AdminHome} />
                    <Route path="/verifikasi-akun-customer" component={VerifyAccount} />
                    <Route path="*">
                        <Redirect to="/" />
                    </Route>
                </div>}

                {cookies.bnmo_token != "adminmahbebas" && cookies.bnmo_token != null && <div>
                    <Route path="/" exact component={CustomerHome} />
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