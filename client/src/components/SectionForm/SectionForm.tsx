import './SectionForm.scss';
import Btn from '../../components/Btn/Btn';
import BtnClose from '../../components/BtnClose/BtnClose';

interface SectionFormProps {
  formType: 'reg' | 'login' | 'profile';
}


export default function SectionForm({ formType }:SectionFormProps): JSX.Element {
  const userRegistered = false;
  let sectionClass = '';
  let formAction = '';
  let userID = '';

  if (userRegistered) {
    sectionClass = 'form-container--registered';
  }

  if (formType === 'reg') {
    formAction = '/register';
  } else if (formType === 'login') {
    formAction = '/login';
  } else if (formType === 'profile') {
    formAction = `${userID}/profile/?_method=PUT`;
  }

  return (
    <section className={`container form-container mt-[25%] ${sectionClass}`}>
      <div className='form relative p-4 w-full min-h-[450px] text-black bg-white my-0 mx-auto rounded-2xl border-solid border-white border-[3px] md:py-* md:px-20 md:max-w-[800px]'>
        <BtnClose />
        <div className='form__header'>
          <h2 className={`form__title mx-0 ${userRegistered ? 'my-8' : 'my-4'}`}>
            {formType === 'reg' ? 
              userRegistered ? 'Thank you for registering with FlashCard!' : 'Sign Up' : formType === 'login' ? 'Login' : 'Profile'
            }
          </h2>
        </div>
        {formType === 'reg' && userRegistered && (
          <div className='form__body mb-8'>
            <Btn
              btnClass='btn--tertiary'
              btnURL='/login'
            > 
              Login
            </Btn>
          </div>
        )}
        {(formType === 'reg' || formType === 'login' || formType === 'profile') && (
          <form className='form__body mb-8' method='POST' action={formAction}>
            {formType === 'reg' ? (
              <>
                <div className='form__group w-full mb-4'>
                  <label htmlFor='user_name' className='form__label w-full text-xl'>
                    Username:
                  </label>
                  <input type='text' className='form__input w-full text-black text-xl bg-white rounded-md border-solid border-2 border-black  outline-none md:mt-1 md:mx-0 md:mb-6 md:p-4 md:text-2xl   py-1 px-2' placeholder='bobby123' name='user_name' required />
                </div>
                <div className='form__group w-full mb-4'>
                  <label htmlFor='user_email' className='form__label w-full text-xl'>
                    Email:
                  </label>
                  <input type='email' className='form__input w-full text-black text-xl bg-white rounded-md border-solid border-2 border-black  outline-none md:mt-1 md:mx-0 md:mb-6 md:p-4 md:text-2xl   py-1 px-2' placeholder='user@flashcard' name='user_email' required />
                </div>
                <div className='form__group w-full mb-4'>
                  <label htmlFor='user_pass' className='form__label w-full text-xl'>
                    Password:
                  </label>
                  <input className='form__input w-full text-black text-xl bg-white rounded-md border-solid border-2 border-black  outline-none md:mt-1 md:mx-0 md:mb-6 md:p-4 md:text-2xl   py-1 px-2' type='password' placeholder='●●●●●●●●' name='user_pass' required pattern='.{8,}' title='8 characters minimum' />
                  <label htmlFor='user_confirm_pass' className='form__label w-full text-xl'>
                    Confirm Password
                  </label>
                  <input className='form__input w-full text-black text-xl bg-white rounded-md border-solid border-2 border-black  outline-none md:mt-1 md:mx-0 md:mb-6 md:p-4 md:text-2xl   py-1 px-2' type='password' placeholder='●●●●●●●●' name='user_confirm_pass' required pattern='.{8,}' title='8 characters minimum' />
                </div>
                <div className='form__action mt-2 md:mt-8'>
                  <Btn
                    btnClass='btn btn--large
                    btn--tertiary'
                    btnType='btn'
                    type='submit'
                    btnURL=''
                  >
                    Sign Up
                  </Btn>
                </div>
              </>
            ) : formType === 'login' ? (
              <>
              <div className='form__group w-full mb-4'>
                <label htmlFor='user_name' className='form__label w-full text-xl'>
                  Username:
                </label>
                <input type='text' name='user_name' className='form__input w-full text-black text-xl bg-white rounded-md border-solid border-2 border-black  outline-none md:mt-1 md:mx-0 md:mb-6 md:p-4 md:text-2xl   py-1 px-2' />
              </div>
              <div className='form__group w-full mb-5'>
                <label htmlFor='user_pass' className='form__label w-full text-xl'>
                  Password:
                </label>
                <input type='password' name='user_pass' className='form__input w-full text-black text-xl bg-white rounded-md border-solid border-2 border-black  outline-none md:mt-1 md:mx-0 md:mb-6 md:p-4 md:text-2xl   py-1 px-2' />
              </div>
              <div className='form__action mt-2 md:mt-8'>
                <Btn
                  btnClass='btn btn--large btn--tertiary'
                  btnURL='/'
                  type='submit'
                  btnType='btn'>Login</Btn>
              </div>
              </>
            ) : formType === 'profile' && (
              <>
                <div className='form__group w-full mb-4'>
                  <label htmlFor='username' className='form__label w-full text-xl'>
                    Username:
                  </label>
                  <input type='text' name='username' className='form__input w-full text-black text-xl bg-white rounded-md border-solid border-2 border-black  outline-none md:mt-1 md:mx-0 md:mb-6 md:p-4 md:text-2xl   py-1 px-2' disabled />
                </div>
                <div className='form__group w-full mb-5'>
                  <label htmlFor='email' className='form__label w-full text-xl'>
                    Email:
                  </label>
                  <input type='email' name='email' className='form__input w-full text-black text-xl bg-white rounded-md border-solid border-2 border-black  outline-none md:mt-1 md:mx-0 md:mb-6 md:p-4 md:text-2xl   py-1 px-2' required />
                </div>
                <div className='form__group w-full mb-5'>
                  <label htmlFor='old_password' className='form__label w-full text-xl'>
                    Old Password:
                  </label>
                  <input type='password' name='old_password' className='form__input w-full text-black text-xl bg-white rounded-md border-solid border-2 border-black  outline-none md:mt-1 md:mx-0 md:mb-6 md:p-4 md:text-2xl   py-1 px-2' required />
                </div>
                <div className='form__group w-full mb-5'>
                  <label htmlFor='password' className='form__label w-full text-xl'>
                    Password
                  </label>
                  <input type='password' className='form__input w-full text-black text-xl bg-white rounded-md border-solid border-2 border-black  outline-none md:mt-1 md:mx-0 md:mb-6 md:p-4 md:text-2xl  ' name='password' required pattern='.{8,}' title='8 characters minimum' />
                </div>
                <div className='form__group w-full mb-5'>
                  <label htmlFor='confirm_password' className='form__label w-full text-xl'>
                    Confirm Password:
                  </label>
                  <input type='password' name='confirm_password' className='form__input w-full text-black text-xl bg-white rounded-md border-solid border-2 border-black  outline-none md:mt-1 md:mx-0 md:mb-6 md:p-4 md:text-2xl   py-1 px-2' required pattern='.{8,}' title='8 characters minimum' />
                </div>
                <div className='form__action mt-2 md:mt-8'>
                  <Btn
                    btnClass='btn btn--large
                    btn--tertiary'
                    btnType='btn'
                    type='submit'
                    btnURL=''
                  >
                    Update
                  </Btn>
                </div>
              </>
            )}
          </form>
        )}
      </div>
    </section>
  );
}