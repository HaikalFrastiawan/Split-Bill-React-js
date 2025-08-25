import React, { useState } from "react";

function AddFriendForm({ onAddFriend }){
    const [name, setName] = useState('')
    const [image, setImage] = useState('https://i.pravatar.cc/48')
    
    function handleSubmit (e) {
        e.preventDefault()


        if(!name || !image) return 

        const id = crypto.randomUUID()
        const newFriend = {
      id,
      name,
      image: `${image}?u=${id}`,
      balance: 0,
    };
    
    onAddFriend(newFriend);
    setName('');
    setImage('https://i.pravatar.cc/48');
    }

     return (
    <form className="add-friend-form" onSubmit={handleSubmit}>
      <h2>Tambah Teman</h2>
      <div className="form-group">
        <label>👤 Nama Teman</label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
      </div>
      
      <div className="form-group">
        <label>🖼️ URL Gambar</label>
        <input 
          type="text" 
          value={image} 
          onChange={(e) => setImage(e.target.value)} 
        />
      </div>
      
      <button className="button">Tambah</button>
    </form>
  );
    
}

export default AddFriendForm