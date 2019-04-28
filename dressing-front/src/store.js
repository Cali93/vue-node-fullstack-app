import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

// Initialize Vuex in our app
Vue.use(Vuex);

// Global http options for our axios requests
const httpOptions = {
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
};

// Declaring the default Vuex state
const defaultState = {
  isAuth: false,
  status: '',
  user: {},
  snackbar: {
    isOpen: false,
    message: '',
    status: ''
  },
  dressings: []
};

// Instanciating a Vuex store
export default new Vuex.Store({
  // the state is where our data will live
  state: defaultState,
  // the getters will help us to read the data within the state
  getters: {
    isLoggedIn: state => state.isAuth,
    authStatus: state => state.status,
    currentUser: state => state.user,
    snackbar: state => state.snackbar,
    dressings: state => state.dressings
  },
  // the mutations will mutate/change the state
  mutations: {
    auth_request (state) {
      state.status = 'loading';
    },
    auth_success (state, { isAuth, status, user }) {
      state.status = status;
      state.isAuth = isAuth;
      state.user = user;
    },
    auth_error (state) {
      state.status = 'error';
      state.isAuth = false;
      state.user = {};
    },
    logout (state) {
      state.status = '';
      state.isAuth = false;
      state.user = {};
    },
    toggle_snackbar (state, { message, status }) {
      state.snackbar.isOpen = !state.snackbar.isOpen;
      state.snackbar.message = message;
      state.snackbar.status = status;
    },
    dressing_request (state) {
      state.status = 'loading';
    },
    dressings_success (state, dressings) {
      state.dressings = dressings;
    },
    add_dressing_success (state, dressing) {
      state.dressings = [...state.dressings, dressing];
    },
    delete_dressing_success (state, dressingId) {
      state.dressings = state.dressings.filter(
        dressing => dressing.id !== dressingId
      );
    }
  },
  // the actions will perform the business logic and then will ask the mutators to change the data in the state
  actions: {
    // An action is a function that has 2 params:
    // - commit is the method that will tell the mutators what to do
    // - the second param is the payload given in our components when calling this.$store.dispatch('action', payload)
    login: async ({ commit }, { email, password }) => {
      commit('auth_request');
      return axios
        .post(`http://localhost:5000/user/login`, {
          email,
          password
        }, httpOptions)
        .then(res => {
          if (res.data.success) {
            localStorage.setItem('email', res.data.user.email);
            const loginResponse = {
              isAuth: true,
              status: 'success',
              user: res.data.user
            };
            commit('auth_success', loginResponse);
          } else {
            commit('auth_error');
          }
        });
    },
    logout: async ({ commit }) => {
      commit('logout');
      return axios
        .get(`http://localhost:5000/user/logout`, httpOptions)
        .then(res => res);
    },
    getCurrentUser: async ({ commit }) => {
      commit('auth_request');
      return axios
        .get(`http://localhost:5000/user/current`, httpOptions)
        .then(res => {
          if (res.data.success) {
            const authResponse = {
              isAuth: true,
              status: 'success',
              user: res.data.user
            };
            commit('auth_success', authResponse);
          }
          if (!res.data.success) {
            commit('auth_error');
          }
        });
    },
    getDressings: async ({ commit }, userId) => {
      commit('dressing_request');
      return axios
        .get(`http://localhost:5000/basket/user/${userId}`, httpOptions)
        .then(res => {
          if (res.data.success) {
            const dressings = res.data.baskets.map(
              basket => ({ id: basket.id, name: basket.name })
            );
            commit('dressings_success', dressings);
          }
        });
    },
    toggleSnackbar: ({ commit }, { message, status }) => {
      const snackbarPayload = { message, status };
      commit('toggle_snackbar', snackbarPayload);
    },
    addDressing: async ({ commit }, { dressingName, userId }) => {
      commit('dressing_request');
      return axios
        .post(`http://localhost:5000/basket/`, { name: dressingName, userId }, httpOptions)
        .then(res => {
          if (res.data.success) {
            const { id, name } = res.data.basket;
            commit('add_dressing_success', { id, name });
          }
        });
    },
    deleteDressing: async ({ commit }, dressingId) => {
      commit('dressing_request');
      return axios
        .delete(
          `http://localhost:5000/basket`,
          { data: { basketId: dressingId } },
          httpOptions
        )
        .then(res => {
          if (res.data.success) {
            commit('delete_dressing_success', dressingId);
          }
        });
    }
  }
});
