export interface DiningLists {
  locations: Location[];
  updated: number;
}

export interface Location {
  name: string;
  days: Day[];
}

export interface Day {
  name: string;
  date: string;
  meals: Meal[];
}

export interface Meal {
  name: string;
  categories: Category[];
}

export interface Category {
  name: string;
  menus: Menu[];
}

export interface Menu {
  [x: string]: any;
  name: string;
  allergens: Allergen[];
  price: number | null;
}

export interface Allergen {
  name: string;
}
