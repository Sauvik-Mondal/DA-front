<template>
  <div>
    <v-card v-show="submitSuccess && alreadyACoach" class="mx-auto container" max-width="600">
      <v-card-title>Details updated successfully </v-card-title>
    </v-card>
    <v-card v-show="submitSuccess && !alreadyACoach" class="mx-auto container" max-width="600">
      <v-card-title>Registration successfully</v-card-title>
    </v-card>
    <base-dialog
      :show="hasError"
      title="Something went wrong!"
      @close="hasError = false"
      >{{ errorMessage }}</base-dialog
    >
    <div v-if="isloading"><base-spinner></base-spinner></div>
    <v-card class="mx-auto container" max-width="600" v-else>
      <v-card-title>Register as an Expert</v-card-title>
      <v-card-subtitle
        >Register as a coach and reach to millions</v-card-subtitle
      >
      <form class="form-group">
        <div class="form-field">
          <label for="name">Name:</label>
          <input type="text" id="name" name="name" v-model.lazy="form1.name" required />
          <p class="error-red" v-show="!nameOk">
            Please enter a valid Name
          </p>
        </div>
        <div class="form-field">
          <label for="expertise">expertise:</label>
          <input
            type="text"
            id="expertise"
            name="expertise"
            v-model.lazy="form1.expertise"
            required
          />
          <p class="error-red" v-show="!expertiseOk">
            Please enter a valid Expertise
          </p>
        </div>
        <div class="form-field">
          <label for="noOfCourses">No&nbsp;of Courses:</label>
          <input
            type="number"
            min="1"
            id="noOfCourses"
            name="noOfCourses"
            v-model.number.lazy="form1.noOfCourses"
            required
          />
          <p class="error-red" v-show="!noOfCoursesOk">
            Please enter a valid number
          </p>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="orange darken-2" @click="$router.go(-1)">
            <v-icon left> mdi-arrow-left </v-icon>
            Back
          </v-btn>
          
          <v-btn color="orange lighten-2" text @click="resetAll">Reset</v-btn>
          <v-btn color="orange lighten-2" text @click="becomeAcoach"
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
  created() {
    if (this.alreadyACoach) {
      this.form1.name = this.targetCoach.name;
      this.form1.noOfCourses = this.targetCoach.noOfCourses;
      this.form1.expertise = this.targetCoach.expertise;
    }
  },
  data() {
    return {
      form1: {
        name: "",
        noOfCourses: 1,
        expertise: "",
        isClean: true,
      },
      alreadyACoach: this.$store.getters.isUseraCoach,
      submitSuccess: false,
      hasError: false,
      errorMessage: null,
      isloading: false,
    };
  },
  computed: {
    targetCoach() {
      return this.$store.getters.getCoachById(this.$store.state.user.userId)[0];
    },
    nameOk() {
      return this.form1.isClean || this.validateTextField(this.form1.name);
    },
    noOfCoursesOk() {
      return this.form1.isClean || this.validateNumberField(this.form1.noOfCourses);
    },
    expertiseOk() {
      return this.form1.isClean || this.validateAlphaNumericField(this.form1.expertise);
    }
  },
  methods: {
    form1Ok() {
      this.form1.isClean=false;
      return this.nameOk && this.noOfCoursesOk && this.expertiseOk;
    },
    resetAll() {
      this.form1.name = "";
      this.form1.noOfCourses = 1;
      this.form1.expertise = "";
      this.form1.isClean=true;
    },
    async becomeAcoach() {
      //this.name$event.preventDefault();
      if(!this.form1Ok()) return;
      const payload = {
        name: this.form1.name,
        noOfCourses: this.form1.noOfCourses,
        expertise: this.form1.expertise,
        rating: 0,
      };
      this.isloading = true;
      try {
        await this.$store.dispatch("setCoaches", payload);
        await this.$store.dispatch("makeCoach",true);
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
  mixins:[FieldValidatorMixin],
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
  width: 320px;
  border: 1px solid black;
}
label {
  width: 30%;
  display: inline-block;
}
</style>