/* eslint-disable no-undef */
import { Headers } from './config';

function apiServiceWrapper(path, methodType, data) {
  return fetch(path, {
    method: methodType,
    Headers,
    body: data,
  });
}

export default apiServiceWrapper;
