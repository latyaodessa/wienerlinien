export enum TicketTypeEnum {
    TIME,
    VISITOR,
    STUDENT,
    SCHOOL,
    SINGLE,
    AIRPORT,
    LONG
}

export type TicketType = { id: string, suggestion?: string, title: string, shortDesc: string, price: string, type: TicketTypeEnum, popular?: boolean, info: Array<string> };


export const TICKETS_TIME: Array<TicketType> = [
    {
        id: "T1",
        title: "Day Ticket Vienna",
        shortDesc: "Valid for one day from the started date until 1.00 am on the following day",
        suggestion: "Ideal for visitors who want to see as much of the city as possible in the shortest possible time.",
        price: "5.80",
        info: ["Valid on all public transport services in Vienna", "Ticket purchase possible a maximum of 60 days before validity date", "This ticket is not transferable"],
        type: TicketTypeEnum.TIME
    },
    {
        id: "T2",
        title: "24-h Vienna ticket",
        shortDesc: "Valid for 24 hours from the stated date and time",
        suggestion: "Ideal for visitors who want to see as much of the city as possible in the shortest possible time.",
        price: "8.00",
        type: TicketTypeEnum.TIME,
        info: ["Valid on all public transport services in Vienna", "Ticket purchase possible a maximum of 60 days before validity date", "This ticket is not transferable"],
        popular: true
    },
    {
        id: "T3",
        title: "48 hours vienna ticket",
        shortDesc: "Valid for 48 hours from the stated date and time",
        suggestion: "Ideal for visitors who want to see as much of the city as possible in the shortest possible time.",
        price: "14.10",
        info: ["Valid on all public transport services in Vienna", "Ticket purchase possible a maximum of 60 days before validity date", "This ticket is not transferable"],
        type: TicketTypeEnum.TIME
    },
    {
        id: "T4",
        title: "72 hours Vienna ticket",
        shortDesc: "Valid for 72 hours from the stated date and time",
        suggestion: "Ideal for visitors who want to see as much of the city as possible in the shortest possible time.",
        price: "17.10",
        info: ["Valid on all public transport services in Vienna", "Ticket purchase possible a maximum of 60 days before validity date", "This ticket is not transferable"],
        type: TicketTypeEnum.TIME
    },
    {
        id: "T5",
        title: "Weekly ticket Vienna",
        shortDesc: "Valid from midnight on Monday until 9.00 am on the following Monday",
        suggestion: "Ideal for visitors who want to see as much of the city as possible in the shortest possible time.",
        price: "17.10",
        type: TicketTypeEnum.TIME,
        info: ["Valid on all public transport services in Vienna", "Ticket purchase possible a maximum of 60 days before validity date", "This ticket is not transferable"],
        popular: true
    }, {
        id: "T6",
        title: "Monthly ticket Vienna",
        shortDesc: "Valid from midnight on the first day of the month until midnight of the second day of the following month",
        suggestion: "Ideal for visitors who want to see as much of the city as possible in the shortest possible time.",
        price: "51.00",
        info: ["Valid on all public transport services in Vienna", "Ticket purchase possible a maximum of 60 days before validity date", "This ticket is not transferable"],
        type: TicketTypeEnum.TIME
    }
];

export const TICKETS_SINGLE: Array<TicketType> = [
    {
        id: "S1",
        suggestion: "The best way for a spontaneous journey by public transport",
        title: "Single trip Vienna",
        shortDesc: "Valid for one trip in one direction",
        price: "2.40",
        info: ["Valid on all public transport services in the core zone Vienna", "The ticket holder can change lines (as often as they like)", "The journey may not be interrupted"],
        type: TicketTypeEnum.SINGLE,
        popular: true
    },
    {
        id: "S2",
        suggestion: "The best way for a spontaneous journey by public transport",
        title: "Discounted Single trip Vienna",
        shortDesc: "Valid for children (6 to 15 years of age), in basic military service, and holders of the social passport \"P\" and dogs",
        price: "1.20",
        info: ["Valid on all public transport services in the core zone Vienna", "The ticket holder can change lines (as often as they like)", "The journey may not be interrupted"],
        type: TicketTypeEnum.SINGLE
    },
    {
        id: "S3",
        suggestion: "The best way for a spontaneous journey by public transport",
        title: "Senior Single trip Vienna",
        shortDesc: "Valid for people from the age of 63 years",
        price: "1.50",
        info: ["Valid on all public transport services in the core zone Vienna", "The ticket holder can change lines (as often as they like)", "The journey may not be interrupted"],
        type: TicketTypeEnum.SINGLE
    }
]


export const ALL_TICKETS:Array<TicketType>  = [...TICKETS_TIME, ...TICKETS_SINGLE];
