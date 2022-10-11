export enum AllergenType {
  Preference = "Preference",
  Allergy = "Allergy",
}

export interface AllergenFilter {
  name: string;
  checked: boolean;
  type: AllergenType;
}

export const DefaultAllergens = [
  {
    name: "alcohol",
    checked: false,
    type: AllergenType.Allergy,
  },
  {
    name: "beef",
    checked: false,
    type: AllergenType.Allergy,
  },
  {
    name: "eggs",
    checked: false,
    type: AllergenType.Allergy,
  },
  {
    name: "fish",
    checked: false,
    type: AllergenType.Allergy,
  },
  {
    name: "gluten",
    checked: false,
    type: AllergenType.Preference,
  },
  {
    name: "halal",
    checked: false,
    type: AllergenType.Preference,
  },
  {
    name: "milk",
    checked: false,
    type: AllergenType.Allergy,
  },
  {
    name: "nuts",
    checked: false,
    type: AllergenType.Allergy,
  },
  {
    name: "pork",
    checked: false,
    type: AllergenType.Allergy,
  },
  {
    name: "sesame",
    checked: false,
    type: AllergenType.Allergy,
  },
  {
    name: "shellfish",
    checked: false,
    type: AllergenType.Allergy,
  },
  {
    name: "soy",
    checked: false,
    type: AllergenType.Allergy,
  },
  {
    name: "treenut",
    checked: false,
    type: AllergenType.Allergy,
  },
  {
    name: "vegan",
    checked: false,
    type: AllergenType.Preference,
  },
  {
    name: "veggie",
    checked: false,
    type: AllergenType.Preference,
  },
];
