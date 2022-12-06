import { Collection, ObjectId } from "mongodb";

export interface Viewer {
    _id?: string;
    token?: string;
    avatar?: string;
    walletId?: string;
    didRequest: boolean;
}

export enum ListingType {
    Apartment = "APARTMENT",
    House = "HOUSE",
}

export interface BookingsIndexMonth {
    [key: string]: boolean;
}

export interface BookingsIndexYear {
    [key: string]: BookingsIndexMonth;
}

export interface BookingsIndex {
    [key: string]: BookingsIndexYear;
}


// NOTE: JavaScript function for getting month returns 0 for Jan and 11 for Dec
const bookingsIndex: BookingsIndex = {
  "2019": {

    // 2019-01-01 is booked
    "00": {
      "01": true,
      "02": true
    },

    // 2019-04-31 is booked
    "04": {
      "31": true
    },

    // 2019-05-01 is booked
    "05": {
      "01": true
    },

    // 2019-06-20 is booked
    "06": {
      "20": true
    }
  }
}



export interface Booking {
    _id: ObjectId;
    listing: ObjectId;
    tenant: string;  // user_id that booked the listing
    checkIn: string;
    checkOut: string;
}

export interface Listing {
    _id: ObjectId;
    title: string;
    description: string;
    image: string;
    host: string;  // host user_id
    type: ListingType;
    address: string;
    country: string;
    admin: string;
    city: string;
    bookings: ObjectId[];
    bookingsIndex: BookingsIndex;
    price: number;
    numOfGuests: number;
}

export interface User {
    _id: string;
    token: string;
    name: string;
    avatar: string;
    contact: string;
    walletId?: string;
    income: number;
    bookings: ObjectId[];  // refers to the document in the bookings collection
    listings: ObjectId[];  // refers to the document in the listings collection
}

export interface Database {
    bookings: Collection<Booking>;
    listings: Collection<Listing>;
    users: Collection<User>;
}