const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    password: "Paintball@123"
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    password: "Paintball@123"
  },
  {
    id: 3,
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    password: "Paintball@123"
  }
]

export function getUserByEmail(email: string) {
  return users.find(user => user.email === email)
}

/* export function validateUser(email: string, password: string) {
  const user = findUserByEmail(email)
  if (user && user.password === password) {
    return user
  }
  return null
}

export function getAllUsers() {
  return users
}

export function addUser(name: string, email: string, password: string) {
  const newUser = {
    id: users.length + 1,
    name,
    email,
    password
  }
  users.push(newUser)
  return newUser
}

export function updateUser(id: number, name?: string, email?: string, password?: string) {
  const user = users.find(user => user.id === id)
  if (user) {
    if (name) user.name = name
    if (email) user.email = email
    if (password) user.password = password
    return user
  }
  return null
}

export function deleteUser(id: number) {
  const index = users.findIndex(user => user.id === id)
  if (index !== -1) {
    return users.splice(index, 1)[0]
  }
  return null
}

// For testing purposes
if (require.main === module) {
  console.log("All Users:", getAllUsers())
  console.log("Find User by Email:", findUserByEmail("john.doe@example.com"))
  console.log("Validate User:", validateUser("john.doe@example.com", "password123"))
  console.log("Add User:", addUser("New User", "new.user@example.com", "password123"))
  console.log("Update User:", updateUser(1, "Updated User", "updated.user@example.com", "newpassword123"))
  console.log("Delete User:", deleteUser(2))
} */