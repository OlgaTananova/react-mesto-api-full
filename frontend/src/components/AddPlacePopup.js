import PopupWithForm from './PopupWithForm.js';
import useForm from '../utils/useForm';
import { useEffect, useMemo} from 'react';

function AddPlacePopup({onLoading, isOpen, onAddPlace, onClose}) {
  const initialValues = useMemo(() => {
    return {name: '', link: ''}
  }, [])
  const validation = useForm(initialValues);

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace(validation.values.name, validation.values.link);
  }

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

  useEffect(() => {
    !isOpen && validation.resetForm();
  }, [isOpen])


  return (<PopupWithForm name={'add-card-form'}
                         title={'Новое место'}
                         isOpen={isOpen}
                         onClose={onClose}
                         onSubmit={handleSubmit}
                         isValid={validation.isValid}
                         isLoading={onLoading}
                         defaultTitle={'Создать'}
                         loadingTitle={'Сохранение...'}>
      <div className={'popup__form-fieldset'}>
        <input type="text"
               className="popup__form-item popup__form-item_type_card-description"
               name="name"
               value={validation.values.name}
               onChange={validation.handleChange}
               placeholder="Название"
               id="card"
               minLength="2"
               maxLength="20"
               required/>
        <span className={`popup__input-error card-error
        popup__input-error_active`}>{validation.errors.name}</span>
        <input type="url"
               className="popup__form-item popup__form-item_type_image-link"
               name="link"
               value={validation.values.link}
               onChange={validation.handleChange}
               placeholder="Ссылка на картинку"
               id="link"
               required/>
        <span className={`popup__input-error link-error 
                       popup__input-error_active`}>{validation.errors.link}</span>
      </div>
    </PopupWithForm>)
}

export default AddPlacePopup