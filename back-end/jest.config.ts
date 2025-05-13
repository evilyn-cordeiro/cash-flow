import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/?(*.)+(spec|test).[tj]s?(x)"],
  moduleFileExtensions: ["ts", "js", "json"],
  roots: ["<rootDir>/tests"],
  globalTeardown: "<rootDir>/tests/teardown.ts",
};

export default config;
