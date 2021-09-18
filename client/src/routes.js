import {Switch, Route, Redirect} from 'react-router-dom'
import { AuthPage } from './pages/AuthPage'
import { DetailPage } from './pages/DetailPage'

//hook what return routes depends on isAuth
export const useRoutes = isAuth => {
    if(isAuth){
        return (
            <Switch>
                <Route path='/logged' exact>
                    <DetailPage></DetailPage>
                </Route>
                <Redirect to='/logged'/>
            </Switch>
        )
    }

    return(
        <Switch>
            <Route path="/" exact>
                <AuthPage/>
            </Route>
            <Redirect to="/" />
        </Switch>
    )
}