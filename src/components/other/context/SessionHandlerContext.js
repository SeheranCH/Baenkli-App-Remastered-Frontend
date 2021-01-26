import React, { createContext, useState, useEffect } from "react";
import { useHistory } from 'react-router-dom'
import UserService from "../../../service/UserService";


const SessionHandlerContext = createContext();
export default SessionHandlerContext;


export const SessionHandlerContextProvider = (props) => {
    
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const history = useHistory();

    const setActiveUser = (user) => { 
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        // AuthorityService.initAuthoritySet(user);
    };

    // const setActiveUserAvatar = (avatar) => {
    //     setUser(user => ({...user, avatar}));
    // };

    const logout = () => {
        // RoleService.clearRoles();
        // AuthorityService.clearAuthorities();
        localStorage.clear();
        setUser(null)
        history.push("/login");
    };

    const login = (data) => {
         UserService.login(data)
              .then(res => {
                console.log('Show user info ', res);
                localStorage.setItem("token", res.headers["authorization"])
                let activeUser = res.data;
                delete activeUser.password;
                setActiveUser(activeUser)
                history.push('/');
              })
              .error(err => {
                  console.error('Error in SessionHandlerContext', err);
              });
    }

    const loadActiveUser = () => {
        setActiveUser(JSON.parse(localStorage.getItem('user')));
    };

    const isActiveUserAdmin = () => {
        if (user.roles[0]['name'] == 'USER'){
            return false;
        }
        else if(user.roles[0]['name'] == 'ADMIN'){
            return true;
        }

    };

    useEffect(() => {
        loadActiveUser();
        //eslint-disable-next-line
    }, []);

    return (
        <div>
            <SessionHandlerContext.Provider
                value={{
                    user,
                    setActiveUser,
                    login,
                    logout,
                    loadActiveUser,
                    isActiveUserAdmin
                }}
            >
                {props.children}
            </SessionHandlerContext.Provider>
        </div>
    );
};
