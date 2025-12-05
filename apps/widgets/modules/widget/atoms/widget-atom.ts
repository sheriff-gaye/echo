import { atom } from "jotai";
import { widgetScreen } from "../types";
import {atomFamily, atomWithStorage} from "jotai/utils"
import { CONTACT_SESSION_KEY } from "../constants";



export const screenAtom=atom<widgetScreen>("loading");

export const organizationIdAtom=atom<string | null>(null);


export const contactSessionIdAtomFamily=atomFamily((organizationId:string)=>atomWithStorage(`${CONTACT_SESSION_KEY}_${organizationId}`, null))

export const errorMessageAtom=atom<string | null>(null);

export const loadingMessageAtom=atom<string | null>(null);