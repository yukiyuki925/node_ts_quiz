export {};

// import { User } from "./modules/users/user.entity";

declare global {
  namespace Express {
    interface Request {
      currentUser?: any;
    }
  }
}
