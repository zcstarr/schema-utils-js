import metaSchema, { OpenrpcDocument as OpenRPC } from "@open-rpc/meta-schema";
import Ajv, { ErrorObject } from "ajv";
import JsonSchemaMetaSchema from "@json-schema-tools/meta-schema";
import getMetaSchemaExtended from "./append-extension-schema";

/**
 * @ignore
 */
/**
 * Provides an error interface for OpenRPC Document validation
 *
 * @category Errors
 *
 */
export class OpenRPCDocumentValidationError implements Error {
  public name = "OpenRPCDocumentDereferencingError";
  public message: string;
  /**
   * @param errors The errors received by ajv.errors.
   */
  constructor(errors: ErrorObject[]) {
    this.message = [
      "Error validating OpenRPC Document against @open-rpc/meta-schema.",
      "The errors found are as follows:",
      JSON.stringify(errors, undefined, "  "),
    ].join("\n");
  }
}

/**
 * Returns any JSON Schema validation errors that are found with the OpenRPC document passed in.
 *
 * @param document OpenRPC Document to validate.
 *
 * @returns Either true if everything checks out, or a well formatted error.
 *
 * @example
 * ```typescript
 *
 * import { validateOpenRPCDocument } from "@open-rpc/schema-utils-js";
 * const badOpenRPCDocument = {} as any;
 *
 * const result = validateOpenRPCDocument(badOpenRPCDocument);
 * if (result !== true) {
 *   console.error(result);
 * }
 * ```
 *
 */
export default function validateOpenRPCDocument(
  document: OpenRPC
): OpenRPCDocumentValidationError | true {
  const ajv = new Ajv();
  ajv.addSchema(JsonSchemaMetaSchema, "https://meta.json-schema.tools");
  //const metaSchemaCopy = { ...metaSchema } as any;
  const metaSchemaCopy = getMetaSchemaExtended() as any;
  // const metaSchemaCopy = { ...metaSchema } as any;
  delete metaSchemaCopy.definitions.JSONSchema.$id;
  delete metaSchemaCopy.definitions.JSONSchema.$schema;
  delete metaSchemaCopy.$schema;
  delete metaSchemaCopy.$id;
  try {
    ajv.validate(metaSchemaCopy, document);
  } catch (e) {
    throw new Error([
      'schema-utils-js: Internal Error',
      '-----',
      e,
      '-----',
      'If you see this report it: https://github.com/open-rpc/schema-utils-js/issues',
    ].join('\n'));
  }

  //ajv.validate(metaSchemaCopy, document);

  if (ajv.errors) {
    console.log(document)
    console.info(ajv.errors)
    return new OpenRPCDocumentValidationError(ajv.errors as ErrorObject[]);
  } else {
    return true;
  }
}
