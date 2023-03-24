export interface UserInterface {
  IsAuthenticated: boolean;
  username?: string;
  Email?: string;
  Roles?: string[];
  Token?: string;
  empiId?:number ;
  depId?:number;
}
