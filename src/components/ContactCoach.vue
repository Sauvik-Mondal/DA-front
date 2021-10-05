<template>
  <div>
    <v-card v-show="submitSuccess" class="mx-auto container" max-width="650">
      <v-card-title>Feedback submitted successfully</v-card-title>
    </v-card>
    <base-dialog
      :show="hasError"
      title="Something went wrong!"
      @close="hasError = false"
      >{{ errorMessage }}</base-dialog
    >
    <div v-if="isloading"><base-spinner></base-spinner></div>
    <v-card class="mx-auto container" max-width="650" v-else>
      <v-card-title>Connect with the Experts</v-card-title>
      <v-card-subtitle>feel free to send your Feedback</v-card-subtitle>
      <v-card-subtitle
        >You are connecting with&nbsp;<b>{{ myCoach.name }}</b></v-card-subtitle
      >
      <form class="form-group">
        <div class="form-field">
          <label for="name">Name:</label>
          <input type="text" id="name" name="name" v-model="form1.name" required />
          <p class="error-red" v-show="!nameOk">
            Please enter a valid Name
          </p>
        </div>
        <div class="form-field">
          <label for="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            v-model="form1.email"
            required
          />
          <p class="error-red" v-show="!emailOk">
            Please enter a valid Email
          </p>
        </div>
        <div class="form-field">
          <label for="phone">Mobile:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            maxlength="10"
            minlength="10"
            v-model="form1.phone"
            required
          />
          <p class="error-red" v-show="!phoneOk">
            Please enter a valid Phone Number
          </p>
        </div>

        <div class="form-field">
          <label for="feedbackType">Type of feedback:</label>
          <select name="feedbackType" id="feedbackType" v-model="form1.feedbackType">
            <option value="praise" default>Praise</option>
            <option value="query">Query</option>
            <option value="suggesstion">Suggesstion</option>
          </select>
          <p class="error-red" v-show="!feedbackTypeOk">
            Please enter a field
          </p>
        </div>
        <div class="form-field">
          <label for="feedback">feedback:</label>
          <br />
          <textarea id="feedback" v-model="form1.feedback" required />
          <p class="error-red" v-show="!feedbackOk">
            Please enter a feedback
          </p>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="orange darken-2" @click="$router.go(-1)">
            <v-icon left> mdi-arrow-left </v-icon>
            Back
          </v-btn>
          <v-btn color="orange lighten-2" text @click="resetAll">Reset</v-btn>
          <v-btn color="orange lighten-2" text @click="submitToCoach"
            >Submit</v-btn
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
        name: "",
        email: "",
        phone: "",
        feedbackType: "",
        feedback: "",
        isClean: true,
      },
      userId: this.$route.params.ContactCoach,
      submitSuccess: false,
      hasError: false,
      errorMessage: null,
      isloading: false,
    };
  },
  computed: {
    nameOk() {
      return this.form1.isClean || this.validateTextField(this.form1.name);
    },
    emailOk() {
      return this.form1.isClean || this.validateEmailField(this.form1.email);
    },
    phoneOk() {
      return this.form1.isClean || this.validatePhoneNumberField(this.form1.phone);
    },
    feedbackTypeOk() {
      return this.form1.isClean || this.validateTextField(this.form1.feedbackType);
    },
    feedbackOk() {
      return this.form1.isClean || this.validateAlphaNumericField(this.form1.feedback);
    },
    myCoach() {
      // console.log(
      //   this.$store.getters.getCoachById(this.$route.params.ContactCoach)[0]
      // ); //via getters

      // console.log(
      //   this.$store.dispatch("getCoachById", this.$route.params.ContactCoach)
      // ); //via action
      return this.$store.getters.getCoachById(
        this.$route.params.ContactCoach
      )[0];
    },
  },
  methods: {
    form1Ok() { 
      this.form1.isClean = false;
      return this.nameOk && this.phoneOk && this.emailOk && this.feedbackOk && this.feedbackTypeOk;
    },
    resetAll() {
      this.form1.name = "";
      this.form1.email = "";
      this.form1.phone = "";
      this.form1.feedback = "";
      this.form1.feedbackType = "";
      this.form1.isClean = true;
    },
    async submitToCoach() {
      //this.name$event.preventDefault();
      if(!this.form1Ok()) return;
      const payload = {
        'coachId': this.userId,
        name: this.form1.name,
        email: this.form1.email,
        phone: this.form1.phone,
        feedbackType: this.form1.feedbackType,
        feedback: this.form1.feedback,
      };
      this.isloading = true;
      try {
        await this.$store.dispatch("setConnections", {data: payload});
        setTimeout(() => this.$router.push("/coachList"), 1500);
        this.submitSuccess = true;
      } catch (err) {
        this.errorMessage = err;
        this.hasError = true;
      } finally {
        this.resetAll();
        this.isloading = false;
      }
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
  width: 50%;
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
  width: 490px;
  padding: 2px 5px;
  margin: 2px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
label {
  width: 30%;
  display: inline-block;
}
</style>