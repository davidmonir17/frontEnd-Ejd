export interface UserInterface {
  IsAuthenticated: boolean;
  Username?: string;
  Email?: string;
  Roles?: string[];
  Token?: string;
  empiId?:number ;
  depId?:number;
}
