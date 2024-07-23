import React, { useState, useMemo, useCallback } from 'react';
import debounce from 'lodash.debounce';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newUserName, setNewUserName] = useState('');
  const [showUsers, setShowUsers] = useState(false);

  const handleSearch = useCallback(
    debounce((value) => {
      setSearchTerm(value);
    }, 50),
    []
  );

  const handleAddUser = () => {
    if (newUserName.trim() !== '') {
      setUsers([...users, { id: Date.now(), name: newUserName }]);
      setNewUserName('');
    }
  };

  const filteredUsers = useMemo(() => {
    return users.filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  return (
    <section>
      <h3>Add User</h3>
      <input 
        type="text" 
        value={newUserName}
        onChange={(e) => setNewUserName(e.target.value)}
        placeholder='Enter user name'
      />
      <button onClick={handleAddUser}>Add User</button>
      <h3>Search Users</h3>
      <input 
        type="text" 
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder='Search users'
      />
      <button onClick={() => setShowUsers(prevShowUsers => !prevShowUsers)}>
        {showUsers ? 'Hide Users' : 'Show Users'}
      </button>
      {showUsers && (
        <ul>
          {filteredUsers.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default UserList;
