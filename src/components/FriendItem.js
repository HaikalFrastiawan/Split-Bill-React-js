// src/components/FriendItem.js
import React, { useState } from 'react';

function FriendItem({ 
  friend, 
  isSelected, 
  isEditing, 
  onSelect, 
  onEdit, 
  onSaveEdit, 
  onCancelEdit, 
  onDelete 
}) {
  const [name, setName] = useState(friend.name);
  const [image, setImage] = useState(friend.image);

  function handleSave() {
    onSaveEdit({
      ...friend,
      name,
      image
    });
  }

  if (isEditing) {
    return (
      <li className="friend-item editing">
        <div className="edit-form">
          <div className="form-group">
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="Nama teman"
            />
          </div>
          <div className="form-group">
            <input 
              type="text" 
              value={image} 
              onChange={(e) => setImage(e.target.value)} 
              placeholder="URL gambar"
            />
          </div>
          <div className="edit-actions">
            <button className="button save-btn" onClick={handleSave}>Simpan</button>
            <button className="button cancel-btn" onClick={onCancelEdit}>Batal</button>
          </div>
        </div>
      </li>
    );
  }

  return (
    <li className={`friend-item ${isSelected ? 'selected' : ''}`}>
      <img src={friend.image} alt={friend.name} />
      <div className="friend-info">
        <h3>{friend.name}</h3>
        {friend.balance < 0 && (
          <p className="red">Kamu berhutang Rp {Math.abs(friend.balance).toLocaleString('id-ID')}</p>
        )}
        {friend.balance > 0 && (
          <p className="green">Teman berhutang Rp {friend.balance.toLocaleString('id-ID')}</p>
        )}
        {friend.balance === 0 && (
          <p>Kamu dan teman sudah lunas</p>
        )}
      </div>
      <div className="friend-actions">
        <button className="button select-btn" onClick={onSelect}>
          {isSelected ? 'Tutup' : 'Pilih'}
        </button>
        <button className="button edit-btn" onClick={onEdit}>Edit</button>
        <button className="button delete-btn" onClick={onDelete}>Hapus</button>
      </div>
    </li>
  );
}

export default FriendItem;