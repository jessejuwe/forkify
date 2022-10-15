class Recipe {
  id: string;
  title: string;
  publisher: string;
  sourceUrl: string;
  image: string;
  servings: number | string;
  cookingTime: number | string;
  ingredients: any;
  key?: string;

  constructor() {
    this.id = `${Math.floor(Math.random() * 10000)}`;
    this.title = '';
    this.publisher = '';
    this.sourceUrl = '';
    this.image = '';
    this.servings = 0;
    this.cookingTime = 0;
    this.ingredients = '';
    this.key = this.key ? this.key : '';
  }
}

export default Recipe;
