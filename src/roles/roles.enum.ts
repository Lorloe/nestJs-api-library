export enum Role {
  SuperAdmin = 'SuperAdmin', //full permission
  RootAdmin = 'RootAdmin', //full permission
  Dev = 'Dev',
  Admin = 'Admin', // Create, Update, Delete book + Create, Update, Delete user
  Manager = 'Manager', //Create, Update book + Create, Update user
  BookManager = 'BookManager', //Book permission only
  User = 'User', //Find user, Find book
}
