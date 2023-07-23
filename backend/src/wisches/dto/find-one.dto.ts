export class FindOneDto {
  id: number;
  name: string;
  link: string;
  image: string;
  price: string;
  raised: string;
  description: string;
  copied: number;
  createdAt: string;
  updatedAt: string;
  owner: {
    id: number;
    username: string;
  };
  offers: {
    createdAt: string;
    amount: string;
    user?: {
      username: string;
    };
    name?: string;
  }[];
}
