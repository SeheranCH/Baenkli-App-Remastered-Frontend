import React, {useContext} from "react";
import { Route, Redirect } from "react-router-dom";
import SessionHandlerContext from "../context/SessionHandlerContext";



const SecureRoute = ( props) => {
    const {component: Component, authorities = [], showBackButton = true, ...rest} = props;
    const {user, isActiveUserAdmin} = useContext(SessionHandlerContext);


    const isAdminNeeded = () =>{
        if(authorities[0]=="admin" && isActiveUserAdmin()){
            return true
        }
        return false
    }

    const hasNeededAuthorities = authorities.length === 0 | isAdminNeeded();


    const isLoggedin = () => {
        let token = localStorage.getItem("token");
        if (!token) {
            return false;
        }
        return true
    };

    if(isLoggedin()){
        return (
            <Route
                {...rest}
                render={props => (
                    <div>
                        {hasNeededAuthorities ? (
                            <Component {...props}/>
                        ) : (
                            <Redirect to="/unauthorized"/>
                        )}
                    </div>
                )}
            />
        );
    }
    else{
        return (
            <Route
                {...rest} render={() => (
                <Redirect to={{ pathname: "/login"}} />
            )}
            />
        );
    }
}

export default SecureRoute;