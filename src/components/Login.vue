<template>
  <div>
    <base-dialog
      :show="hasError"
      title="Something went wrong!"
      @close="hasError = false"
      >{{ errorMessage }}</base-dialog
    >
    <base-dialog
      :show="signedUp"
      title="Successfully Signed up"
      @close="signedUp = false"
      >Login again to continue</base-dialog
    >
    <div v-if="isloading"><base-spinner></base-spinner></div>
    <v-card class="mx-auto container" max-width="500" v-else>
      <v-spacer></v-spacer>
      <v-card-title>Digital Aristotle</v-card-title>
      <v-spacer></v-spacer>
      <v-card-subtitle>Login or Sign Up</v-card-subtitle>
      <form class="form-group">
        <div class="form-field">
          <label for="email">Email:</label>
          <input type="email" id="email" name="email" v-model.trim.lazy="form1.email" />
          <p class="error-red" v-show="!emailOk">Please enter a valid email</p>
        </div>
        <div class="form-field">
          <label for="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            v-model.trim.lazy="form1.password"
          />
          <p class="error-red" v-show="!passwordOk">
            Please enter a valid password of atleast 6 characters
          </p>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="orange lighten-2" text @click="welcomeUser"
            >Login</v-btn
          >
          <v-btn color="orange lighten-2" text @click="createUser" 
            >Sign Up</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </form>
    </v-card>
  </div>
</template>

<script>
import FieldValidatorMixin from "../mixins/FieldValidatorMixin.js";
export default {
  data() {
    return {
      form1: {
        email: "",
        password: "",
        isClean:true,
      },
      hasError: false,
      errorMessage: null,
      isloading: false,
      signedUp: false,
    };
  },
  computed: {
    emailOk() {
      return this.form1.isClean || this.validateEmailField(this.form1.email);
    },
    passwordOk() {
      return this.form1.isClean || this.validatePasswordField(this.form1.password);
    },
  },
  methods: {
    form1Ok() {
      this.form1.isClean=false;
      return this.emailOk && this.passwordOk;
    },
    async welcomeUser() {
      if(!this.form1Ok()) return;
      this.isloading = true;
      try {
        await this.$store.dispatch("loginUser", {
          email: this.form1.email,
          password: this.form1.password,
        });
        this.$router.push("/coachList");
      } catch (err) {
        this.errorMessage = err;
        this.hasError = true;
      } finally {
        this.isloading = false;
        this.resetAll();
      }
    },
    async createUser() {
      // event.preventDefault();
      if(!this.form1Ok()) return;
      this.isloading = true;
      try {
        await this.$store.dispatch("createUser", {
          email: this.form1.email,
          password: this.form1.password,
        });
        this.signedUp = true;
      } catch (err) {
        this.errorMessage = err;
        this.hasError = true;
      } finally {
        this.isloading = false;
        this.resetAll();
      }
    },
    resetAll() {
      this.form1.email = "";
      this.form1.password = "";
      this.form1.isClean=true;
    },
  },
  mixins: [FieldValidatorMixin],
};
</script>

<style scoped>
.container {
  margin-bottom: 20px;
  margin-top: 20px;
  padding-top: 20px;
  background-color: rgb(230, 230, 230);
}
.form-field {
  padding: 10px 20px 10px 20px;
}
input,
select {
  width: 60%;
  padding: 2px 5px;
  margin: 2px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
input[type="radio"] {
  width: 20px;
}
textarea {
  height: 50px;
  width: 320px;
  border: 1px solid black;
}
label {
  width: 30%;
  display: inline-block;
}
</style>