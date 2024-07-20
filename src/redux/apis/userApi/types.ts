export interface UserList {
  results: User[];
}

export interface User {
  gender: Gender;
  name: Name;
  location: Location;
  email: string;
  phone: string;
  cell: string;
  id: ID;
  picture: Picture;
  nat: string;
}

export enum Gender {
  Female = "female",
  Male = "male"
}

export interface ID {
  name: string;
  value: null | string;
}

export interface Location {
  street: Street;
  city: string;
  state: string;
  country: string;
  postcode: number | string;
  coordinates: Coordinates;
  timezone: Timezone;
}

export interface Coordinates {
  latitude: string;
  longitude: string;
}

export interface Street {
  number: number;
  name: string;
}

export interface Timezone {
  offset: string;
  description: string;
}

export interface Name {
  title: Title;
  first: string;
  last: string;
}

export enum Title {
  MS = "Ms",
  Mademoiselle = "Mademoiselle",
  Miss = "Miss",
  Mr = "Mr",
  Mrs = "Mrs"
}

export interface Picture {
  large: string;
  medium: string;
  thumbnail: string;
}
