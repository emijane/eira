"use client";

import Image from "next/image";
import Link from "next/link";

export default function MainMenu() {
    return (
            <div className="mx-auto flex items-center gap-6 mb-10">
                <div className="flex min-w-0 items-center gap-3">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-1 transition hover:opacity-90"
                    >
                        <Image
                            src="/favicon.png"
                            alt="Eira Tools icon"
                            width={44}
                            height={44}
                            className="h-11 w-11 object-contain"
                        />
                        <span className="text-xl font-semibold tracking-tight text-white">
                            eira
                        </span>
                    </Link>
                </div>
            </div>
    );
}
