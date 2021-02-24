import AsyncStorage from '@react-native-async-storage/async-storage';
import {TicketType} from '../constants/Tickets';

export const WL_TICKETS_STORAGE_KEY = "@wl_tickets"
export const WL_SCHEDULER_STORAGE_KEY = "@wl_scheduler"
export const WL_USER_STORAGE_KEY = "@wl_user"

export function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export enum DaysOfWeek {
    MN = "Monday",
    TUE = "Tuesday",
    WEN = "Wednesday",
    THU = "Thursday",
    FR = "Friday",
    SUT = "Saturday",
    SUN = "Sunday"
}

export type TimeType = {
    hours: number,
    minutes: number
}

export type TicketScheduler = {
    wlTicket?: WLTicket,
    time?: TimeType,
    days: Array<DaysOfWeek>,
    dismiss?: number
}

export type WLTicket = {
    id: string,
    ticket: TicketType,
    station?: string,
    validFrom: Date,
    validTo: Date
}

export const storeWLTicket = async (ticket: WLTicket) => {
    try {
        const tickets: Array<WLTicket> = await getWLTickets();
        tickets.unshift(ticket);
        const jsonValue = JSON.stringify(tickets)
        await AsyncStorage.setItem(WL_TICKETS_STORAGE_KEY, jsonValue);
    } catch (e) {
        // saving error
    }
}

export const resetTickets = async () => {
    try {
        await AsyncStorage.removeItem(WL_TICKETS_STORAGE_KEY);
    } catch (e) {
        // saving error
    }
}

export async function getWLTickets(): Promise<Array<WLTicket>> {
    try {
        const jsonValue = await AsyncStorage.getItem(WL_TICKETS_STORAGE_KEY);

        return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
        return [];
    }
}


export const storeScheduler = async (scheduler?: TicketScheduler) => {
    try {
        if (scheduler) {
            const jsonValue = JSON.stringify(scheduler)
            await AsyncStorage.setItem(WL_SCHEDULER_STORAGE_KEY, jsonValue);
        } else {
            await AsyncStorage.removeItem(WL_SCHEDULER_STORAGE_KEY);
        }
    } catch (e) {
        // saving error
    }
}


export async function getScheduler(): Promise<TicketScheduler> {
    try {
        const jsonValue = await AsyncStorage.getItem(WL_SCHEDULER_STORAGE_KEY);

        return jsonValue != null ? JSON.parse(jsonValue) : undefined;
    } catch (e) {
        return {
            days: [],
        };
    }
}

export const storeSession = async (login: boolean) => {
    try {
        if (login) {
            await AsyncStorage.setItem(WL_USER_STORAGE_KEY, String(login));
        } else {
            await AsyncStorage.removeItem(WL_USER_STORAGE_KEY);
        }
    } catch (e) {
        // saving error
    }
}


export async function getSession(): Promise<boolean> {
    try {
        const jsonValue = await AsyncStorage.getItem(WL_USER_STORAGE_KEY);

        return jsonValue != null ? Boolean(jsonValue) : false;
    } catch (e) {
        return false;
    }
}

