export interface UserInterface {
  IsAuthenticated: boolean;
  Username?: string;
  Email?: string;
  Roles?: string[];
  Token?: string;
}
