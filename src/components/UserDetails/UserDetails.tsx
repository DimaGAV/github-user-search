import React from 'react';
import { User } from '../../types/User';

interface UserDetailsProps {
  user: User | null;
}

const UserDetails: React.FC<UserDetailsProps> = ({ user }) => {
  return user ? (
    <div>
      <h2>{user.login}</h2>
      <p>ID: {user.id}</p>
      <p>Репозитории: {user.public_repos}</p>
      <p>URL: <a href={user.html_url}>{user.html_url}</a></p>
    </div>
  ) : null;
};

export default UserDetails;
