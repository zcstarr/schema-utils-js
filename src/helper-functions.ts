/* eslint-disable @typescript-eslint/no-explicit-any */
type TPredicate = (value: any) => boolean;

/**
 * finds array index of array object which matches predicate
 * @param array {Array}
 * @param predicate {Function}
 * @returns {number} || {undefined}
 */
export const findIndex = (array: any[], predicate: TPredicate): number => {
  const length = array == null ? 0 : array.length;
  if (!length) {
    return -1;
  }
  let index = -1;
  while (++index < length) {
    if (predicate(array[index])) {
      return index;
    }
  }
  return -1;
};

/**
 * Removes false and null values from array
 * @param array {Array}
 * @returns {Array}
 */
export const compact = (array: any[]) => {
  let index = 0;
  const result: any[] = [];

  for (const value of array) {
    if (value) {
      result[index++] = value;
    }
  }
  return result;
};

/**
 * finds an array elements which matches the predicate
 * @param array {Array}
 * @param predicate {Function}
 * @returns {any} || {undefined}
 */
export const find = (array: any[], predicate: TPredicate) => {
  const length = array == null ? 0 : array.length;
  if (!length) {
    return undefined;
  }
  let index = -1;
  while (++index < length) {
    if (predicate(array[index])) {
      return array[index];
    }
  }
  return undefined;
};

/**
 * compares OpenrpcDocuments
 *
 * @param doc1 {OpenrpcDocument}
 * @param doc2 {OpenrpcDocument}
 * @returns {boolean}
 */
export const rpcDocIsEqual = (doc1: any, doc2: any) => {
  const doc1Keys = Object.keys(doc1);
  const doc2Keys = Object.keys(doc2);
  const doc1Len = doc1Keys.length;
  const doc2Len = doc2Keys.length;

  if (doc1Len != doc2Len) {
    return false;
  }

  let key;
  let index = doc1Len;
  while (index--) {
    key = doc1Keys[index];
    if (!(key in doc2)) {
      return false;
    } else if (typeof doc1[key] === "object" && typeof doc2[key] === "object") {
      if (!rpcDocIsEqual(doc1[key], doc2[key])) {
        return false;
      }
    } else if (doc1[key] != doc2[key]) {
      return false;
    }
  }
  return true;
};
