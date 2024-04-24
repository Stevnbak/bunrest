import { ServerWebSocket } from "bun";

export type RestSocketHandler<DataType> = (
    ws: ServerWebSocket<DataType>,
    message: string | Buffer,
) => void | Promise<void>

type OpenHandler = (
    ws: ServerWebSocket,
) => void | Promise<void>;

type DrainHandler = (
    ws: ServerWebSocket
) => void | Promise<void>;

type CloseHandler = (
    ws: ServerWebSocket,
      code: number,
      reason: string,
) => void | Promise<void>;

export interface ExtraHandler {
    open?: OpenHandler | undefined;
    close?: CloseHandler | undefined;
    drain?: DrainHandler | undefined;
}