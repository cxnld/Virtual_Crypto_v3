import { Switch, Route, Redirect } from 'react-router-dom'
import Nav from './Nav'
import Browse from './Browse/Browse'
import Portfolio from './Portfolio/Portfolio'

const style = {backgroundColor: '#E5E5E5',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
}
const style2 = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
}

const Content = () => {
    return (
        <div style={style}>
            <Nav/>
            <div style={style2}>
                <Switch>
                    <Redirect from="/home" to="/home/portfolio" exact/> 
                    <Route path='/home/portfolio' exact component={Portfolio}></Route>
                    <Route path='/home/browse' exact component={Browse}></Route>
                </Switch>
            </div>
        </div>
    )
}

export default Content

/*

                <Route path='/browse/:id' exact component={CoinInfo}></Route>
*/