import { User } from "@/models/user";
import { BaseService } from "./base.service";

export const UserService = new BaseService<User>("users");

