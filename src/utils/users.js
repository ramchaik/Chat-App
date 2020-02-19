const users = [];

/* 
	To Do:
	 -- Add user 
	 	--- params - id, username, room
	 -- Remove user
	 -- Get user
	 -- Get users
*/

const addUser = ({ id, username, room }) => {
  /*
	To Do:
		-- Clean data
		-- Validate the data
		-- Check for existing user
		--- Validate username
		-- Store user	
  */
  username = username.trim().toLowerCase();
  room = room.trim().toLowerCase();

  if (!username || !room) {
    return {
      error: 'Username and room are required!'
    };
  }

  const existingUser = users.find(
    user => user.username === username && user.room === room
  );

  if (existingUser) {
    return {
      error: 'Username is in use!'
    };
  }

  const user = {
    id,
    username,
    room
  };
  users.push(user);

  return {
    user
  };
};

const removeUser = id => {
  const index = users.findIndex(user => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

const getUser = id => users.find(user => user.id === id);

const getUsersInRoom = room => users.filter(user => user.room === room);

module.exports = {
  getUser,
  getUsersInRoom,
  addUser,
  removeUser
};
