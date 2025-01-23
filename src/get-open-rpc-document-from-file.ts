import { OpenrpcDocument as OpenRPC } from "@open-rpc/meta-schema";
import { readJson } from "fs-extra";
import { TGetOpenRPCDocument } from "./get-open-rpc-document";

const readSchemaFromFile: TGetOpenRPCDocument = async (filePath: string) => {
  try {
    return (await readJson(filePath)) as OpenRPC;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    if (e.message.includes("SyntaxError")) {
      throw new Error(`Failed to parse json in file ${filePath}`);
    } else {
      throw new Error(
        `Unable to read openrpc.json file located at ${filePath}`
      );
    }
  }
};

export default readSchemaFromFile;
