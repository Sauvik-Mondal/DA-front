<template>
  <div>
    <v-card v-show="submitSuccess" class="mx-auto container" max-width="650">
      <v-card-title>Your rating was submitted successfully</v-card-title>
    </v-card>
    <base-dialog
      :show="hasError"
      title="Something went wrong!"
      @close="hasError = false"
      >{{ errorMessage }}</base-dialog
    >
    <div v-if="isloading"><base-spinner></base-spinner></div>
    <v-card class="mx-auto container" max-width="650" v-else>
      <v-card-title>{{ targetCoach.name }}</v-card-title>
      <v-card-subtitle>{{ targetCoach.expertise }}</v-card-subtitle>
      <v-rating
        v-model="targetCoach.rating"
        bg-color="orange-lighten-1"
        color="amber"
        :disabled="isRatingDisabled"
      ></v-rating>
      <div class="grey-text ms-4" v-if="isRatingDisabled">
        Rating:&nbsp;{{ targetCoach.rating }}/5
      </div>
      <div class="grey-text ms-4" v-else>
        Rating:&nbsp;
        <input
          type="number"
          min="0"
          max="5"
          step="0.1"
          v-model="targetCoach.rating"
        />
        /5
      </div>
      <div class="grey-text ms-4 error-red" v-show="!ratingOk">
        <p>Please enter a number between 0-5</p>
      </div>
      <div class="grey-text ms-4">
        {{ "Courses: " + targetCoach.noOfCourses }}
      </div>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="orange lighten-2" text @click="$router.push('/coachList')"
          ><v-icon left> mdi-arrow-left </v-icon>Back</v-btn
        >
        <v-btn
          color="orange lighten-2"
          text
          @click="toggleRatingState"
          v-if="!userACoach && isRatingDisabled && $store.getters.isLoggedIn"
          >Rate This Coach</v-btn
        >
        <v-btn
          color="orange lighten-2"
          text
          @click="updateRating"
          v-else-if="!userACoach && $store.getters.isLoggedIn"
          >Update Rating</v-btn
        >
        <v-btn
          color="orange lighten-2"
          text
          @click="resignMe"
          v-else-if="userACoach && $store.getters.isLoggedIn"
          >Resign</v-btn
        >
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataCoaches: this.coaches,
      isRatingDisabled: true,
      userId: this.$route.params.CoachId,
      submitSuccess: false,
      isClean: true,
      ratingOk: true,
      hasError: false,
      errorMessage: null,
      isloading: false,
    };
  },
  computed: {
    targetCoach() {
      return this.$store.getters.getCoachById(this.userId)[0];
    },
    coaches() {
      return this.$store.getters.getCoaches;
    },
    userACoach() {
      return this.userId == this.$store.state.user.userId;
    },
  },
  watch: {
    targetCoach: {
      handler(_, oldVal) {
        const data_str = oldVal.rating.toString();
        if (data_str === "") {
          console.log("first if");
          this.ratingOk = false;
        } else if (oldVal.rating > 5 || oldVal.rating < 0) {
          console.log("2nd if");
          this.targetCoach.rating = 5;
        } else {
          console.log("else if");
          this.ratingOk = true;
        }
      },
      deep: true,
    },
  },
  methods: {
    toggleRatingState() {
      this.isRatingDisabled = !this.isRatingDisabled;
    },
    async updateRating() {
      if (!this.ratingOk) return;
      this.isloading = true;
      try {
        await this.$store.dispatch("updateCoachRating", {
          userId: this.userId,
          newRating: Math.round(this.targetCoach.rating * 10) / 10,
        });
        this.submitSuccess = true;
        setTimeout(() => (this.submitSuccess = false), 3000);
      } catch (err) {
        this.errorMessage = err;
        this.hasError = true;
      } finally {
        this.toggleRatingState();
        this.isloading = false;
      }
    },
    async resignMe() {
      this.isloading = true;
      try {
        await this.$store.dispatch("removeCoach", this.userId);
        await this.$store.dispatch("makeCoach", false);
        this.submitSuccess = true;
        setTimeout(() => (this.submitSuccess = false), 3000);
        this.$router.push("/coachList");
      } catch (err) {
        this.errorMessage = err;
        this.hasError = true;
      } finally {
        this.isloading = false;
      }
    },
  },
};
</script>

<style scoped>
.container {
  margin-bottom: 20px;
  margin-top: 20px;
  padding-top: 20px;
  background-color: rgb(230, 230, 230);
}
input {
  width: 50px;
  padding: 2px 5px;
  margin: 2px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
</style>