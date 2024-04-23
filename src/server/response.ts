export class BunResponse {
    private response: Response;
    private options: ResponseInit = {};

    status(code: number): BunResponse {
        this.options.status = code;
        return this;
    }

    option(option: ResponseInit): BunResponse {
        this.options = Object.assign(this.options, option);
        return this;
    }

    statusText(text: string): BunResponse {
        this.options.statusText = text;
        return this;
    }

    json(body: any): void {
        this.response = Response.json(body, this.options);
    }

    send(body: any): void {
        this.response = new Response(body, this.options);
    }

    redirect(url: string, status: number = 302): void {
        this.response = Response.redirect(url, status);
    }

    // nodejs way to set headers
    setHeader(key: string, value: any) {
        if (!key || !value) {
            throw new Error('Headers key or value should not be empty');
        }

        const headers = this.options.headers;
        if (!headers) {
            this.options.headers = { keys: value };
        }
        this.options.headers[key] = value;
        return this;
    }

    // nodejs way to get headers
    getHeader() {
        return this.options.headers;
    }

    removeHeader(key: string) {
        if (!key) {
            throw new Error("Headers key should not be empty");
        }
        if (this.options.headers) delete this.options.headers[key];
        return this;
    }
    
    // does not implement signed cookies
    cookie(name: string, value: string, options: CookieOptions) {
        var opts = {...options};
        var val = typeof value === "object" ? "j:" + JSON.stringify(value) : String(value);
        if (opts.maxAge != null) {
            var maxAge = opts.maxAge - 0;

            if (!isNaN(maxAge)) {
                opts.expires = new Date(Date.now() + maxAge);
                opts.maxAge = Math.floor(maxAge / 1000);
            }
        }
        if (opts.path == null) {
            opts.path = "/";
        }
        this.setHeader("Set-Cookie", cookie.serialize(name, String(val), opts));
        return this;
    }

    clearCookie(name: string, options: CookieOptions) {
        var opts = {...{ expires: new Date(1), path: '/' }, ...options};
        return this.cookie(name, '', opts);
    };

    headers(header: HeadersInit): BunResponse {
        this.options.headers = header;
        return this;
    }

    getResponse(): Response {
        return this.response;
    }

    isReady(): boolean {
        return !!this.response;
    }
}

import cookie from "cookie";
export interface CookieOptions {
    /** Convenient option for setting the expiry time relative to the current time in **milliseconds**. */
    maxAge?: number | undefined;
    /** Expiry date of the cookie in GMT. If not specified or set to 0, creates a session cookie. */
    expires?: Date | undefined;
    /** Flags the cookie to be accessible only by the web server. */
    httpOnly?: boolean | undefined;
    /** Path for the cookie. Defaults to “/”. */
    path?: string | undefined;
    /** Domain name for the cookie. Defaults to the domain name of the app. */
    domain?: string | undefined;
    /** Marks the cookie to be used with HTTPS only. */
    secure?: boolean | undefined;
    /** A synchronous function used for cookie value encoding. Defaults to encodeURIComponent. */
    encode?: ((val: string) => string) | undefined;
    /**
     * Value of the “SameSite” Set-Cookie attribute.
     * @link https://tools.ietf.org/html/draft-ietf-httpbis-cookie-same-site-00#section-4.1.1.
     */
    sameSite?: boolean | "lax" | "strict" | "none" | undefined;
    /**
     * Value of the “Priority” Set-Cookie attribute.
     * @link https://datatracker.ietf.org/doc/html/draft-west-cookie-priority-00#section-4.3
     */
    priority?: "low" | "medium" | "high";
    /** Marks the cookie to use partioned storage. */
    partitioned?: boolean | undefined;
}