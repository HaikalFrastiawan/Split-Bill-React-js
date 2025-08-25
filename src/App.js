import React, { useState } from 'react';
import './App.css';
import FriendsList from './components/Friendlist';
import AddFriendForm from './components/AddFriendForm';

function App() {
  const [friends, setFriends] = useState([
    {
      id: 1,
      name: "Andi",
      image: "https://i.pravatar.cc/48?u=1",
      balance: 0,
    },
    {
      id: 2,
      name: "Budi",
      image: "https://i.pravatar.cc/48?u=2",
      balance: 0,
    },
  ]);
  
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleShowAddFriend() {
    setShowAddFriend((show) => !show);
    setSelectedFriend(null);
  }

  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  }

  function handleSelection(friend) {
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
    setShowAddFriend(false);
  }

  return (
    <div className="App">
      <h1>Aplikasi Split Bill</h1>
      
      <div className="sidebar">
        <FriendsList 
          friends={friends} 
          onSelectFriend={handleSelection}
          selectedFriend={selectedFriend}
        />
        
        {showAddFriend && <AddFriendForm onAddFriend={handleAddFriend} />}
        
        <button className="button" onClick={handleShowAddFriend}>
          {showAddFriend ? 'Tutup' : 'Tambah Teman'}
        </button>
      </div>
    </div>
  );
}

export default App;