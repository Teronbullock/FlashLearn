import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SectionForm.scss';
import Btn from '../../components/Btn/Btn';
import BtnClose from '../../components/BtnClose/BtnClose';
import axios from 'axios';

interface SectionFormProps {
  formType: 'reg' | 'login' | 'profile';
}


export default function SectionForm({ formType }:SectionFormProps): JSX.Element {
  const navigate = useNavigate();
  const userRegistered = false;
  let sectionClass = '';
  let userID = '';
  let formData = {};

  const [loginFormData, setLoginFormData] = useState({
    user_name: '',
    user_pass: '',
  });

  const [registerFormData, setRegisterFormData] = useState({
    user_name: '',
    user_email: '',
    user_pass: '',
    user_confirm_pass: '',
  });

  const [profileFormData, setProfileFormData] = useState({
    user_name: '',
    user_email: '',
    user_pass: '',
    user_confirm_pass: '',
  });
  

  if (userRegistered) {
    sectionClass = 'form-container--registered';
  }

  // interface FormObject {
  //   user_name: string;
  //   user_email: string;
  //   user_pass: string;
  //   user_confirm_pass: string;
  // }

  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let apiUrl = '';

    // set form data & api url based on form type
    switch (formType) {
      case 'reg':
        apiUrl = 'api/register';
        formData = registerFormData;

        if (registerFormData.user_pass !== registerFormData.user_confirm_pass) {
          console.log('passwords do not match');
          alert('Passwords do not match');
          return;
        }

        console.log('register', formData);
        break;
      case 'login':
        apiUrl = 'api/login';
        formData = loginFormData;
        break;
      case 'profile':
        apiUrl = 'api/profile';
        console.log('profile');
        break;
      default:
        console.log('default');
    }

    try {
      const res = await axios.post(apiUrl, formData);
      if (formType === 'login' && res.data) {
        console.log(res.data, 'success');
        navigate('/dashboard');
        
      } else if (formType === 'reg' && res.data) {
        console.log(res.data, 'success');
        alert('Registration successful');
      }
      
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }

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
          <form className='form__body mb-8' onSubmit={handleFormSubmit} >
            {formType === 'reg' ? (
              <>
                <div className='form__group w-full mb-4'>
                  <label htmlFor='user_name' className='form__label w-full text-xl'>
                    Username:
                  </label>
                  <input 
                    type='text'
                    className='form__input w-full text-black text-xl bg-white rounded-md border-solid border-2 border-black  outline-none md:mt-1 md:mx-0 md:mb-6 md:p-4 md:text-2xl   py-1 px-2' 
                    placeholder='bobby123' 
                    name='user_name' 
                    required
                    onChange={(e) => setRegisterFormData({
                      ...registerFormData,
                      user_name: e.target.value
                    })}
                    value={registerFormData.user_name}
                  />
                </div>
                <div className='form__group w-full mb-4'>
                  <label htmlFor='user_email' className='form__label w-full text-xl'>
                    Email:
                  </label>
                  <input 
                    type='email' 
                    className='form__input w-full text-black text-xl bg-white rounded-md border-solid border-2 border-black  outline-none md:mt-1 md:mx-0 md:mb-6 md:p-4 md:text-2xl   py-1 px-2' 
                    placeholder='user@flashcard' name='user_email' 
                    required
                    onChange={(e) => setRegisterFormData({
                      ...registerFormData,
                      user_email: e.target.value
                    })}
                    value={registerFormData.user_email}
                  />
                </div>
                <div className='form__group w-full mb-4'>
                  <label htmlFor='user_pass' className='form__label w-full text-xl'>
                    Password:
                  </label>
                  <input 
                    className='form__input w-full text-black text-xl bg-white rounded-md border-solid border-2 border-black  outline-none md:mt-1 md:mx-0 md:mb-6 md:p-4 md:text-2xl   py-1 px-2' 
                    type='password' 
                    placeholder='●●●●●●●●' 
                    name='user_pass' 
                    pattern='.{8,}' 
                    title='8 characters minimum'
                    required 
                    onChange={(e) => setRegisterFormData({
                      ...registerFormData,
                      user_pass: e.target.value
                    })}
                  />
                  <label htmlFor='user_confirm_pass' className='form__label w-full text-xl'>
                    Confirm Password
                  </label>
                  <input 
                    className='form__input w-full text-black text-xl bg-white rounded-md border-solid border-2 border-black  outline-none md:mt-1 md:mx-0 md:mb-6 md:p-4 md:text-2xl   py-1 px-2' 
                    type='password' 
                    placeholder='●●●●●●●●' name='user_confirm_pass' 
                    pattern='.{8,}' 
                    title='8 characters minimum' 
                    required 
                    onChange={(e) => setRegisterFormData({
                      ...registerFormData,
                      user_confirm_pass: e.target.value
                    })}
                  />
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
                <input 
                  type='text'
                  name='user_name'
                  className='form__input w-full text-black text-xl bg-white rounded-md border-solid border-2 border-black outline-none md:mt-1 md:mx-0 md:mb-6 md:p-4 md:text-2xl  py-1 px-2'
                  onChange={(e) => setLoginFormData({
                    ...loginFormData,
                    user_name: e.target.value
                  })} 
                  value={loginFormData.user_name}
                  required
                />
              </div>
              <div className='form__group w-full mb-5'>
                <label htmlFor='user_pass' className='form__label w-full text-xl'>
                  Password:
                </label>
                <input 
                  type='password' 
                  name='user_pass' 
                  className='form__input w-full text-black text-xl bg-white rounded-md border-solid border-2 border-black  outline-none md:mt-1 md:mx-0 md:mb-6 md:p-4 md:text-2xl   py-1 px-2'
                  onChange={(e) => setLoginFormData({
                    ...loginFormData,
                    user_pass: e.target.value
                  })}  
                  required
                />
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
                  <input 
                    type='text' 
                    name='username' 
                    className='form__input w-full text-black text-xl bg-white rounded-md border-solid border-2 border-black  outline-none md:mt-1 md:mx-0 md:mb-6 md:p-4 md:text-2xl py-1 px-2' disabled
                  />
                </div>
                <div className='form__group w-full mb-5'>
                  <label htmlFor='email' className='form__label w-full text-xl'>
                    Email:
                  </label>
                  <input 
                    type='email' 
                    name='email' 
                    className='form__input w-full text-black text-xl bg-white rounded-md border-solid border-2 border-black  outline-none md:mt-1 md:mx-0 md:mb-6 md:p-4 md:text-2xl   py-1 px-2' 
                    required
                    onChange={(e) => setProfileFormData({
                      ...profileFormData,
                      user_email: e.target.value
                    })}
                    value={profileFormData.user_email}
                  />
                </div>
                <div className='form__group w-full mb-5'>
                  <label htmlFor='old_password' className='form__label w-full text-xl'>
                    Old Password:
                  </label>
                  <input 
                    type='password'
                    name='old_password' 
                    className='form__input w-full text-black text-xl bg-white rounded-md border-solid border-2 border-black  outline-none md:mt-1 md:mx-0 md:mb-6 md:p-4 md:text-2xl   py-1 px-2' 
                    required
                    onChange={(e) => setProfileFormData({
                      ...profileFormData,
                      user_pass: e.target.value
                    })}
                  />
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
                  <input 
                    type='password' 
                    name='confirm_password' className='form__input w-full text-black text-xl bg-white rounded-md border-solid border-2 border-black  outline-none md:mt-1 md:mx-0 md:mb-6 md:p-4 md:text-2xl   py-1 px-2'
                    pattern='.{8,}' 
                    title='8 characters minimum' 
                    required 
                    onChange={(e) => setProfileFormData({
                      ...profileFormData,
                      user_confirm_pass: e.target.value
                    })}
                  />
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