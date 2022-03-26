import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { JournalScreen } from '../components/journal/JournalScreen'
import { AuthRouter } from './AuthRouter'
import { firebase } from "../firebase/firebaseConfig";
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import {  startLoadingNotes } from '../actions/notes';

export const Approuter = () => {

    const dispatch = useDispatch();
    const [checking, setChecking] = useState(true);
    const [isLogged, setIsLogged] = useState(false);
    useEffect(() => {
        firebase.auth().onAuthStateChanged(async(user) => {
            if (user?.uid) {
                dispatch(login(user.uid, user.displayName));
                setIsLogged(true)
                dispatch(startLoadingNotes(user.uid))
            } else {
                setIsLogged(false)
            }
            setChecking(false)
        })

    }, [dispatch])

    if (checking) {
        return (
            <>
                <h2>Wait .....</h2>
            </>
        )
    }

    return (

        <Routes>
            {!isLogged && <Route path='/auth/*' element={<AuthRouter />}></Route>}
            {!isLogged && <Route path='*' element={<AuthRouter />}></Route>}

            {isLogged && <Route path='/' element={<JournalScreen />}></Route>}
        </Routes>

    )
}
