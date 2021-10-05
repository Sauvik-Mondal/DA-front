<template>
  <div>
    <base-dialog
      :show="hasError"
      title="Something went wrong!"
      @close="hasError = null"
      >{{ errorMessage }}</base-dialog
    >
    <v-card v-show="submitSuccess" class="mx-auto container" max-width="650">
      <v-card-title>Deleted successfully</v-card-title>
    </v-card>
    <v-card class="mx-auto outer-container" max-width="650">
      <v-btn class="ma-2 btn" color="orange darken-2" dark @click="updateList">
        Refresh
      </v-btn>
    </v-card>
    <div v-if="isloading"><base-spinner></base-spinner></div>
    <v-card
      class="mx-auto outer-container"
      max-width="650"
      v-else-if="!listIsPresent"
    >
      <v-card-title>No data Found</v-card-title>
    </v-card>
    <v-card
      class="mx-auto container"
      max-width="650"
      v-for="(connection, index) in connections"
      :key="connection.name"
    >
      <v-card-title>{{ index + 1 + ". " + connection.name }}</v-card-title>
      <v-card-subtitle>{{
        connection.feedbackType.toUpperCase()
      }}</v-card-subtitle>
      <v-card-subtitle>{{ "Email: " + connection.email }}</v-card-subtitle>
      <v-card-subtitle>{{ "Phone: " + connection.phone }}</v-card-subtitle>
      <div class="grey-text ms-4">{{ "Feedback: " + connection.feedback }}</div>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="orange lighten-2"
          text
          v-if="$store.getters.isLoggedIn"
          @click="deleteConneection(connection.id)"
        >
          Delete
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //dateConnections: this.connections,
      hasError: false,
      errorMessage: null,
      isloading: false,
      submitSuccess: false,
    };
  },
  beforeMount() {
    this.updateList();
  },
  computed: {
    connections() {
      return this.$store.getters.getConnections;
    },
    listIsPresent() {
      return this.connections.length > 0;
    },
  },
  methods: {
    async deleteConneection(reqId) {
      this.isloading = true;
      try {
        await this.$store.dispatch("removeConnections", { 'id':reqId});
        this.submitSuccess = true;
        setTimeout(() => (this.submitSuccess = false), 1000);
      } catch (err) {
        this.errorMessage = err;
        this.hasError = true;
      } finally {
        this.isloading = false;
      }
    },
    async updateList() {
      this.isloading = true;
      try {
        await this.$store.dispatch(
          "loadConnections",
          this.$store.getters.getUserId
        );
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
.form-field {
  padding: 10px 20px 10px 20px;
}
input,
select {
  width: 50%;
  border: 1px solid black;
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
.outer-container {
  margin-bottom: 20px;
  margin-top: 20px;
  background-color: rgb(230, 230, 230);
}
</style>