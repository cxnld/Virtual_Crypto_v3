import {useState, useEffect} from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { set_browse_sidebar } from '../../../redux_toolkit/browseSidebarSlice'

import BuySell from './BuySell'

import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'

import { Line } from 'react-chartjs-2'

const useStyles = makeStyles(theme => ({
    mainContainer: {
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: 5,
        padding: '20px 30px',
        marginLeft: 10,
        height: '100%'
    },
    title: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: theme.spacing(4),
        height: theme.spacing(4),
        marginRight: 15
    },
    coinStats: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    statsGroup: {
        margin: 15
    },
    textGroup: {
        margin: '5px'
    },
    pos: {
        color: 'green'
    },
    neg: {
        color: 'red'
    },
    graphDiv: {
        padding: 15
    }
}))

const CoinInfo = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const coin_id = useSelector(state => state.browseSidebar.coin_id)

    const [loading1, setLoading1] = useState(true)
    const [loading2, setLoading2] = useState(true)
    const [coinInfo, setCoinInfo] = useState({})
    const [graphData, setGraphData] = useState([])
    const [labelData, setLabelData] = useState([])

    useEffect(() => {
        let mounted = true
        // set to loading before you call api, re-rendering for another coin does not reset the states to original
        // otherwise ui would try to render a coin that hasnt been loaded yet
        setLoading1(true)
        setLoading2(true)

        axios.get(`https://api.coingecko.com/api/v3/coins/${coin_id}?tickers=false`)
        .then((res) => {
            if (mounted) {
                setCoinInfo(res.data)
                setLoading1(false)
            }

            const end = Math.round((Date.now()/1000))
            const start = Math.round((Date.now()/1000))-2592000
            axios.get(`https://api.coingecko.com/api/v3/coins/${coin_id}/market_chart/range?vs_currency=usd&from=${start}&to=${end}`)
            .then((res) => {
                const data = res.data.prices.map((item) => {
                    return {x: item[0], y: item[1]}
                })
                const label = res.data.prices.map((item) => {
                    var date = new Date(item[0])
                    return `${date.getMonth()}-${date.getDate()}`
                })
                if (mounted) {
                    setGraphData(data)
                    setLabelData(label)
                    setLoading2(false)
                }
            })
            .catch(() => { alert('Something went wrong during retrieval2.') })
        })
        .catch(() => { alert('Something went wrong during retrieval1.') })

        
        
    }, [coin_id])
    
    const handleClose = () => {
        dispatch(set_browse_sidebar({ display: false, coin_id: null }))
    }

    const sign = (value) => {
        return(value > 0 ? classes.pos : classes.neg)
    }

    return (
        <div className={classes.mainContainer}>
            <Button onClick={handleClose}>Close</Button>
            {(loading1 && loading2) ?
                <CircularProgress className={classes.loading} />
                :
                <div>
                    <div className={classes.title}>
                        <Avatar src={coinInfo.image.thumb} className={classes.image}/>
                        <Typography variant='h4'>{coinInfo.name} ({coinInfo.symbol.toUpperCase()})</Typography>
                    </div>

                    <div className={classes.coinStats}>
                        <div className={classes.statsGroup}>
                            <div className={classes.textGroup}>
                                <Typography variant='h6'>Market Cap:</Typography>
                                <Typography variant='body1'>${coinInfo.market_data.market_cap.usd.toLocaleString()}</Typography>
                            </div>
                            <div className={classes.textGroup}>
                                <Typography variant='h6'>Current Price:</Typography>
                                <Typography variant='body1'>${coinInfo.market_data.current_price.usd.toLocaleString()}</Typography>
                            </div>
                        </div>

                        <div className={classes.statsGroup}>
                            <div className={classes.textGroup}>
                                <Typography variant='h6'>7d Change:</Typography>
                                <Typography
                                    variant='body1'
                                    className={sign(coinInfo.market_data.price_change_percentage_7d)}
                                >
                                    {coinInfo.market_data.price_change_percentage_7d}%
                                </Typography>                       
                            </div>
                            <div className={classes.textGroup}>
                                <Typography variant='h6'>30d Change:</Typography>
                                <Typography
                                    variant='body1'
                                    className={sign(coinInfo.market_data.price_change_percentage_30d)}
                                >
                                    {coinInfo.market_data.price_change_percentage_30d}%
                                </Typography>
                            </div>
                        </div>

                    </div>
                    
                    <div className={classes.graphDiv}>
                        <Line
                            data={{
                                labels: labelData,
                                datasets: [{
                                    data: graphData,
                                    pointRadius: 0.01,
                                    borderColor: 'rgba(48, 164, 223, 1)',
                                    backgroundColor: 'rgba(48, 164, 223, 0)',
                                    borderWidth: 1.2
                                }]
                            }}
                            height={300}
                            options={{ maintainAspectRatio: false, responsive: true, legend: false}}
                        />
                    </div>

                    <BuySell coinInfo={coinInfo}/>

                </div>

            }
        </div>
    )
}

export default CoinInfo

/*
<div className={classes.textGroup}>
    <Typography variant='h6'>24h Change:</Typography>
    <Typography
        variant='body1'
        className={sign(coinInfo.market_data.price_change_percentage_24h)}
    >
        {coinInfo.market_data.price_change_percentage_24h}%
    </Typography>                        
</div>
*/