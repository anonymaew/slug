export interface Lists {
  locations: Location[];
  updated: string;
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
  name: string;
  allergens: Allergen[];
  price: number | null;
}

export interface Allergen {
  name: string;
}
