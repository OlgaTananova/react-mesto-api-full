import {Link} from 'react-router-dom';
import useForm from '../utils/useForm';
import {useMemo} from 'react';

function Register({isLoading, onRegister}) {
  const initialValues = useMemo(()=>{return {email: '', password: ''}},[]);
  const {values, errors, isValid, handleChange} = useForm(initialValues);

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(values.password, values.email);
  }

  return (<div className={'auth page__auth'}>
    <form className={'auth-form'}
          name={'registration-form'}
          noValidate={true}
          onSubmit={handleSubmit}>
      <h2 className={'auth-form__heading'}>Регистрация</h2>
      <input className={'auth-form__input'}
             type={'email'}
             name={'email'}
             placeholder={'Email'}
             required={true}
             onChange={handleChange}
             value={values.email}/>
      <span className={'auth-form__input-error'}>{errors.email}</span>
      <input className={'auth-form__input'}
             type={'password'}
             name={'password'}
             placeholder={'Пароль'}
             required={true}
             onChange={handleChange}
             value={values.password}/>
      <span className={'auth-form__input-error'}>{errors.password}</span>
      <button type={'submit'}
              className={`auth-form__submit-button 
                ${(!isValid || isLoading) && 'auth-form__submit-button_inactive'}`}>
        {(!isLoading) ? 'Зарегистрироваться' : 'Регистрация ...'}
      </button>
      <p className={'auth-form__signin-link'}>Уже зарегистрированы?
        <Link to={'/sign-in'}
              className={'auth-form__signin-link auth-form__signin-link_active'}>Войти</Link>
      </p>
    </form>
  </div>)
}

export default Register
