import React from 'react'
import {SideBar} from './SideBar'
import { NothingSelected } from './NothingSelected'
import { NoteScreen } from '../notes/NoteScreen'
import { useSelector } from 'react-redux'
export const JournalScreen = () => {
  const {active}=useSelector(state=>state.notes)
  return (
    <div className='journal__main-content animate__animated animate__fadeIn'>
      <SideBar/>
      <main>
        {active ? <NoteScreen {...active}/>:<NothingSelected/>}
      </main>
    </div>
  )
}

