import Vue from 'vue';
import { extend } from 'vee-validate';
import { required, alpha_spaces, digits, email, required_if, numeric,min ,max,password,image,alpha_num} from 'vee-validate/dist/rules';
import { ValidationProvider, ValidationObserver } from 'vee-validate';

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

extend('required', {
  ...required,
  message: 'This field is required'
})

extend('required_if', {
  ...required_if,
  message: 'This field is required'
})


extend('alpha_num', {
  ...alpha_num,
  message: "This field must only contain alphabetic or numeric characters"
})

extend('alpha_spaces', {
  ...alpha_spaces,
  message: "This field must only contain alphabetic characters"
})

extend('digits', {
  ...digits,
  message: 'Please enter valid Mobile Number'
})
extend('email', {
  ...email,
  message: 'Please enter valid email address'
})

extend('numeric', {
  ...numeric,
  message: 'Please enter only numeric values'
})
extend('password', {
  params: ['target'],
  validate(value, { target }) {
    return value === target;
  },
  message: 'Password confirmation does not match'
});
extend('min', {
  ...min,
  message: 'Password should be minimum 8 characters'
});
extend('min12', {
  ...min,
  message: 'Aadhar number should be minimum 12 characters'
});
extend('max12', {
  ...max,
  message: 'Aadhar number should be minimum 12 characters'
});
extend('min10', {
  ...min,
  message: 'Enter valid Contact number'
});
extend('max10', {
  ...max,
  message: 'Enter valid Contact number'
});
extend('image', {
  ...image,
  message: 'This is required'
});
