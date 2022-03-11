import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { JournalScreen } from '../components/journal/JournalScreen'
import { AuthRouter } from './AuthRouter'

export const Approuter = () => {
    return (
        
            <Routes>
                <Route path='/auth/*' element={<AuthRouter />}></Route>
                <Route path='/' element={<JournalScreen />}></Route>
                <Route path='*' element={<AuthRouter />}></Route>
            </Routes>
        
    )
}
