import { User } from "../types/User";

export const sortUsers = (users: User[], order: 'asc' | 'desc') => {
    return [...users].sort((a, b) => {
      if (order === 'asc') return a.public_repos - b.public_repos;
      return b.public_repos - a.public_repos;
    });
  };
  