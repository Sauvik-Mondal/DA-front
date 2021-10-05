import { createStore } from 'vuex'
import router from '../router/index.js'

export default createStore({
  state: {
    coaches: [
      //sample coach data
      // {
      //   id: 'c1',
      //   name: "H P Lovecraft",
      //   expertise: "Fictional/Horror",
      //   rating: 4.8,
      //   noOfCourses: 9,
      // },
    ],
    connections: [
      //sample connections data
      // {
      //   id: 'r1',
      //   name: 'Arpan Mallic',
      //   email: 'assdf@gfh.bjn',
      //   phone: '9856478521',
      //   feedbackType: 'Query',
      //   feedback: 'Very good lessons thank you'
      // },
    ],
    filters:
    {
      coachName: '',
      feedbackType: '',
      global: '',
    },
    user:
    {
      userId: null,
      authId: null,
      expiresIn: null,
      authenticated: false,
      email:null,
      isCoach: false
    },
    timer:null,
  },
  getters: {
    getCoaches(state) {
      return state.coaches;
    },
    isUseraCoach(state) {
      return state.user.isCoach;
    },
    getAuthToken(state) {
      return state.user.authId;
    },
    getConnections(state) {
      return state.connections;
    },
    getFilters(state) {
      return state.filters;
    },
    getCoachById: (state) => (payload) => {
      return state.coaches.filter(coach => coach.userId == payload);
    },
    getUserId(state) {
      return state.user.userId;
    },
    isLoggedIn(state) {
      return state.user.authenticated;
    }
  },
  mutations: {
    addconnections(_, payload) {
      this.getters.getConnections.push(payload);
    },
    addCoaches(_, payload) {
      this.getters.getCoaches.push(payload);
    },
    removeConnections(state, payload) {
      state.connections.forEach((connection, index) => {
        if (connection.id == payload) {
          state.connections.splice(index, 1);
        }
      });
    },
    removeCoaches(state, payload) {
      state.coaches.forEach((coach, index) => {
        if (coach.id == payload) {
          state.coaches.splice(index, 1);
        }
      });
    },
    updateCoachRating(state, payload) {
      state.coaches.forEach(coach => {
        if (coach.id == payload.CoachId) {
          coach.rating = payload.newRating;
        }
      });
    },
    updateFilters(state, payload) {
      state.filters[payload.type] = payload.newFilterVaue;
    },
    logOut(state) {
      localStorage.clear();
      clearTimeout(state.timer);
      state.user.userId = null;
      state.user.expiresIn = null;
      state.user.authId = null;
      state.user.authenticated = false;
      state.user.email = null;
      router.push('/auth')
    }
  },
  actions: {
    async setConnections(context, payload) { //done
      const res = await fetch(
        `http://localhost:3000/api/connections/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload.data),
        }
      );
      if (!res.ok) {
        console.log("error: ");
        const error = await res.json();
        console.log(error);
        throw new Error("Error in submitting data, error code: "+error.message+", "+res.status);
      }
      else {
        const data = await res.json();
        console.log(data);
        context.commit('addconnections', payload.data);
      }
    },
    async setCoaches(context, payload) { //done
      const res = await fetch(
        `http://localhost:3000/api/coaches/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": context.getters.getAuthToken
          },
          body: JSON.stringify(
            {...payload, 
              'userId':context.state.user.userId
            }),
        }
      );
      if (!res.ok) {
        console.log("error: ");
        const error = await res.json();
        console.log(error);
        throw new Error("Error in submitting data, error code: "+error.message+", "+res.status);
      }
      else {
        console.log("success: ");
        const data = await res.json();
        console.log(data);
        context.commit('addCoaches', payload);
      }
    },
    async loadCoaches(context) { //done
      const res = await fetch(`http://localhost:3000/api/coaches/`);
      if (!res.ok) {
        console.log("error: ");
        const error = await res.json();
        console.log(error);
        throw new Error("Error in loading Coachlist, error code: "+error.error.message+", "+error.error.code);
      }
      else {
        const data = await res.json();
        console.log(data);
        const tempCoaches = [];
        for(const coach of data) {
          const tempCoache = {
          id: coach._id,
          name: coach.name,
          noOfCourses: coach.noOfCourses,
          expertise: coach.expertise,
          rating: coach.rating,
          userId: coach.userId
          }
          tempCoaches.push(tempCoache);
        }
        context.state.coaches = tempCoaches;
      }
    },
    async loadConnections(context) { //done
      const res = await fetch(`http://localhost:3000/api/connections/${context.getters.getUserId}`,
      { 
        method: 'GET',
        headers:{
          'x-auth-token': context.getters.getAuthToken
        }
      });
      if (!res.ok) {
        console.log("error: ");
        const error = await res.json();
        console.log(error);
        throw new Error("Error in loading ConnectionList, error code: "+error.message+", "+res.status);
      }
      else {
        const data = await res.json();
        const tempConnections = [];
        console.log(data);
        for (const connection of data) {
          const tempConnection = {
            id: connection._id,
            name: connection.name,
            email: connection.email,
            phone: connection.phone,
            feedbackType: connection.feedbackType,
            feedback: connection.feedback,
            coachId: connection.coachId
          };
          tempConnections.push(tempConnection);
        }
        context.state.connections = tempConnections;
      }
    },
    async removeConnections(context, payload) { //done
      const res = await fetch(`http://localhost:3000/api/connections/${payload}`,
        {
          method: "DELETE",
          headers:{
            'x-auth-token': context.getters.getAuthToken
          }
        }
      );
      if (!res.ok) {
        console.log("error: ");
        const error = await res.json();
        console.log(error);
        throw new Error("Error in deleting connection, error code: "+error.message+", "+res.status);
      }
      else {
        context.commit('removeConnections', payload);
        console.log("Success");
      }
    },
    async updateCoachRating(context, payload) { //done
      const res = await fetch(
        `http://localhost:3000/api/coaches/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": context.getters.getAuthToken
          },
          body: JSON.stringify(
            { 
              rating: payload.newRating, 
              userId: payload.userId
            }),
        }
      );
      if (!res.ok) {
        console.log("error: ");
        const error = await res.json();
        console.log(error);
        throw new Error("Error in updating rating, error code: "+error.message+", "+res.status);
      }
      else {
        const data = await res.json();
        console.log(data);
        context.commit('updateCoachRating', payload)
      }
    },
    async createUser(context, payload) { //done
      const res = await fetch('http://localhost:3000/api/users/', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(
          {
            email: payload.email,
            password: payload.password,
            isCoach: false
          })
      })
      if (!res.ok) {
        console.log("error:");
        const error = await res.json();
        console.log(error);
        console.log(res);
        throw new Error("Error in creating user, error code: "+res.status + ', ' + error.message);
      }
      else {
        const data = await res.json();
        console.log(data)
      }
    },
    async loginUser(context, payload) { //done
      const res = await fetch('http://localhost:3000/api/auth/', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          {
            email: payload.email,
            password: payload.password
          })
      })
      if (!res.ok) {
        console.log("error:")
        const error = await res.json();
        console.log(error);
        console.log(res);
        throw new Error("Error in Logging in user, error code: "+res.status + error.message);
      }
      else {
        const data = await res.json();
        const expieryTime = +data.expiresIn + new Date().getTime()/1000;
        console.log(data)

        localStorage.setItem('localId', data.localId);
        localStorage.setItem('expiresIn', expieryTime);
        localStorage.setItem('idToken', data.idToken);
        localStorage.setItem('authenticated', true);
        localStorage.setItem('email', payload.email);
        localStorage.setItem('isCoach', payload.isCoach);

        context.state.timer = setTimeout(function(){
          context.commit('logOut')
        },+data.expiresIn*1000);

        context.state.user.email = payload.email;
        context.state.user.userId = data.localId;
        context.state.user.expiresIn = expieryTime;
        context.state.user.authId = data.idToken;
        context.state.user.authenticated = true;
        context.state.user.isCoach = data.isCoach;
      }
    },
    autoLogin(context) { //done
      const cached_localId = localStorage.getItem('localId');
      const cached_expiresIn = +localStorage.getItem('expiresIn') - new Date().getTime()/1000;
      const cached_idToken = localStorage.getItem('idToken');
      const cached_authenticated = localStorage.getItem('authenticated');
      const cached_email = localStorage.getItem('email');
      const cached_isCoach = localStorage.getItem('isCoach');

      context.state.timer = setTimeout(function(){
        context.commit('logOut')
      },+cached_expiresIn*1000);

      if (cached_localId && cached_expiresIn && cached_idToken && cached_authenticated) {
        context.state.user.userId = cached_localId;
        context.state.user.expiresIn = cached_expiresIn;
        context.state.user.authId = cached_idToken;
        context.state.user.authenticated = cached_authenticated;
        context.state.user.email = cached_email;
        context.state.user.isCoach = cached_isCoach;
      }

    },
    async makeCoach(context,payload) { //done
      const res = await fetch('http://localhost:3000/api/auth/', {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": context.getters.getAuthToken
        },
        body: JSON.stringify(
          {
            localId: context.state.user.userId,
            isCoach: payload
          })
      })
      if (!res.ok) {
        console.log("error:")
        const error = await res.json();
        console.log(error);
        console.log(res);
        throw new Error("Error completing action, error code: "+res.status + error.message);
      }
      else {
        const data = await res.json();
        context.state.user.isCoach=payload;
        console.log(data)
      }
    },
    async removeCoach(context, payload) { //done
      const res = await fetch(`http://localhost:3000/api/coaches/${payload}`,
        {
          method: "DELETE",
          headers:{
            'x-auth-token': context.getters.getAuthToken
          }
        }
      );
      if (!res.ok) {
        console.log("error: ");
        const error = await res.json();
        console.log(error);
        throw new Error("Error in deleting coach, error code: "+error.message+", "+res.status);
      }
      else {
        context.commit('removeCoaches', payload);
        console.log("Success");
      }
    },
  }
})
