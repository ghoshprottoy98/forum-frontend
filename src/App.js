import logo from './logo.svg';
import './App.css';
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Post from './components/Post';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('desc');
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchPostsAndUsers = async () => {
      try {
        const [postsResponse, usersResponse] = await Promise.all([
          axios.get('https://jsonplaceholder.typicode.com/posts'),
          axios.get('https://jsonplaceholder.typicode.com/users')
        ]);
        
        const sortedPosts = postsResponse.data.sort((a, b) => {
          if (sortBy === 'asc') {
            return a.id - b.id;
          } else {
            return b.id - a.id;
          }
        });
        
        setPosts(sortedPosts);
        setUsers(usersResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPostsAndUsers();
  }, [sortBy]);

  const getUserById = (userId) => {
    return users.find(user => user.id === userId);
  };

  const filteredPosts = posts.filter(post => {
    const user = getUserById(post.userId);
    const postTitle = post.title.toLowerCase();
    const postBody = post.body.toLowerCase();
    const userName = user ? user.name.toLowerCase() : '';

    return postTitle.includes(searchQuery.toLowerCase()) ||
           postBody.includes(searchQuery.toLowerCase()) ||
           userName.includes(searchQuery.toLowerCase());
  });

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  return (
    <div className="app">
      <div class="header">      
        <h1>Forum Timeline</h1> 
        <div className="menu-icon" onClick={toggleDropdown}></div>
        {showDropdown && (
          <div className="dropdown" ref={dropdownRef}>
            <ul>
              <li>Profile</li>
              <li>Settings</li>
              <li>Sign Out</li>
            </ul>
          </div>
        )}
      </div>
      <div className="filter-container">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search posts..."
          className="search-bar"
        />
        <select value={sortBy} onChange={handleSortChange} className="sort-select">
          <option value="desc">Sort by post ID (Descending)</option>
          <option value="asc">Sort by post ID (Ascending)</option>
        </select>
      </div>
      {filteredPosts.map(post => {
        const user = getUserById(post.userId);
        return <Post key={post.id} post={post} user={user} />;
      })}
    </div>
  );
};

export default App;
