import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const httpOptions = {
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
};

const defaultState = {
  isAuth: false,
  status: '',
  user: {},
  snackbar: {
    isOpen: false,
    message: '',
    status: ''
  }
};

export default new Vuex.Store({
  state: defaultState,
  getters: {
    isLoggedIn: state => state.isAuth,
    authStatus: state => state.status,
    currentUser: state => state.user,
    snackbar: state => state.snackbar
  },
  mutations: {
    auth_request (state) {
      state.status = 'loading';
    },
    profile_request (state) {
      state.status = 'loading';
    },
    auth_success (state, { isAuth, status, user }) {
      state.status = status;
      state.isAuth = isAuth;
      state.user = user;
    },
    profile_success (state, { status, user }) {
      state.status = status;
      state.user = user;
    },
    auth_error (state) {
      state.status = 'error';
      state.isAuth = false;
      state.user = {};
    },
    profile_error (state) {
      state.status = 'error';
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
    }
  },
  actions: {
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
    editProfile: async ({ commit }, { userId, newData }) => {
      commit('auth_request');
      return axios
        .patch(`http://localhost:5000/user/${userId}`, { userId, newData }, httpOptions)
        .then(res => {
          if (res.data.success) {
            const profileResponse = {
              status: 'success',
              user: res.data.user
            };
            if (newData.email) {
              localStorage.setItem('email', res.data.user.email);
            }
            commit('profile_success', profileResponse);
          }
          if (!res.data.success) {
            commit('auth_error');
          }
        });
    },
    toggleSnackbar: ({ commit }, { message, status }) => {
      const snackbarPayload = { message, status };
      commit('toggle_snackbar', snackbarPayload);
    }
  }
});