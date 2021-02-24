export enum TicketTypeEnum {
    TIME,
    VISITOR,
    STUDENT,
    SCHOOL,
    SINGLE,
    AIRPORT,
    LONG
}

export type TicketType = {
    id: string,
    suggestion?: string,
    title: string,
    shortDesc: string,
    price: string,
    type: TicketTypeEnum,
    popular?: boolean,
    info: Array<string>,
    timeValid: number
};


export const TICKETS_TIME: Array<TicketType> = [
    {
        id: "T1",
        title: "Day Ticket Vienna",
        shortDesc: "Valid for one day from the started date until 1.00 am on the following day",
        suggestion: "Ideal for visitors who want to see as much of the city as possible in the shortest possible time.",
        price: "5.80",
        info: ["Valid on all public transport services in Vienna", "Ticket purchase possible a maximum of 60 days before validity date", "This ticket is not transferable"],
        type: TicketTypeEnum.TIME,
        timeValid: 1440
    },
    {
        id: "T2",
        title: "24-h Vienna ticket",
        shortDesc: "Valid for 24 hours from the stated date and time",
        suggestion: "Ideal for visitors who want to see as much of the city as possible in the shortest possible time.",
        price: "8.00",
        type: TicketTypeEnum.TIME,
        info: ["Valid on all public transport services in Vienna", "Ticket purchase possible a maximum of 60 days before validity date", "This ticket is not transferable"],
        popular: true,
        timeValid: 1440
    },
    {
        id: "T3",
        title: "48 hours vienna ticket",
        shortDesc: "Valid for 48 hours from the stated date and time",
        suggestion: "Ideal for visitors who want to see as much of the city as possible in the shortest possible time.",
        price: "14.10",
        info: ["Valid on all public transport services in Vienna", "Ticket purchase possible a maximum of 60 days before validity date", "This ticket is not transferable"],
        type: TicketTypeEnum.TIME,
        timeValid: 2880
    },
    {
        id: "T4",
        title: "72 hours Vienna ticket",
        shortDesc: "Valid for 72 hours from the stated date and time",
        suggestion: "Ideal for visitors who want to see as much of the city as possible in the shortest possible time.",
        price: "17.10",
        info: ["Valid on all public transport services in Vienna", "Ticket purchase possible a maximum of 60 days before validity date", "This ticket is not transferable"],
        type: TicketTypeEnum.TIME,
        timeValid: 4320
    },
    {
        id: "T5",
        title: "Weekly ticket Vienna",
        shortDesc: "Valid from midnight on Monday until 9.00 am on the following Monday",
        suggestion: "Ideal for visitors who want to see as much of the city as possible in the shortest possible time.",
        price: "17.10",
        type: TicketTypeEnum.TIME,
        info: ["Valid on all public transport services in Vienna", "Ticket purchase possible a maximum of 60 days before validity date", "This ticket is not transferable"],
        popular: true,
        timeValid: 10080
    }, {
        id: "T6",
        title: "Monthly ticket Vienna",
        shortDesc: "Valid from midnight on the first day of the month until midnight of the second day of the following month",
        suggestion: "Ideal for visitors who want to see as much of the city as possible in the shortest possible time.",
        price: "51.00",
        info: ["Valid on all public transport services in Vienna", "Ticket purchase possible a maximum of 60 days before validity date", "This ticket is not transferable"],
        type: TicketTypeEnum.TIME,
        timeValid: 43800
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
        popular: true,
        timeValid: 80
    },
    {
        id: "S2",
        suggestion: "The best way for a spontaneous journey by public transport",
        title: "Discounted Single trip Vienna",
        shortDesc: "Valid for children (6 to 15 years of age), in basic military service, and holders of the social passport \"P\" and dogs",
        price: "1.20",
        info: ["Valid on all public transport services in the core zone Vienna", "The ticket holder can change lines (as often as they like)", "The journey may not be interrupted"],
        type: TicketTypeEnum.SINGLE,
        timeValid: 80
    },
    {
        id: "S3",
        suggestion: "The best way for a spontaneous journey by public transport",
        title: "Senior Single trip Vienna",
        shortDesc: "Valid for people from the age of 63 years",
        price: "1.50",
        info: ["Valid on all public transport services in the core zone Vienna", "The ticket holder can change lines (as often as they like)", "The journey may not be interrupted"],
        type: TicketTypeEnum.SINGLE,
        timeValid: 80
    }
]


export const TICKETS_VISITOR: Array<TicketType> = [
    {
        id: "V1",
        title: "Vienna City Card (24 hours)",
        shortDesc: "Get the most from your visit to Vienna with the 24 hour Vienna City Card",
        suggestion: "The official Vienna Card: Your discount card in the city",
        price: "17",
        info: ["Valid  from the stated date and time", "The ticket is not transferable", "Get the most from your visit to Vienna with the 24, 48 or 72 hour Vienna City Card. It includes free travel on public transports throughout the city, as well as the chance to enjoy more than 210 discounts on everything from museum entry to heuriger visits"],
        type: TicketTypeEnum.VISITOR,
        popular: true,
        timeValid: 1440
    },
    {
        id: "V2",
        title: "Vienna City Card (48 hours)",
        shortDesc: "Get the most from your visit to Vienna with the 48 hour Vienna City Card",
        suggestion: "The official Vienna Card: Your discount card in the city",
        price: "25",
        info: ["Valid  from the stated date and time", "The ticket is not transferable", "Get the most from your visit to Vienna with the 24, 48 or 72 hour Vienna City Card. It includes free travel on public transports throughout the city, as well as the chance to enjoy more than 210 discounts on everything from museum entry to heuriger visits"],
        type: TicketTypeEnum.VISITOR,
        timeValid: 2880
    },
    {
        id: "V3",
        title: "Vienna City Card (72 hours)",
        shortDesc: "Get the most from your visit to Vienna with the 72 hour Vienna City Card",
        suggestion: "The official Vienna Card: Your discount card in the city",
        price: "29",
        info: ["Valid  from the stated date and time", "The ticket is not transferable", "Get the most from your visit to Vienna with the 24, 48 or 72 hour Vienna City Card. It includes free travel on public transports throughout the city, as well as the chance to enjoy more than 210 discounts on everything from museum entry to heuriger visits"],
        type: TicketTypeEnum.VISITOR,
        timeValid: 4320
    },
    {
        id: "V4",
        title: "EASY CityPass Vienna (24 hours)",
        shortDesc: "The experience-ticket for tourists in Vienna",
        suggestion: "The Easy City Pass Vienna authorizes you to visit museums, theaters, restaurants, recreational facilities and many more with discounted tickets.",
        price: "14.90",
        info: ["Valid  from the stated date and time", "The ticket is not transferable", "Users of the ticket can be accompanied by a child until 15th birthday free of char"],
        type: TicketTypeEnum.VISITOR,
        popular: true,
        timeValid: 1440
    },
    {
        id: "V5",
        title: "EASY CityPass Vienna (48 hours)",
        shortDesc: "The experience-ticket for tourists in Vienna",
        suggestion: "The Easy City Pass Vienna authorizes you to visit museums, theaters, restaurants, recreational facilities and many more with discounted tickets.",
        price: "19.90",
        info: ["Valid  from the stated date and time", "The ticket is not transferable", "Get the most from your visit to Vienna with the 24, 48 or 72 hour Vienna City Card. It includes free travel on public transports throughout the city, as well as the chance to enjoy more than 210 discounts on everything from museum entry to heuriger visits"],
        type: TicketTypeEnum.VISITOR,
        timeValid: 2880
    },
    {
        id: "V6",
        title: "EASY CityPass Vienna (72 hours)",
        shortDesc: "The experience-ticket for tourists in Vienna",
        suggestion: "The Easy City Pass Vienna authorizes you to visit museums, theaters, restaurants, recreational facilities and many more with discounted tickets.",
        price: "24.90",
        info: ["Valid  from the stated date and time", "The ticket is not transferable", "Get the most from your visit to Vienna with the 24, 48 or 72 hour Vienna City Card. It includes free travel on public transports throughout the city, as well as the chance to enjoy more than 210 discounts on everything from museum entry to heuriger visits"],
        type: TicketTypeEnum.VISITOR,
        timeValid: 4320
    },
    {
        id: "V7",
        title: "QUEER CityPass Vienna (24 hours)",
        shortDesc: "The experience-ticket for LGBTIQ* tourists in Vienna",
        suggestion: "(LGBTIQ=Lesbian, Gay, Bisexual, Transgender, Intersex, Queer)",
        price: "14.90",
        info: ["Valid  from the stated date and time", "The ticket is not transferable", "Get the most from your visit to Vienna with the 24, 48 or 72 hour Vienna City Card. It includes free travel on public transports throughout the city, as well as the chance to enjoy more than 210 discounts on everything from museum entry to heuriger visits"],
        type: TicketTypeEnum.VISITOR,
        popular: true,
        timeValid: 1440
    },
    {
        id: "V8",
        title: "QUEER CityPass Vienna (48 hours)",
        shortDesc: "The experience-ticket for LGBTIQ* tourists in Vienna",
        suggestion: "(LGBTIQ=Lesbian, Gay, Bisexual, Transgender, Intersex, Queer)",
        price: "19.90",
        info: ["Valid  from the stated date and time", "The ticket is not transferable", "Get the most from your visit to Vienna with the 24, 48 or 72 hour Vienna City Card. It includes free travel on public transports throughout the city, as well as the chance to enjoy more than 210 discounts on everything from museum entry to heuriger visits"],
        type: TicketTypeEnum.VISITOR,
        timeValid: 2880
    },
    {
        id: "V9",
        title: "QUEER CityPass Vienna (72 hours)",
        shortDesc: "The experience-ticket for LGBTIQ* tourists in Vienna",
        suggestion: "(LGBTIQ=Lesbian, Gay, Bisexual, Transgender, Intersex, Queer)",
        price: "24.90",
        info: ["Valid  from the stated date and time", "The ticket is not transferable", "Get the most from your visit to Vienna with the 24, 48 or 72 hour Vienna City Card. It includes free travel on public transports throughout the city, as well as the chance to enjoy more than 210 discounts on everything from museum entry to heuriger visits"],
        type: TicketTypeEnum.VISITOR,
        timeValid: 4320
    },
]

export const TICKETS_AIRPORT: Array<TicketType> = [
    {
        id: "A1",
        title: "Vienna Airport Lines- Single Ticket",
        shortDesc: "Valid exclusively on the airport busses of Vienna Airport Lines",
        suggestion: "In order order to make your stay in Vienna as pleasant as possible, we would like to offer - in cooperation with the Vienna Airport Lines - the following offer for transfer from the airport Vienna/Schwechat directly to Vienna and back",
        price: "8",
        info: ["Valid for selected day and direction", "Valid for one-way or return ticket", "Children under 6 years of age travel without a ticket for free", "Valid between the airport Wien/Schwechat and Vienna (including all Vienna Airport Lines stations)"],
        type: TicketTypeEnum.AIRPORT,
        popular: true,
        timeValid: 120
    },
    {
        id: "A2",
        title: "Vienna Airport Lines- Return Ticket",
        shortDesc: "Valid exclusively on the airport busses of Vienna Airport Lines",
        suggestion: "In order order to make your stay in Vienna as pleasant as possible, we would like to offer - in cooperation with the Vienna Airport Lines - the following offer for transfer from the airport Vienna/Schwechat directly to Vienna and back.",
        price: "8",
        info: ["Valid for selected day and direction", "Valid for one-way or return ticket", "Children under 6 years of age travel without a ticket for free", "Valid between the airport Wien/Schwechat and Vienna (including all Vienna Airport Lines stations)"],
        type: TicketTypeEnum.AIRPORT,
        timeValid: 240
    },
]

export const ALL_TICKETS: Array<TicketType> = [...TICKETS_TIME, ...TICKETS_SINGLE, ...TICKETS_VISITOR, ...TICKETS_AIRPORT];
