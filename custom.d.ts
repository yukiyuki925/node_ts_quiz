export {};

import { User } from "./src/modules/users/user.entity";

declare global {
  namespace Express {
    interface Request {
      currentUser: User;
    }
  }
}
