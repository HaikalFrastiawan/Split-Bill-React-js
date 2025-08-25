import React, { useState } from "react";

function SplitBillForm({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState('');
  const [paidByUser, setPaidByUser] = useState('');
  const [whoIsPaying, setWhoIsPaying] = useState('user');

  const paidByFriend = bill ? bill-paidByUser : " "

   function handleSubmit(e) {
    e.preventDefault();
    
    if (!bill || !paidByUser) return;
    
    onSplitBill(whoIsPaying === 'user' ? paidByFriend : -paidByUser);
  }

  return (
    <form className="split-bill-form" onSubmit={handleSubmit}>
      <h2>Patungan dengan {selectedFriend.name}</h2>
      
      <div className="form-group">
        <label>💰 Total Bill</label>
        <input 
          type="number" 
          value={bill} 
          onChange={(e) => setBill(Number(e.target.value))} 
        />
      </div>
      
      <div className="form-group">
        <label>🧍 Pengeluaran Kamu</label>
        <input 
          type="number" 
          value={paidByUser} 
          onChange={(e) => setPaidByUser(
            Number(e.target.value) > bill ? paidByUser : Number(e.target.value)
          )} 
        />
      </div>
      
      <div className="form-group">
        <label>👤 Pengeluaran {selectedFriend.name}</label>
        <input type="number" disabled value={paidByFriend} />
      </div>
      
      <div className="form-group">
        <label>🤑 Siapa yang bayar?</label>
        <select 
          value={whoIsPaying} 
          onChange={(e) => setWhoIsPaying(e.target.value)}
        >
          <option value="user">Kamu</option>
          <option value="friend">{selectedFriend.name}</option>
        </select>
      </div>
      
      <button className="button">Hitung Patungan</button>
    </form>
  );

}

export default SplitBillForm