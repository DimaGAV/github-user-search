import React, { useState } from 'react';
import Search from './components/Search/Search.tsx';
import UserList from './components/UserList/UserList.tsx';
import UserDetails from './components/UserDetails/UserDetails.tsx';
import Pagination from './components/Pagination/Pagination.tsx';
import useFetchUsers from './hooks/useFetchUsers.tsx';
import { sortUsers } from './utils/sortUsers.ts';
import { User } from './types/User';

const App: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  
  const { users, loading, error } = useFetchUsers(query, page);
  const sortedUsers = sortUsers(users, sortOrder);

  return (
    <div className="App">
      <Search onSearch={setQuery} />
      {error && <p>{error}</p>}
      {loading ? <p>Загрузка...</p> : (
        <>
          <UserList users={sortedUsers} onSort={setSortOrder} onUserClick={setSelectedUser} />
          <Pagination currentPage={page} totalPages={5} onPageChange={setPage} />
        </>
      )}
      <UserDetails user={selectedUser} />
    </div>
  );
};

export default App;
