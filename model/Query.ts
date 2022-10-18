class Query {
  id: string;
  image: string;
  publisher: string;
  title: string;
  key?: string;

  constructor() {
    this.id = `recipe-${Math.floor(Math.random() * 10000)}`;
    this.image = '';
    this.publisher = '';
    this.title = '';
    this.key = '';
  }
}

export default Query;
