export enum Role {
  RootAdmin = 'RootAdmin', //full permission can manage CRUD user, role and permission, can login into account of another user
  Dev = 'Dev', //System design
  SuperAdmin = 'SuperAdmin', //same as rootAdmin but can not login as
  Admin = 'Admin', // CRUD book + CRUD user
  Manager = 'Manager', //CRU book + CRU user
  BookManager = 'BookManager', //CRUD Book permission only
  User = 'User', //Find user, Find book
}
