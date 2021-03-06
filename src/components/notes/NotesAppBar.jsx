import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from "moment";
import { startSaveNotes, startUploading } from '../../actions/notes';
export const NotesAppBar = () => {
 const dispatch= useDispatch();
 const {active}= useSelector(state=>state.notes)
 const noteDate=moment(active.date)

 const handleSaveNote=()=>{
  dispatch(startSaveNotes(active))
 }
 const handlePictureClick=(e)=>{
    
    document.querySelector('#filePic').click();
 }
 const handleFileChange=(e)=>{
  const file=e.target.files[0]
  if(file){
    dispatch(startUploading(file))
  }
 }
  return (
    <div className='notes__appbar'>
            <span>{noteDate.format(' MMMM  DD[,] YYYY')}</span>
            <input 
            type="file"
            id='filePic'
            name='file'
            style={{display:'none'}}
            onChange={handleFileChange}
            />
            <div>
                <button className='btn'onClick={handlePictureClick}>Picture</button>
                <button className='btn'onClick={handleSaveNote}>Save</button>
            </div>
    </div>
  )
}
