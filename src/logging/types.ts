export interface LibLogger {
    info(msg: string | null | undefined): void;

    debug(msg: string | null | undefined): void;

    warning(msg: string | null | undefined, err?: unknown): void;

    error(msg: string | null | undefined, err?: unknown): void;
}

export class SilentLogger implements LibLogger {
    // eslint-disable-next-line
    info(_msg: string | null | undefined): void {
        //Nothing to do
    }

    // eslint-disable-next-line
    debug(_msg: string | null | undefined): void {
        //Nothing to do
    }

    // eslint-disable-next-line
    warning(_msg: string | null | undefined, _err?: Error): void {
        //Nothing to do
    }

    // eslint-disable-next-line
    error(_msg: string | null | undefined, _err?: Error): void {
        //Nothing to do
    }
}

export class ConsoleLogger implements LibLogger {
    info(msg: string | null | undefined): void {
        console.log(msg);
    }

    debug(msg: string | null | undefined): void {
        console.log(msg);
    }

    warning(msg: string | null | undefined, err?: unknown): void {
        console.warn(msg, err);
    }

    error(msg: string | null | undefined, err?: unknown): void {
        console.error(msg, err);
    }
}
