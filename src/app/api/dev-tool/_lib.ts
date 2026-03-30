import { NextResponse } from "next/server";

const JSON_HEADERS = {
    "Cache-Control": "no-store",
} as const;

export function denyInProduction() {
    // Keep the internal ingestion UI unavailable outside local development.
    if (process.env.NODE_ENV !== "development") {
        return NextResponse.json({ error: "Not found." }, { status: 404, headers: JSON_HEADERS });
    }

    return null;
}

export function verifySameOrigin(request: Request) {
    // Route Handlers are public endpoints, so reject cross-origin browser calls.
    const origin = request.headers.get("origin");
    const host = request.headers.get("host");

    if (!origin || !host) {
        return null;
    }

    try {
        const originUrl = new URL(origin);

        if (originUrl.host !== host) {
            return NextResponse.json(
                { error: "Cross-origin requests are not allowed." },
                { status: 403, headers: JSON_HEADERS }
            );
        }
    } catch {
        return NextResponse.json(
            { error: "Invalid request origin." },
            { status: 400, headers: JSON_HEADERS }
        );
    }

    return null;
}

export async function parseJsonBody(request: Request) {
    // Accept JSON only to reduce ambiguity and keep the dev tool request surface narrow.
    const contentType = request.headers.get("content-type") ?? "";

    if (!contentType.toLowerCase().includes("application/json")) {
        throw new Error("Requests must use application/json.");
    }

    return request.json();
}

export async function parseMultipartBody(request: Request) {
    const contentType = request.headers.get("content-type") ?? "";

    if (!contentType.toLowerCase().includes("multipart/form-data")) {
        throw new Error("Requests must use multipart/form-data.");
    }

    return request.formData();
}

export function jsonResponse(body: unknown, status = 200) {
    return NextResponse.json(body, { status, headers: JSON_HEADERS });
}
