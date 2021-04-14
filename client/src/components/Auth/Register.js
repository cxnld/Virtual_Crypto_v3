import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'

import Button from '@material-ui/core/Button'
import Alert from '@material-ui/lab/Alert'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

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

const Register = () => {
    const classes = useStyles()
    const history = useHistory()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [cash, setCash] = useState(0)
    const [badEmail, setBadEmail] = useState(false)
    const [matchingPassword, setMatchingPassword] = useState(true)

    const handleSubmit = (event) => {
        event.preventDefault()
        if (password !== password2) { setMatchingPassword(false) }

        const registerData = {
            name: name,
            email: email,
            password: password,
            cash: cash
        }

        axios.post('http://localhost:3001/auth/register', registerData)
        .then((res) => {console.log(res)
            history.push({
                pathname: '/login',
            })
        })  
        .catch(() => setBadEmail(true))
    }

    return (
        <form className={classes.form} onSubmit={handleSubmit}>
            <Typography className={classes.formChildren} variant='h4'>Register</Typography>
            <TextField className={classes.formChildren} type="text" label="Name" onChange={e => setName(e.target.value)} />
            <TextField className={classes.formChildren} type="email" label="Email" onChange={e => setEmail(e.target.value)} />
            <TextField className={classes.formChildren} type='password' label="Pasword" onChange={e => setPassword(e.target.value)} />
            <TextField className={classes.formChildren} type='password' label="Re-enter Password" onChange={e => setPassword2(e.target.value)} />
            <TextField className={classes.formChildren} type='number' label="Starting Cash" onChange={e => setCash(e.target.value)} />
            {badEmail && <Alert severity="error" className={classes.formChildren}>Email or password is incorrect</Alert>}
            <Button className={classes.formChildren} type="submit" variant="contained" color="primary">Register</Button>
            {!matchingPassword && <Alert severity="error" className={classes.formChildren}>Passwords do not match</Alert>}

            <Link to="/">
                <Typography className={classes.formChildren} variant='subtitle1'>
                    Already have an account? Click to login.
                </Typography>
            </Link>
        </form>
    )
}

export default Register
