<template>
  <div>
    <base-dialog :show="hasError" title="Something went wrong!" @close='hasError=false;'>{{errorMessage}}</base-dialog>
    <v-card class="mx-auto outer-container" max-width="650" >
      <v-btn
        class="ma-2 btn"
        color="orange darken-2"
        dark
        @click="$router.push('/register')"
        v-if="!userACoach && $store.getters.isLoggedIn"
      >
        Register as a Coach
      </v-btn>
      <v-btn
        class="ma-2 btn"
        color="orange darken-2"
        dark
        @click="$router.push('/register')"
        v-if="userACoach && $store.getters.isLoggedIn"
      >
        Update details
      </v-btn>
      <v-btn class="ma-2 btn" color="orange darken-2" dark @click="updateList">
        Refresh
      </v-btn>
    </v-card>
    <div v-if="isloading"><base-spinner></base-spinner></div>
    <v-card class="mx-auto outer-container" max-width="650" v-else-if="!listIsPresent"> 
      <v-card-title>No data Found</v-card-title>
    </v-card>
    <v-card
      class="mx-auto container"
      max-width="650"
      v-for="(coach, index) in coaches"
      :key="coach.name"
      v-else
    >
      <v-card-title>{{ index + 1 + ". " + coach.name }}</v-card-title>
      <v-card-subtitle>{{ coach.expertise }}</v-card-subtitle>
      <v-rating
        v-model="coach.rating"
        bg-color="orange-lighten-1"
        color="amber"
        disabled
      ></v-rating>
      <div class="grey-text ms-4">{{ "Rating: " + coach.rating + "/5" }}</div>
      <div class="grey-text ms-4">{{ "Courses: " + coach.noOfCourses }}</div>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="orange lighten-2"
          text
          @click="$router.push('/coachDetails/' + coach.userId)"
          >Show Details</v-btn
        >
        <v-btn
          color="orange lighten-2"
          text
          @click="$router.push('/coachList/' + coach.userId)"
        >
          Provide Feedback
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>

export default {
  data() {
    return {
      // dataCoaches: this.coaches,
      hasError: false,
      errorMessage:null,
      isloading: false,
    };
  },
  beforeMount() {
    this.updateList();
  },
  computed: {
    coaches() {
      return this.$store.getters.getCoaches;
    },
    listIsPresent() {
      return this.coaches.length>0;
    },
    userACoach() {
      //console.log("in comuted "+this.$store.getters.isUseraCoach)
      return this.$store.getters.isUseraCoach;
    }
  },
  methods: {
    async updateList() {
      this.isloading=true;
      try{
        await this.$store.dispatch("loadCoaches");
      }
      catch(err)
      {
        this.errorMessage=err;
        this.hasError = true;
      }
      finally{
        this.isloading=false;
      }
    },
  },
};
</script>

<style scoped>
.rate {
  padding-left: 15px;
}
.container {
  margin-bottom: 20px;
  margin-top: 20px;
  padding-top: 20px;
  background-color: rgb(230, 230, 230);
}
.outer-container {
  margin-bottom: 20px;
  margin-top: 20px;
  background-color: rgb(230, 230, 230);
}
</style>