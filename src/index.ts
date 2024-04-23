"use strict";

import { server } from "./server/server";

export default server;

//Export types
export type * from "./server/response";
export type * from "./server/request";
export type * from "./server/server";
export type * from "./router/router";
export type * from "./server/websocket";
