import { ValidationResult } from "./types";

export function createValidationResult(): ValidationResult {
  return {
    invalid: new Set<string>(),
  };
}
