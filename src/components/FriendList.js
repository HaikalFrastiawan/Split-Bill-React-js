// src/components/FriendsList.js
import React, { useState } from 'react';
import FriendItem from './FriendItem';

function FriendsList({ friends, onSelectFriend, selectedFriend, onUpdateFriend, onDeleteFriend }) {
  const [editingId, setEditingId] = useState(null);

  function handleEditFriend(updatedFriend) {
    onUpdateFriend(updatedFriend);
    setEditingId(null);
  }

  function handleCancelEdit() {
    setEditingId(null);
  }

  if (friends.length === 0) {
    return (
      <div className="friends-list">
        <h2>Daftar Teman</h2>
        <p className="empty-state">Belum ada teman. Tambahkan teman baru!</p>
      </div>
    );
  }

  return (
    <div className="friends-list">
      <h2>Daftar Teman ({friends.length})</h2>
      <ul>
        {friends.map((friend) => (
          <FriendItem
            key={friend.id}
            friend={friend}
            isSelected={selectedFriend?.id === friend.id}
            isEditing={editingId === friend.id}
            onSelect={() => onSelectFriend(friend)}
            onEdit={() => setEditingId(friend.id)}
            onSaveEdit={handleEditFriend}
            onCancelEdit={handleCancelEdit}
            onDelete={() => onDeleteFriend(friend.id)}
          />
        ))}
      </ul>
    </div>
  );
}

export default FriendsList;