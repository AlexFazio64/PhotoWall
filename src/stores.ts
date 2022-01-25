import { writable } from "svelte/store";
import type { Auth, AuthProvider, UserCredential } from "firebase/auth";

export const logged = writable<number>(0);
export const uid = writable<string>("");
export const user = writable<UserCredential>();
export const auth = writable<Auth>();
export const provider = writable<AuthProvider>();
