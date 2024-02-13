export type User = {
  id?: number;
  name: string;
  dogName: string;
  date: Date | string; //Testing needed a string to work.
  friendly: boolean | number; // can be either boolean or number
  puppy: boolean | number; // can be either boolean or number
};
