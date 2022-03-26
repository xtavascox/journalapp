import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NotesAppBar } from './NotesAppBar'
import { useForm } from "../../hooks/useForm";
import { activeNote, startDeleting } from '../../actions/notes';

export const NoteScreen = () => {
  const dispatch = useDispatch();
  const { active } = useSelector(state => state.notes);
  const [values, handleInputChange, reset] = useForm(active);
  const activeId = useRef(active.id)

  const { title, body, } = values;

  useEffect(() => {
    if (active.id !== activeId.current) {
      reset(active);
      activeId.current = active.id
    }
  }, [active, reset])

  useEffect(() => {
    dispatch(activeNote(values.id, values))

  }, [values, dispatch])

  const handleDelete=()=>{
    dispatch(startDeleting(activeId));
  }

  return (
    <div className='notes__main-content animate__animated animate__fadeInDown'>
      <NotesAppBar />

      <div className='notes__content'>
        <input type="text"
          placeholder='Some Awseome Title'
          className='notes__title-input'
          autoComplete='off'
          name='title'
          onChange={handleInputChange}
          value={title} />

        <textarea placeholder='What Happened Today'
          className='notes__textarea'
          name='body'
          onChange={handleInputChange}
          value={body}></textarea>
        <div className='notes__image'>
          {active.url && <img src={active.url} alt="imagen" />}
        </div>
      </div>

      <button className='btn btn-danger' onClick={handleDelete}>Delete</button>

    </div>
  )
}
