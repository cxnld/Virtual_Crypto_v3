import React from 'react'
import { Link, useHistory } from 'react-router-dom'

import { createStyles, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import { useDispatch } from 'react-redux'
import { sign_out, populatePortfolio, set_browse_sidebar, populate } from '../redux/actions'

const useStyles = makeStyles((theme) =>
    createStyles({
        title: {
            marginRight: theme.spacing(4)
        },
        navButtons: {
            marginRight: theme.spacing(2)
        },
        grow: {
            flexGrow: 1
        }
    })
)

const Nav = () => {
    const classes = useStyles() // #2E3B55 transparent
    const dispatch = useDispatch()
    const history = useHistory()

    const handleLogout = () => {
        history.push('/login')
        dispatch(sign_out())
        dispatch(populatePortfolio({ cash: 0, equity: 0, coins: [] }))
        dispatch(set_browse_sidebar({ display: false, coin_id: null }))
        dispatch(populate([]))
    }

    return (
        <AppBar position="static" style={{ background: '#2E3B55' }}>
            <Toolbar>
                <Typography variant="h5" className={classes.title}>Virtual Crypto</Typography>
                
                    <Button
                        color="inherit"
                        className={classes.navButtons}
                        startIcon={<MonetizationOnIcon/>}
                        component={Link} to='/home/portfolio'
                    >
                        Portfolio
                    </Button>

                    <Button
                        color="inherit"
                        className={classes.navButtons}
                        startIcon={<ShoppingCartIcon/>}
                        component={Link} to='/home/browse'
                    >
                        Browse
                    </Button>

                    <div className={classes.grow} />

                    <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </Toolbar>
        </AppBar>
    )
}

export default Nav
