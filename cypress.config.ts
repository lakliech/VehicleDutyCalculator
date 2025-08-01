
import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://0.0.0.0:5000',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: true,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      API_BASE_URL: 'http://0.0.0.0:5000/api'
    }
  },
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
  },
})
