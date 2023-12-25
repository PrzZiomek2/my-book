import { defineConfig } from "cypress";

export default defineConfig({
  defaultCommandTimeout: 500,
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
  e2e: {
    setupNodeEvents(on, config) {},
    baseUrl: 'http://localhost:3000',
    supportFile: false
  }
});
