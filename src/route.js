import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { useCookies } from "react-cookie";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import CustomerHome from "./pages/customer/CustomerHome";

import AdminHome from "./pages/admin/AdminHome";

const RouteManager = () => {
    const [cookies, setCookies] = useCookies();

    return (
        <Router>
            <Switch>
                {cookies.bnmo_token == "adminmahbebas" && <div>
                    <Route path="/home" component={AdminHome} />
                    <Route path="*">
                        <Redirect to="/home" />
                    </Route>
                </div>}

                {cookies.bnmo_token != "adminmahbebas" && cookies.bnmo_token != null && <div>
                    <Route path="/home" component={CustomerHome} />
                    <Route path="*">
                        <Redirect to="/home" />
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