<template>
  <div>
    <v-list-item @click="$emit('close')">
      <v-icon>mdi-arrow-left</v-icon>
    </v-list-item>
    <v-divider></v-divider>
    <v-list-item v-show="$store.getters.isLoggedIn">
      <v-list-item-avatar>
        <v-avatar size="34" color="primary">user</v-avatar>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>{{ $store.state.user.email }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-divider v-show="$store.getters.isLoggedIn"></v-divider>
    <v-list dense>
      <v-list-item
        link
        v-if="$store.getters.isLoggedIn"
        @click="
          $router.push('/feedbackList');
          $emit('close');
        "
      >
        <v-list-item-icon>
          <v-icon>mdi-bookmark</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Feedbacks</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item
        link
        @click="
          $router.push('/coachList');
          $emit('close');
        "
      >
        <v-list-item-icon>
          <v-icon>mdi-bookmark</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Coach List</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item
        link
        v-if="!$store.getters.isLoggedIn"
        @click="
          $router.push('/auth');
          $emit('close');
        "
      >
        <v-list-item-icon>
          <v-icon>mdi-bookmark</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Login</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item
        link
        v-if="$store.getters.isLoggedIn"
        @click="
          $store.commit('logOut');
          $emit('close');
        "
      >
        <v-list-item-icon>
          <v-icon>mdi-bookmark</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
export default {
  emits: ["close"],
  data() {
    return {
      //
    };
  },
};
</script>

<style scoped>
</style>