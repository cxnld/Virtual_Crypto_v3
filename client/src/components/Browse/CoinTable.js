import { useSelector, useDispatch } from 'react-redux'
import { set_browse_sidebar } from '../../redux/actions'

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles(theme => ({
    tableHeader: {
        fontWeight: 'bold'
    },
    image: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    red: {
        color: 'red'
    },
    green: {
        color: 'green'
    }
}))

const CoinTable = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const coins = useSelector(state => state.browse)

    return (
        <Table>
            <TableHead>
                <TableRow >
                    <TableCell align="center"   className={classes.tableHeader}>#       </TableCell>
                    <TableCell align="left"     className={classes.tableHeader}>        </TableCell>
                    <TableCell align="left"     className={classes.tableHeader}>Name    </TableCell>
                    <TableCell align="left"     className={classes.tableHeader}>Symbol  </TableCell>
                    <TableCell align="right"    className={classes.tableHeader}>Price   </TableCell>
                    <TableCell align="right"    className={classes.tableHeader}>24h     </TableCell>
                </TableRow>
            </TableHead>
            
            <TableBody>
                {coins.map((coin) => (
                <TableRow hover key={coin.name} onClick={() => dispatch(set_browse_sidebar({ display: true, coin_id: coin.id }))} style={{cursor: 'pointer'}}>
                    <TableCell align="center">  {coin.market_cap_rank}                                  </TableCell>
                    <TableCell align="right">   <Avatar src={coin.image} className={classes.image}/>    </TableCell>
                    <TableCell align="left">    {coin.name}                                             </TableCell>
                    <TableCell align="left">    {coin.symbol.toUpperCase()}                             </TableCell>
                    <TableCell align="right">   ${coin.current_price.toLocaleString()}                                   </TableCell>
                    <TableCell
                        align="right"
                        className={
                            coin.price_change_percentage_24h < 0 ?
                            classes.red : classes.green
                        }
                    >
                        {coin.price_change_percentage_24h}%
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default CoinTable
