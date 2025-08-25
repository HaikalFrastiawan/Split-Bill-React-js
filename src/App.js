import React, { useState, useEffect } from 'react';
import './App.css';
import FriendsList from './components/Friendlist';
import AddFriendForm from './components/AddFriendForm';
import SplitBillForm from './components/SplitBillForm';
import FilterSort from './components/FilterSort';
import { CSSTransition } from 'react-transition-group';

function App() {
  // Muat data dari localStorage jika ada
  const [friends, setFriends] = useState(() => {
    const savedFriends = localStorage.getItem('splitBillFriends');
    return savedFriends ? JSON.parse(savedFriends) : [
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
    ];
  });
  
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [filter, setFilter] = useState('all'); // all, positive, negative, zero
  const [sortBy, setSortBy] = useState('name'); // name, balance

  // Simpan data ke localStorage setiap kali friends berubah
  useEffect(() => {
    localStorage.setItem('splitBillFriends', JSON.stringify(friends));
  }, [friends]);

  // Filter dan sort friends
  const filteredAndSortedFriends = friends
    .filter(friend => {
      if (filter === 'all') return true;
      if (filter === 'positive') return friend.balance > 0;
      if (filter === 'negative') return friend.balance < 0;
      if (filter === 'zero') return friend.balance === 0;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'balance') {
        return b.balance - a.balance; // Dari balance tertinggi ke terendah
      }
      return 0;
    });

  function handleShowAddFriend() {
    setShowAddFriend((show) => !show);
    setSelectedFriend(null);
  }

  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  }

  function handleUpdateFriend(updatedFriend) {
    setFriends(friends.map(friend => 
      friend.id === updatedFriend.id ? updatedFriend : friend
    ));
  }

  function handleDeleteFriend(id) {
    if (window.confirm("Apakah Anda yakin ingin menghapus teman ini?")) {
      setFriends(friends.filter(friend => friend.id !== id));
      if (selectedFriend && selectedFriend.id === id) {
        setSelectedFriend(null);
      }
    }
  }

  function handleSelection(friend) {
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
    setShowAddFriend(false);
  }

  function handleSplitBill(value) {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );

    setSelectedFriend(null);
  }

  return (
    <div className="App">
      <header className="app-header">
        <h1>💰 Aplikasi Split Bill</h1>
        <p>Kelola patungan dengan teman-teman Anda</p>
      </header>
      
      <div className="app-content">
        <div className="sidebar">
          <FilterSort 
            filter={filter}
            setFilter={setFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
          
          <FriendsList 
            friends={filteredAndSortedFriends} 
            onSelectFriend={handleSelection}
            selectedFriend={selectedFriend}
            onUpdateFriend={handleUpdateFriend}
            onDeleteFriend={handleDeleteFriend}
          />
          
          <CSSTransition
            in={showAddFriend}
            timeout={300}
            classNames="form"
            unmountOnExit
          >
            <AddFriendForm onAddFriend={handleAddFriend} />
          </CSSTransition>
          
          <button className="button toggle-form-btn" onClick={handleShowAddFriend}>
            {showAddFriend ? 'Tutup Form' : 'Tambah Teman'}
          </button>
        </div>
        
        <CSSTransition
          in={!!selectedFriend}
          timeout={300}
          classNames="split-form"
          unmountOnExit
        >
          <div className="split-form-container">
            {selectedFriend && (
              <SplitBillForm 
                selectedFriend={selectedFriend} 
                onSplitBill={handleSplitBill}
                key={selectedFriend.id}
              />
            )}
          </div>
        </CSSTransition>
      </div>
    </div>
  );
}

export default App;