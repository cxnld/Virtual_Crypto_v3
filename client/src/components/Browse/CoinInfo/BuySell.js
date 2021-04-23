import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react'
import axios from 'axios'

import { useSelector, useDispatch } from 'react-redux'
import { populate } from '../../../redux_toolkit/portfolioSlice'

import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Switch from '@material-ui/core/Switch'

const useStyles = makeStyles((theme) => ({
    mainContainer: { //backgroundColor: theme.palette.primary.light,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
    },
    textField: {
        margin: '0px 10px'
    },
    button: {
        color: 'white',
        backgroundColor: '#2E3B55',
        height: '50px',
        width: '55px',
        fontWeight: 'bold'
    }
}));

const BuySell = ({ coinInfo }) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const history = useHistory()
    const jwt = useSelector(state => state.isLogged.jwt)
    const [balance, setBalance] = useState(0)
    const [buyQuantity, setBuyQuantity] = useState('')
    const [totalCost, setTotalCost] = useState('')
    const [sellQuantity, setSellQuantity] = useState('')
    const [totalSale, setTotalSale] = useState('')
    const [toggle, setToggle] = useState(true)
    const [owned, setOwned] = useState(false)
    const [ownedQuantity, setOwnedQuantity] = useState('')

    function handleToggle() {
        setToggle(!toggle)
    }

    const onSubmitBuy = () => {
        if (!buyQuantity) {
            alert('Enter the amount of coin you want to buy.')
        } else {
            const data = {
                coin_id: coinInfo.id,
                quantity: +buyQuantity,
                price_paid_per: coinInfo.market_data.current_price.usd  
            }
            console.log(balance)
            if (data.quantity*data.price_paid_per > balance) {
                alert('You do not have enough money to purchase.')
            } else {
                alert('Purchase successful.')
                axios.post(`http://localhost:3001/buy/${coinInfo.id}`, data, {
                    headers: {
                        'Authorization': `Bearer ${jwt}`
                    }
                }).then(() => {
                    updatePortfolioState()
                    history.push('/home/portfolio')
                })
            }
        }
    }

    const onSubmitSell = () => {
        if (!sellQuantity) {
            alert('Enter the amount of coin you want to sell.')
        } else {
            const data = {
                coin_id: coinInfo.id,
                quantity: +sellQuantity,
                price_sold_per: coinInfo.market_data.current_price.usd  
            }
            if (data.quantity > ownedQuantity) {
                alert('You do not have enough coins to sell')
            } else {
                alert('Sale successful.')
                axios.post(`http://localhost:3001/sell/${coinInfo.id}`, data, {
                    headers: {
                        'Authorization': `Bearer ${jwt}`
                    }
                }).then(() => {
                    updatePortfolioState()
                    history.push('/home/portfolio')
                })
            }
        }
    }

    const updatePortfolioState = () => {
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
                dispatch(populate(portfolioData))
            })
        })
    }


    useEffect(() => {
        let mounted = true

        axios.get("http://localhost:3001/user_data", {
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        }).then((res) => {
            if (mounted) {
                setBalance(res.data.cash)
                for (var i=0; i<res.data.coins.length; i++) {
                    if (res.data.coins[i].coin_id === coinInfo.id) {
                        setOwnedQuantity(res.data.coins[i].quantity)
                        setOwned(true)
                    }
                }
            }
        })
        return () => mounted = false
    }, [coinInfo.id, jwt])

    return (
        <div className={classes.mainContainer}>
            {owned &&
                <Switch
                    onChange={handleToggle}
                    color="default"
                />
            }

            {toggle ?
                <form>
                    <TextField
                        className={classes.textField}
                        type='number'
                        label='Buy Quantity'
                        variant="outlined"
                        onChange={(event) => {
                            setBuyQuantity(event.target.value)
                            setTotalCost(event.target.value*coinInfo.market_data.current_price.usd)
                        }}
                    />
                    <TextField
                        className={classes.textField}
                        label='Total Cost'
                        variant="standard"
                        disabled={true}
                        value={`$${totalCost.toLocaleString()}`}
                    />
                    <Button className={classes.button} onClick={onSubmitBuy} >Buy</Button>
                </form>
            :
                <form>
                    <TextField
                        className={classes.textField}
                        type='number'
                        label='Sell Quantity'
                        variant="outlined"
                        onChange={(event) => {
                            setSellQuantity(event.target.value)
                            setTotalSale(event.target.value*coinInfo.market_data.current_price.usd)
                        }}
                    />
                    <TextField
                        className={classes.textField}
                        label='Total Sale'
                        variant="standard"
                        disabled={true}
                        value={`$${totalSale.toLocaleString()}`}
                    />
                    <Button className={classes.button} onClick={onSubmitSell}>Sell</Button>
                </form>
            }

        </div>
    )
}

export default BuySell
