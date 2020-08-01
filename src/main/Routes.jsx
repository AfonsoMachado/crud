import React from 'react'
import { Switch, Route, Redirect } from "react-router"

import Home from '../components/home/Home'
import UserCrud from '../components/user/UserCrud'

/* As rotas fazem o mapeamento entre a url e o componente */

export default props =>
    <Switch>
        {/* Quando navegar pra o componente / , o componente Home é renderizado. Exact diz que tem que ser exatamente o / */}
        <Route exact path='/' component={Home} />
        <Route path='/users' component={UserCrud} />
        {/* Caso nenhuma das rotas anteriores seja usada, será redirecionado para o / */}
        <Redirect from='*' to='/' />
    </Switch>