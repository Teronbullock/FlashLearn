import Btn from '../../components/Btn/Btn';
import './section-form.scss';

// interface SectionFormProps {
//   formType: ;
// }


export default function SectionForm({ formType }:SectionFormProps): JSX.Element {
  const userRegistered = false;
  let sectionClass = '';

  if (userRegistered) {
    sectionClass = 'form-container--registered';
  }

  return (
    <section className={`container form-container py-12 ${sectionClass}`}>
      <div className='form form--small relative p-4'>
      {formType === 'register' ? (
        <>
          <Btn
            btnClass='btn-form-close'
            btnURL='/'
            btnType='anchor'>
            X
          </Btn>
          { userRegistered ? (
            <>
              <Btn
              btnClass='btn-form-close'
              btnURL='/'
              btnType='anchor'>
                X
              </Btn>
              <div className="form__header">
                <h3 className="form__title">
                  Thank you for registering with FlashCard!
                </h3>
                <Btn
                  btnClass='btn--tertiary'
                  btnURL='/login'
                >
                  Login
                </Btn>
              </div>
            </>
          ) : (
          <>
            <div className="form__header">
              <h2 className="form__title">
                Sign Up
              </h2>
            </div>
            <form className="form__body" method='POST' action='/register'>
              <div className="form__group mb-4">
                <label htmlFor="user_name" className="form__label">
                  Username:
                </label>
                <input type="text" className="form__input py-1 px-2" placeholder='bobby123' name='user_name' required />
              </div>
              <div className="form__group mb-4">
                <label htmlFor="user_email" className="form__label">
                  Email:
                </label>
                <input type="email" className="form__input py-1 px-2" placeholder='user@flashcard' name='user_email' required />
              </div>
              <div className="form__group mb-4">
                <label htmlFor="user_pass" className="form__label">
                  Password:
                </label>
                <input className="form__input py-1 px-2" type='password' placeholder='●●●●●●●●' name='user_pass' required pattern=".{8,}" title="8 characters minimum" />
                <label htmlFor="user_confirm_pass" className="form__label">
                  Confirm Password
                </label>
                <input className="form__input py-1 px-2" type='password' placeholder='●●●●●●●●' name='user_confirm_pass' required pattern=".{8,}" title="8 characters minimum" />
              </div>
              <div className="form__action">
                <Btn
                  btnClass='btn--large
                  btn--tertiary'
                  btnType='btn'
                  type='submit'
                  btnURL=''
                >
                  Sign Up
                </Btn>
              </div>
            </form>
          </>
          )}
        </>
      ) : formType === 'login' ? (
        <>
          <Btn
            btnClass='btn-form-close'
            btnURL='/'
            btnType='anchor'>X</Btn>
            <div className='form__header'>
            <h2 className='form__title'>
              Login
            </h2>
            <form action='/login' className='form__body' method='POST'>
              <div className='form__group mb-4'>
                <label htmlFor='user_name' className='form__label'>
                  Username:
                </label>
                <input type='text' name='user_name' className='form_input py-1 px-2' />
              </div>
              <div className='form__group mb-5'>
                <label htmlFor='user_pass' className='form__label'>
                  Password:
                </label>
                <input type='password' name='user_pass' className='form_input py-1 px-2' />
              </div>
              <div className="form__action">
                <Btn
                  btnClass='btn--large btn--tertiary'
                  btnURL='/'
                  type='submit'
                  btnType='btn'>Login</Btn>
              </div>
            </form>
          </div>
          </>
        ) : formType === 'profile' ? (
          <></>
        ) : null }
      </div>
    </section>
  );
}