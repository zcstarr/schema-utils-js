import { ErrorObject } from "ajv";
import { JSONSchema } from "@open-rpc/meta-schema";

/**
 * Provides an error interface for handling when a function call has invalid parameters.
 */
export default class ParameterValidationError implements Error {
  public name = "ParameterValidationError";
  public message: string;

  /**
   * @param paramIndex The index of the param that for this error (index
   * of the param in MethodObject.params).
   * @param expectedSchema The expected JSON Schema for the passed in value.
   * @param receievedParam The value of the param passed to the method call.
   * @param errors The errors recieved by ajv
   */
  constructor(
    public paramIndex: number | string,
    public expectedSchema: JSONSchema,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public receievedParam: any,
    errors: ErrorObject[]
  ) {
    this.message = [
      `Expected param at ${
        typeof paramIndex === "string" ? "key" : "position"
      }: `,
      paramIndex,
      " to match the json schema: ",
      JSON.stringify(expectedSchema, undefined, "  "),
      ". The function received instead ",
      receievedParam,
      ".",
      "The Validation errors: \n",
      JSON.stringify(errors),
    ].join("");
  }
}
