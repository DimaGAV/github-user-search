import React from 'react';
import { User } from '../../types/User';

interface UserListProps {
  users: User[];
  onSort: (order: 'asc' | 'desc') => void;
  onUserClick: (user: User) => void;
}

const UserList: React.FC<UserListProps> = ({ users, onSort, onUserClick }) => {
  return (
    <div>
      <button onClick={() => onSort('asc')}>Сортировать по возрастанию репозиториев</button>
      <button onClick={() => onSort('desc')}>Сортировать по убыванию репозиториев</button>
      <ul>
        {users.map((user) => (
          <li key={user.id} onClick={() => onUserClick(user)}>
            {user.login} - Репозитории: {user.public_repos}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
