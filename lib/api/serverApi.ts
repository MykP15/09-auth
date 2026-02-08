import type { AxiosResponse } from "axios";
import { headers } from "next/headers";
import { api } from "./api";
import type { Note } from "@/types/note";
import type { User } from "@/types/user";

export type ServerRequestOptions = {
  cookie?: string;
};

async function getCookieHeader(opts?: ServerRequestOptions) {
  if (opts?.cookie) return opts.cookie;
  const h = await headers();
  return h.get("cookie") ?? "";
}

export type FetchNotesResponse = {
  notes: Note[];
  totalPages: number;
  page: number;
  perPage: number;
};

export type FetchNotesParams = {
  page: number;
  perPage: number;
  search?: string;
  tag?: string;
};

export async function fetchNotesServer(
  params: FetchNotesParams,
  opts?: ServerRequestOptions,
): Promise<FetchNotesResponse> {
  const cookie = await getCookieHeader(opts);
  const { data } = await api.get<FetchNotesResponse>("/notes", {
    params,
    headers: { cookie },
  });
  return data;
}

export async function fetchNoteByIdServer(
  id: string,
  opts?: ServerRequestOptions,
): Promise<Note> {
  const cookie = await getCookieHeader(opts);
  const { data } = await api.get<Note>(`/notes/${id}`, {
    headers: { cookie },
  });
  return data;
}

export async function checkSessionServer(
  opts?: ServerRequestOptions,
): Promise<AxiosResponse<User | null>> {
  const cookie = await getCookieHeader(opts);
  return api.get<User | null>("/auth/session", {
    headers: { cookie },
  });
}

export async function getMeServer(opts?: ServerRequestOptions): Promise<User> {
  const cookie = await getCookieHeader(opts);
  const { data } = await api.get<User>("/users/me", {
    headers: { cookie },
  });
  return data;
}
