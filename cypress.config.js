const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'xwzg4v',
  e2e: {
    baseUrl: "https://restful-booker.herokuapp.com",
    requestTimeout: 6000,
    responseTimeout: 6000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      requestMode: true,
      hideCredentials: true,
      auth_url: '/auth',
      booking_url: '/booking',
      username: 'admin',
      password: 'password123'
    },
    expose: {
      hideCredentials: true,
      auth_url: '/auth',
      booking_url: '/booking',
      username: 'admin',
      password: 'password123'
    },
  },
});
