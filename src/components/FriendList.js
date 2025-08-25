// src/components/FriendsList.js
import React from 'react';

function FriendsList({ friends, onSelectFriend, selectedFriend }) {
  return (
    <div className="friends-list">
      <h2>Daftar Teman</h2>
      <ul>
        {friends.map((friend) => (
          <li 
            key={friend.id} 
            className={selectedFriend?.id === friend.id ? 'selected' : ''}
          >
            <img src={friend.image} alt={friend.name} />
            <div className="friend-info">
              <h3>{friend.name}</h3>
              {friend.balance < 0 && (
                <p className="red">Kamu berhutang Rp {Math.abs(friend.balance)}</p>
              )}
              {friend.balance > 0 && (
                <p className="green">Teman berhutang Rp {friend.balance}</p>
              )}
              {friend.balance === 0 && (
                <p>Kamu dan teman sudah lunas</p>
              )}
            </div>
            <button onClick={() => onSelectFriend(friend)}>
              {selectedFriend?.id === friend.id ? 'Tutup' : 'Pilih'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FriendsList;