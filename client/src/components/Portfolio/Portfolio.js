import { useEffect } from 'react'
import axios from 'axios'
import Graph from './Graph'
import MyCoins from './MyCoins'
import CoinInfo from '../Browse/CoinInfo/CoinInfo'

import { useSelector, useDispatch } from 'react-redux'
import { populatePortfolio } from '../../redux/actions'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
    mainContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
    portfolioContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 30
    },
    graphContainer: {
        margin: 30
    },
}))

const Portfolio = () => {
    const dispatch = useDispatch()
    const classes = useStyles()
    const jwt = useSelector(state => state.isLogged.jwt)
    const cash = useSelector(state => state.portfolio.cash)
    const equity = useSelector(state => state.portfolio.equity)
    const sidebar = useSelector(state => state.browseSidebar)

    useEffect(() => {
        axios.get('http://localhost:3001/user_data', {
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        }).then((res) => {
            let cash = res.data.cash            

            const requests = []
            let temp = res.data.coins

            for (const coin of temp) {
                requests.push(
                    axios.get(`https://api.coingecko.com/api/v3/coins/${coin.coin_id}?tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`)
                    .then((res) => {
                        coin.current_price = res.data.market_data.current_price.usd
                        return coin
                    })
                )
            }
            Promise.all(requests).then((coins) => {
                // calculate equity
                let equity = cash
                for (const coin of coins) {
                    equity += (coin.quantity * coin.current_price)
                }
            
                // set Redux state
                const portfolioData = {
                    cash: cash,
                    equity: equity,
                    coins: coins
                }
                dispatch(populatePortfolio(portfolioData))
            })
        })
    }, [jwt, dispatch])

    return (
        <div className={classes.mainContainer}>
            <div className={classes.portfolioContainer}>
                    <Typography variant='h3'>${equity.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</Typography>
                    <Typography variant='h6'>${cash.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} Available to trade</Typography>
                    <div className={classes.graphContainer}>
                        <Graph />
                    </div>
                    <MyCoins/>
            </div>
            
            { sidebar.display && <CoinInfo/> }
        </div>
    )
}

export default Portfolio
