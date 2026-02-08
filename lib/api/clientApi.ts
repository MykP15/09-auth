import { api } from "./api";
import type { Note } from "@/types/note";
import type { User } from "@/types/user";

type ApiSuccess<T> = { success: true; data: T };
type ApiFail = { success: false; error?: string; message?: string };

function isObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}

function isApiFail(v: unknown): v is ApiFail {
  return (
    isObject(v) &&
    "success" in v &&
    v.success === false &&
    (typeof v.error === "string" ||
      typeof v.message === "string" ||
      v.error === undefined ||
      v.message === undefined)
  );
}

function isApiSuccess<T>(v: unknown): v is ApiSuccess<T> {
  return isObject(v) && "success" in v && v.success === true && "data" in v;
}

function getErrorMessage(payload: unknown, fallback: string) {
  if (!isObject(payload)) return fallback;
  const error = payload.error;
  const message = payload.message;
  if (typeof error === "string" && error.trim()) return error;
  if (typeof message === "string" && message.trim()) return message;
  return fallback;
}

function unwrap<T>(payload: unknown, fallback: string): T {
  if (isApiFail(payload)) {
    throw new Error(getErrorMessage(payload, fallback));
  }
  if (isApiSuccess<T>(payload)) {
    return payload.data;
  }

  return payload as T;
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

export async function fetchNotes({
  page,
  search,
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> {
  const { data } = await api.get<FetchNotesResponse>("/notes", {
    params: {
      page,
      search,
      tag,
    },
  });
  return data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const res = await api.get(`/notes/${id}`);
  return res.data;
}

export type NewNote = {
  title: string;
  content: string;
  tag: string;
};

export async function createNote(payload: NewNote): Promise<Note> {
  const res = await api.post("/notes", payload);
  return res.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const res = await api.delete(`/notes/${id}`);
  return res.data;
}

export type AuthPayload = {
  email: string;
  password: string;
};

export async function register(payload: AuthPayload): Promise<User> {
  const res = await api.post("/auth/register", payload);
  return res.data;
}

export async function login(payload: AuthPayload): Promise<User> {
  const res = await api.post("/auth/login", payload);
  return res.data;
}

export async function logout(): Promise<void> {
  await api.post("/auth/logout");
}

export async function checkSession(): Promise<User | null> {
  const res = await api.get("/auth/session");

  if (isApiFail(res.data)) return null;
  if (isApiSuccess<User>(res.data)) return res.data.data;
  if (res.data == null) return null;

  return res.data as User;
}

export async function getMe(): Promise<User> {
  const res = await api.get("/users/me");
  return unwrap<User>(res.data, "Failed to load profile");
}

export type UpdateMePayload = Partial<Pick<User, "username">>;

export async function updateMe(payload: UpdateMePayload): Promise<User> {
  const res = await api.patch("/users/me", payload);
  return unwrap<User>(res.data, "Failed to update profile");
}
