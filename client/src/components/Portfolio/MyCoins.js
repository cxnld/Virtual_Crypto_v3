import { useSelector, useDispatch } from 'react-redux'
import { set_browse_sidebar } from '../../redux_toolkit/browseSidebarSlice'

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    tableHeader: {
        fontWeight: 'bold'
    },
    image: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    }
}))

const MyCoins = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const coins = useSelector(state => state.portfolio.coins)

    return (
        <>
        {coins.length === 0 ?
            <Typography variant='h6'>You don't own any coins, head over to Browse to shop for coins.</Typography>
            :
            <Table>
                <TableHead>
                    <TableRow >
                        <TableCell align="left"     className={classes.tableHeader}>Name        </TableCell>
                        <TableCell align="center"   className={classes.tableHeader}>Quantity    </TableCell>
                        <TableCell align="right"    className={classes.tableHeader}>Avg Price   </TableCell>
                        <TableCell align="right"    className={classes.tableHeader}>Total Value </TableCell>
                    </TableRow>
                </TableHead>
                
                <TableBody>
                    {coins.map((coin) => (
                    <TableRow hover key={coin.coin_id} onClick={() => dispatch(set_browse_sidebar({ display: true, coin_id: coin.coin_id }))} style={{cursor: 'pointer'}}>
                        <TableCell align="left">{coin.coin_id}</TableCell>
                        <TableCell align="center">{coin.quantity}</TableCell>
                        <TableCell align="right">${coin.avg_price.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                        <TableCell align="right">${(coin.quantity*coin.current_price).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>

        }
        </>
    )
}

export default MyCoins
