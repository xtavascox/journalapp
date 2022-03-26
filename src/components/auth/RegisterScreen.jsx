import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import validator from 'validator'

import { useForm } from '../../hooks/useForm'
import { setError, removeError } from "../../actions/ui";
import { registerWithEmailPassword } from '../../actions/auth';

export const RegisterScreen = () => {
  const dispatch = useDispatch();
  const {msgError}=useSelector((state)=>state.UI)
  const [values, handleInputChange] = useForm({
    name: 'Gustavo Fajardo',
    email: 'gustavo@gmail.com',
    password: '123456',
    password2: '123456'
  })

  const { name, email, password, password2 } = values;

  const handleRegister = (e) => {
    e.preventDefault();

    if (validationForm()) {
      dispatch(registerWithEmailPassword(email,password,name));
    }
  }
  const validationForm = () => {
    if (name.trim().length === 0) {
      dispatch(setError('El nombre es requerido'))
      return false;
    } else if (!validator.isEmail(email)) {
      dispatch(setError('El correo es invalido'))
      return false
    } else if (password !== password2 || password.length < 5) {
      dispatch(setError('Las contraseñas no coinciden o no cumplen con el largo necesario'))
      return false
    }

    dispatch(removeError())

    return true;
  }
  return (
    <>
      <h3 className='auth__title mb-5'>Register</h3>
      <form onSubmit={handleRegister} className='animate__animated animate__fadeIn'>
        { msgError && <div className='auth__alert-error'>{msgError}</div>}
        <input type="text" placeholder='Name' name='name' className='auth__input' onChange={handleInputChange} value={name} />
        <input type="text" placeholder='Email' name='email' className='auth__input' onChange={handleInputChange} value={email} />
        <input type="password" placeholder='Password' name='password' className='auth__input' onChange={handleInputChange} value={password} />
        <input type="password" placeholder='Confirm Password' name='password2' className='auth__input' onChange={handleInputChange} value={password2} />
        <button type='submit' className='btn btn-primary btn-block mb-5'> Login</button>

        <Link to='/auth/login' className='link'>Already registered?</Link>
      </form>
    </>
  )
}
