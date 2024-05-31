import { asyncHandler } from '../lib/utils.js';
import Users from '../models/users-model.js';


// get user register
export const getUserRegister = (req, res, next) => {
  res.json({ message: `User register route ${req}` });
};

// post user register
export const postUserRegister = asyncHandler(
  async (req, res, next) => {
    const formData = {
      user_name: req.body.user_name,
      user_email: req.body.user_email,
      user_pass: req.body.user_pass,
    };

    if (
      Object.values(formData).every(value => value !== null && value !== undefined && value !== '')
    ) {
      // confirm that user typed same password twice
      if (formData.user_pass !== req.body.user_confirm_pass) {  
        let err = new Error('Passwords do not match.');
        err.status = 400;
        return next(err);
      }

      // use schema method to insert document into PSQL 
        // await Users.create(formData);

        res.json({message: 'User registered successfully.'});
        console.log('User registered successfully.');
        return;

    } else {
      let err = new Error('All fields required.');
      err.status = 400;
      return next(err);
    }
  }
);

// get user login
export const getUserLogin = (req, res, next) => {
  res.render('login');
};


// post user login
export const postUserLogin = asyncHandler( 
  async (req, res, next) => {
console.log('req.body', req.body);
    if (req.body.user_name && req.body.user_pass) {
      Users.authenticate(
        req.body.user_name,
        req.body.user_pass,
        (error, user) => {

          if (error || !user) {
            const err = new Error('Wrong username or password.');
            err.status = 401;
            return next(err);
          } else {
            req.session.userID = user.ID;

            req.session.save((err) => {
              if (err) {
                console.log('Error saving session: ', err);
                return next(err);
              }
              console.log('User logged in successfully.');
              return res.json({url: `/home/${user.ID}`});
            });
            
          }
        }
      );
    
    } else {
      let err = new Error('Email and password are required.');
      err.status = 401;
      return next(err);
    }

  },
  'Error logging in: ',
  401
);


// get user logout
export const getUserLogOut = (req, res, next) => {
  if (req.session) {
    // delete session obj
    req.session.destroy( (err) => {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });

  } 

};

// get user home redirect
export const getUserHomeRedirect = asyncHandler(
  async (req, res, next) => {

    res.redirect(`/home/${req.session.userID}`);
  },
  'Error retrieving user data: ',
  500
);

// get user home
export const getUserHome = asyncHandler(
  async (req, res, next) => {
    res.render('home', { route: 'home' });
  },
  'Error retrieving user data: ',
  500
);

// get user profile
export const getUserProfile = asyncHandler(
  async (req, res, next) => {

    const user = await Users.findByPk(req.params.userID);
    const data = {
      user_name: user.user_name,
      user_email: user.user_email,
    };
  

    res.render('profile', data);
  },
  'Error retrieving user data: ',
  500
);

// put user profile
export const putEditProfile = asyncHandler(
  async (req, res, next) => {
    const { email, old_password, password, confirm_password  } = req.body;
    const userID = req.params.userID;
    const formData = {};

    if (!email && !old_password && !password && !confirm_password) {
      const err = new Error('All fields required.');
      err.status = 400;
      return next(err);
    }

    const user = await Users.findOne({ where: { ID: userID }}, { raw: true });
    const oldPasswordMath = Users.comparePassword(userID, old_password, user.user_pass);


    if (!oldPasswordMath ) {
      const err = new Error('Old password is incorrect.');
      err.status = 400;
      return next(err);
    }

 
    if (password !== confirm_password) {
      const err = new Error('Passwords do not match.');
      err.status = 400;
      return next(err);
    }

    formData.user_pass = password;
    formData.user_email = email;

    const updatedUser = await Users.update(formData, {
      where: { ID: userID }, 
      raw: true,
      individualHooks: true,
    });

  
    if (updatedUser[0] === 0) {
      const err = new Error('User not found.');
      err.status = 400;
      return next(err);
    } else {

      console.log('User updated successfully.');
      res.redirect(`/profile/${userID}`);
    }
    
    

  },
  'Error updating user data: ',
  500
);
