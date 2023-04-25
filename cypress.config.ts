import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  reporter: "junit",
  reporterOptions: {
    mochaFile: "tests/test-output-[hash].xml"
  },
  video: false,
});
