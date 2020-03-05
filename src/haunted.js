import haunted from '../node_modules/haunted/core';
export * from '../node_modules/haunted/core';

import { render } from '../node_modules/lit-html/lit-html';
export * from '../node_modules/lit-html/lit-html';

const { component, createContext } = haunted({ render });
export { component, createContext };
