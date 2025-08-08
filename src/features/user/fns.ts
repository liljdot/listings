import type { User } from "./types";

export const getUserDisplayName = (user: User) => `${user.firstName} ${user.lastName}`