import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "o9fcgz",
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(_on, _config) {
      // implement node event listeners here
    },
  },
});
