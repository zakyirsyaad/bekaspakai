const { defineConfig } = require('cypress');

module.exports = defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
        supportFile: 'cypress/support/e2e.js', // Mengarah ke file support baru yang dihasilkan
        baseUrl: 'http://localhost:3000', // Sesuaikan dengan URL dasar Anda
    },
});
