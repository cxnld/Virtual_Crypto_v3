import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'

import Button from '@material-ui/core/Button'
import Alert from '@material-ui/lab/Alert'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import { useDispatch } from 'react-redux'
import { sign_in } from '../../redux_toolkit/isLoggedSlice'


const useStyles = makeStyles({
    form: {
        display: 'flex',
        flexDirection: 'column',
        height: 'auto',
        width: '300px',
        backgroundColor: 'white',
        padding: '35px',
        borderRadius: 15,
    },
    formChildren: {
        marginBottom: 15,
    }
})

const Login = () => {
    const classes = useStyles()
    const history = useHistory()
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [badLogin, setBadLogin] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault()
        const loginData = {
            email: email,
            password: password
        }
        axios.post('http://localhost:3001/auth/login', loginData)
        .then((res) => {
            //console.log(res.data)
            dispatch(sign_in(res.data))
            history.push({
                pathname: '/home',
            })
        })
        .catch(() => setBadLogin(true))
    }

    return (
        <form className={classes.form} onSubmit={handleSubmit}>
            <Typography className={classes.formChildren} variant='h4'>Login</Typography>
            <TextField className={classes.formChildren} type="email" label="Email" onChange={e => setEmail(e.target.value)} />
            <TextField className={classes.formChildren} type='password' label="Pasword" onChange={e => setPassword(e.target.value)} />
            {badLogin && <Alert severity="error" className={classes.formChildren}>Email or password is incorrect</Alert>}
            <Button className={classes.formChildren} type="submit" variant="contained" color="primary">Login</Button>

            <Link to="/register">
                <Typography className={classes.formChildren} variant='subtitle1'>
                    Don't have an account? Click to register.
                </Typography>
            </Link>
        </form>
    )
}

export default Login