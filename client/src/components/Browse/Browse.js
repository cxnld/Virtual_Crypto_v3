import axios from "axios"
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { populate } from '../../redux/actions'

import CoinTable from './CoinTable'
import CoinInfo from "./CoinInfo/CoinInfo"

import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles(theme => ({
    mainContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
    tableContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: 'auto',
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 15
    },
    pageContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5
    },
    loading: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 30
    }
}))

const Browse = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const sidebar = useSelector(state => state.browseSidebar)

    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=${page}&sparkline=false`)
        .then((res) => {
            dispatch(populate(res.data))
            setLoading(false)
        })
        .catch(() => alert('Something went wrong during retrieval.'))
    }, [page, dispatch])

    return (
        <div className={classes.mainContainer}>
            <div className={classes.tableContainer}>
                { !loading ? <CoinTable /> : <CircularProgress className={classes.loading} /> }

                <div className={classes.pageContainer}>
                    <ButtonGroup size="small">
                        <Button onClick={() => {setPage(page-1); setLoading(true)}} disabled={page === 1 ? true : false} >
                            <ChevronLeftIcon/>
                        </Button>
                        <Button onClick={() => {setPage(page+1); setLoading(true)}} >
                            <ChevronRightIcon/>
                        </Button>
                    </ButtonGroup>
                </div>
            </div>

            { sidebar.display && <CoinInfo/> }

        </div>
    )
}

export default Browse
