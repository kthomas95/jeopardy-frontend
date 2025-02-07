import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const UserAtom = atomWithStorage<string | null>("user", null);
