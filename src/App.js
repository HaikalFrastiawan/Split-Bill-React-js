import React from 'react';
import { useState } from 'react';
import './App.css';


function App() {
  //state daftar teman
  const [friend, setFriend] = useState ([
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
  ])



  return (
    <div className="App">
      <h1>Split bill</h1>
      <p>Welcome to App Patungan</p>

      <div className="friends-list"> 
        <h2>Daftar teman</h2>
        <ul>
          {friend.map(friend =>(
            <li key={friend.id}>
              <img src={friend.image} alt={friend.name} />
              <h3>{friend.name}</h3>
              <p>Balance {friend.balance}</p>  
            </li>
          ))}
        </ul>
      </div>
        

        
    </div>
  );
}

export default App;
