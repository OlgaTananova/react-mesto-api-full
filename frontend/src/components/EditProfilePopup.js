import PopupWithForm from './PopupWithForm';
import {useContext, useEffect, useMemo} from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import useForm from '../utils/useForm';

function EditProfilePopup({onLoading, onClose, onUpdateUser, isOpen}) {
  const currentUser = useContext(CurrentUserContext);
  const initialValues = useMemo(() => ({name: '', about: ''}), [])
  const validation = useForm(initialValues);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser(validation.values.name, validation.values.about)
  }

  useEffect(() => {
    if (isOpen) {
      validation.setValues((prev) => ({
        ...prev,
        name: currentUser.name,
        about: currentUser.about
      }));
    } else {
      validation.resetForm()
    }
  }, [isOpen, currentUser])

  useEffect(()=>{
    if (!isOpen) return;
    function handleEscClose(e) {
      if (e.key === 'Escape') {
        onClose();
      }
    }
    document.addEventListener('keydown', handleEscClose);
    return ()=>{
      document.removeEventListener('keydown', handleEscClose);
    }
  }, [isOpen, onClose])

  return (<PopupWithForm name={'edit-profile-form'}
                         title={'Редактировать профиль'}
                         isOpen={isOpen}
                         onClose={onClose}
                         onSubmit={handleSubmit}
                         isLoading={onLoading}
                         isValid={validation.isValid}
                         defaultTitle={'Сохранить'}
                         loadingTitle={'Сохранение...'}>
      <div className={'popup__form-fieldset'}>
        <input type="text"
               className="popup__form-item popup__form-item_type_profile-name"
               name="name"
               value={validation.values.name}
               onChange={validation.handleChange}
               placeholder="Имя"
               id="nameInput"
               minLength="2"
               maxLength="40"
               required/>
        <span className={`popup__input-error name-input-error 
        popup__input-error_active`}>{validation.errors.name}</span>
        <input type="text"
               className="popup__form-item popup__form-item_type_profile-description"
               name="about"
               value={validation.values.about}
               onChange={validation.handleChange}
               placeholder="Род занятий"
               id="about-input"
               minLength="2"
               maxLength="200"
               required/>
        <span className={`popup__input-error description-input-error
       popup__input-error_active`}>{validation.errors.about}</span>
      </div>
    </PopupWithForm>)
}

export default EditProfilePopup