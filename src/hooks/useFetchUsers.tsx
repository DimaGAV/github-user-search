import { useState, useEffect } from 'react';
import { User } from '../types/User';

interface FetchUsersResult {
  users: User[];
  loading: boolean;
  error: string | null;
  totalPages: number;
}

const useFetchUsers = (query: string, page: number): FetchUsersResult => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    if (!query) return;

    const fetchUsers = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`https://api.github.com/search/users?q=${query}&page=${page}&per_page=10`);
        const data = await response.json();
        setUsers(data.items);

        // Извлечение информации о пагинации из заголовка Link
        const linkHeader = response.headers.get('Link');
        if (linkHeader) {
          const lastPageMatch = linkHeader.match(/&page=(\d+)>; rel="last"/);
          if (lastPageMatch) {
            setTotalPages(parseInt(lastPageMatch[1], 10));
          }
        }
      } catch (err) {
        setError('Ошибка при получении данных');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [query, page]);

  return { users, loading, error, totalPages };
};

export default useFetchUsers;
