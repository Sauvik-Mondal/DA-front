export default {
  methods: {
    validateEmailField(data) {
      const email = data.trim();
      const re = 
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (email !== "" && re.test(String(email).toLowerCase())) return true;
      else return false;
    },
    validatePasswordField(password) {
      if (password !== "" && password.length > 5) return true;
      else return false;
    },
    validateTextField(data) {
      const text = data.trim();
      if (text !== "" && text.match(/^[A-Za-z]+$/)) return true;
      else return false;
    },
    validateNumberField(num) {
      const data_str = num.toString().trim();
      if ( data_str !== "" && data_str.match(/^[0-9]+$/)) return true;
      else return false;
    },
    validateAlphaNumericField(data) {
      const text = data.trim();
      if (text !== "" && text.match(/^[\w\-\s]+$/i)) return true;
      else return false;
    },
    validatePhoneNumberField(num) {
      const data_str = num.toString().trim();
      if ( data_str !== "" && data_str.match(/^[6-9]{1}[0-9]{9}$/) && num.length==10) return true;
      else return false;
    },
  }
}