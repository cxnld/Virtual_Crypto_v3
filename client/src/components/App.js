import { useEffect } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom';

import Login from './Auth/Login'
import Register from './Auth/Register'
import Content from './Content'

import { useSelector } from 'react-redux'

const style = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
}

function App() {
    const history = useHistory()

    // Check if user is logged in, if not, redirect to /login
    const loginStatus = useSelector(state => state.isLogged.status)

    useEffect(() => {
        if (!loginStatus) {
            history.push({
                pathname: '/login',
            })
        }
    })

    return (
        <div style={style}>
            <Switch>
                <Route path='/login' component={Login}></Route>
                <Route path='/register' component={Register}></Route>
                <Route path='/home' component={Content}></Route>
            </Switch>
        </div>
    )
}

export default App;
