import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import './App.css'
import React from 'react'

// Resposável pela parte de navegação em react native e react js
import { HashRouter } from 'react-router-dom'

import Routes from './Routes'

import Logo from '../components/template/Logo'
import Nav from '../components/template/Nav'
import Footer from '../components/template/Footer'

export default props =>
    // Hash router é responsavel por colocar o hash dentro da url
    <HashRouter>
        <div className="app">
            <Logo />
            <Nav />
            {/* Routes passa a ser resposavel pelo home */}
            <Routes />
            <Footer />
        </div>
    </HashRouter>
    