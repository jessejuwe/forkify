interface Ingredients {
  quantity: number;
  unit: string;
  description: string;
}

class Recipe {
  id: string;
  title: string;
  publisher: string;
  sourceUrl: string;
  image: string;
  servings: number;
  cookingTime: number;
  ingredients: Ingredients[];
  key?: string;
  bookmarked?: boolean;

  constructor() {
    this.id = `recipe-${Math.floor(Math.random() * 10000)}`;
    this.title = '';
    this.publisher = '';
    this.sourceUrl = '';
    this.image = '';
    this.servings = 0;
    this.cookingTime = 0;
    this.ingredients = [];
    this.key = this.key ? this.key : '';
    this.bookmarked = false;
  }
}

export default Recipe;
