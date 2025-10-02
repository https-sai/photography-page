// src/lib/asset.ts
export const asset = (p: string) =>
    `${import.meta.env.BASE_URL}${p.replace(/^\/+/, "")}`;