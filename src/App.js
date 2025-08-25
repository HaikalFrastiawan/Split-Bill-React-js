import React, { useState } from 'react';
import './App.css';
import FriendsList from './components/Friendlist';

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
  
  // State untuk teman yang dipilih
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleSelection(friend) {
    // Jika teman yang sama diklik lagi, batalkan seleksi
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
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
      </div>
    </div>
  );
}

export default App;