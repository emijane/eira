"use client";

import { useState } from "react";

type ExistingTool = {
    id: string | number;
    name: string;
    slug: string;
    website_url: string | null;
};

type DuplicateResult = {
    by: "name" | "website";
    existing: ExistingTool;
};

type DraftTool = {
    name: string;
    slug: string;
    website_url: string;
    image_file_name?: string | null;
    description: string;
    category: string;
    subcategory: string;
    tags: string[];
};

type ClassifyResponse = {
    draft: DraftTool;
    duplicate: DuplicateResult | null;
    error?: string;
};

type InsertResponse = {
    inserted: DraftTool | null;
    draft: DraftTool;
    duplicate: DuplicateResult | null;
    error?: string;
};

async function postJson<T>(url: string, body: object) {
    // Tiny shared fetch helper for the classify/insert actions in this internal UI.
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-store",
        body: JSON.stringify(body),
    });

    const payload = (await response.json()) as T;

    return {
        ok: response.ok,
        status: response.status,
        payload,
    };
}

async function postFormData<T>(url: string, body: FormData) {
    const response = await fetch(url, {
        method: "POST",
        cache: "no-store",
        body,
    });

    const payload = (await response.json()) as T;

    return {
        ok: response.ok,
        status: response.status,
        payload,
    };
}

export default function DevToolManager() {
    const [websiteUrl, setWebsiteUrl] = useState("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [draft, setDraft] = useState<DraftTool | null>(null);
    const [duplicate, setDuplicate] = useState<DuplicateResult | null>(null);
    const [insertedTool, setInsertedTool] = useState<DraftTool | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [statusMessage, setStatusMessage] = useState<string | null>(null);
    const [isClassifying, setIsClassifying] = useState(false);
    const [isInserting, setIsInserting] = useState(false);

    async function handleClassify(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        // Classification gives us a preview row first, mirroring the old terminal review step.
        setIsClassifying(true);
        setErrorMessage(null);
        setStatusMessage(null);
        setInsertedTool(null);

        try {
            const formData = new FormData();
            formData.set("url", websiteUrl);

            if (selectedFile) {
                formData.set("image", selectedFile);
            }

            const { ok, payload } = await postFormData<ClassifyResponse>(
                "/api/dev-tool/classify",
                formData
            );

            if (!ok) {
                throw new Error(payload.error ?? "Could not classify this tool.");
            }

            setDraft(payload.draft);
            setDuplicate(payload.duplicate);
            setStatusMessage(
                payload.duplicate
                    ? `Classification complete. Existing tool found by ${payload.duplicate.by}.`
                    : "Classification complete. Review the generated row below."
            );
        } catch (error) {
            setDraft(null);
            setDuplicate(null);
            setErrorMessage(
                error instanceof Error ? error.message : "Could not classify this tool."
            );
        } finally {
            setIsClassifying(false);
        }
    }

    async function handleInsert() {
        if (!websiteUrl.trim()) {
            setErrorMessage("Enter a website URL first.");
            return;
        }

        // Insert triggers the same server workflow again so we do not rely on stale client state.
        setIsInserting(true);
        setErrorMessage(null);
        setStatusMessage(null);

        try {
            const { ok, status, payload } = await postJson<InsertResponse>("/api/dev-tool/insert", {
                url: websiteUrl,
                image_file_name: draft?.image_file_name ?? "",
            });

            if (!ok) {
                if (status === 409 && payload.duplicate) {
                    setDraft(payload.draft);
                    setDuplicate(payload.duplicate);
                }

                throw new Error(payload.error ?? "Could not insert this tool.");
            }

            setDraft(payload.draft);
            setDuplicate(null);
            setInsertedTool(payload.inserted);
            setStatusMessage("Tool inserted successfully.");
        } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : "Could not insert this tool.");
        } finally {
            setIsInserting(false);
        }
    }

    return (
        <section className="mt-10 space-y-8">
            <section className="rounded-[1.75rem] border border-black/10 bg-white p-6 shadow-[0_2px_6px_rgba(16,24,40,0.04),0_1px_2px_rgba(16,24,40,0.03)] sm:p-7">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                        Quick add
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-tight text-black">
                        URL + image placeholder
                    </h2>
                </div>

                <form onSubmit={handleClassify} className="mt-6 grid gap-4">
                    <label className="block">
                        <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">
                            Website URL
                        </span>
                        <input
                            type="text"
                            value={websiteUrl}
                            onChange={(event) => {
                                setWebsiteUrl(event.target.value);
                                setDraft(null);
                                setDuplicate(null);
                                setInsertedTool(null);
                            }}
                            placeholder="https://www.example.com"
                            className="h-12 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm text-black outline-none placeholder:text-black/35"
                        />
                    </label>

                    <div className="flex flex-wrap gap-3">
                        <button
                            type="submit"
                            disabled={isClassifying}
                            className="rounded-full bg-black px-4 py-2 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {isClassifying ? "Classifying..." : "Classify tool"}
                        </button>
                        <button
                            type="button"
                            onClick={handleInsert}
                            disabled={isInserting || !draft || !!duplicate}
                            className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium text-black/75 transition hover:text-black disabled:cursor-not-allowed disabled:opacity-45"
                        >
                            {isInserting ? "Inserting..." : "Insert tool"}
                        </button>
                    </div>
                </form>

                <div className="mt-4 rounded-[1.5rem] border border-dashed border-black/12 bg-[#fcfcfc] p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">
                        Upload image
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-3">
                        <label className="cursor-pointer rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium text-black/75 transition hover:text-black">
                            Choose file
                            <input
                                type="file"
                                accept=".png,.jpg,.jpeg,.webp,image/png,image/jpeg,image/webp"
                                className="sr-only"
                                onChange={(event) => {
                                    setSelectedFile(event.target.files?.[0] ?? null);
                                    setDraft(null);
                                    setDuplicate(null);
                                    setInsertedTool(null);
                                }}
                            />
                        </label>
                        <span className="text-sm text-black/55">
                            {selectedFile ? `${selectedFile.name} selected` : "No file selected"}
                        </span>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-black/70">
                        Upload runs during classification and stores the image in Supabase.
                        Max size: 5 MB. Allowed types: PNG, JPG, JPEG, WebP.
                    </p>
                </div>

                {statusMessage ? (
                    <div className="mt-4 rounded-2xl border border-primary/16 bg-primary/6 px-4 py-3 text-sm text-black/75">
                        {statusMessage}
                    </div>
                ) : null}

                {errorMessage ? (
                    <div className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                        {errorMessage}
                    </div>
                ) : null}
            </section>

            {draft ? (
                <section className="rounded-[1.75rem] border border-black/10 bg-white p-6 shadow-[0_2px_6px_rgba(16,24,40,0.04),0_1px_2px_rgba(16,24,40,0.03)] sm:p-7">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                                Generated row
                            </p>
                            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-black">
                                {draft.name}
                            </h2>
                            <p className="mt-2 text-sm text-black/60">{draft.website_url}</p>
                        </div>
                        {insertedTool ? (
                            <span className="rounded-full bg-black px-3 py-1 text-xs font-medium text-white">
                                Inserted
                            </span>
                        ) : duplicate ? (
                            <span className="rounded-full bg-primary/12 px-3 py-1 text-xs font-medium text-primary">
                                Duplicate found
                            </span>
                        ) : (
                            <span className="rounded-full bg-[#fafafa] px-3 py-1 text-xs font-medium text-black/60">
                                Ready to insert
                            </span>
                        )}
                    </div>

                    <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                        {[
                            ["Slug", draft.slug],
                            ["Category", draft.category],
                            ["Subcategory", draft.subcategory],
                            ["Image filename", draft.image_file_name ?? "None"],
                        ].map(([label, value]) => (
                            <div key={label} className="rounded-2xl border border-black/8 bg-[#fcfcfc] px-4 py-3">
                                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">
                                    {label}
                                </p>
                                <p className="mt-1 text-sm text-black/80">{value}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 rounded-[1.5rem] border border-black/10 bg-[#fcfcfc] p-4">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">
                            Description
                        </p>
                        <p className="mt-2 text-sm leading-6 text-black/80">{draft.description}</p>
                    </div>

                    <div className="mt-4 rounded-[1.5rem] border border-black/10 bg-[#fcfcfc] p-4">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">
                            Tags
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                            {draft.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs text-black/70"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {duplicate ? (
                        <div className="mt-4 rounded-[1.5rem] border border-primary/20 bg-primary/6 p-4">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">
                                Existing match
                            </p>
                            <p className="mt-2 text-sm leading-6 text-black/80">
                                A tool with the same {duplicate.by} already exists:
                                {" "}
                                <span className="font-medium text-black">{duplicate.existing.name}</span>
                                {" "}
                                ({duplicate.existing.website_url ?? "No URL"}).
                            </p>
                        </div>
                    ) : null}
                </section>
            ) : null}
        </section>
    );
}
