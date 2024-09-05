<<<<<<< HEAD
export default class User {
    id: number;
    firstName: string;
    lastname: string;
    email: string;
    passwordHash: string;
    password: string;
    constructor(id: number, firstName: string,lastname: string, email: string, passwordHash: string){
        this.id = id;
        this.firstName = firstName;
        this.lastname = lastname;
        this.email = email;
        this.passwordHash = passwordHash
    }
=======
export default interface User {
    id: number,
    firstName: string,
    lastname: string,
    email: string,
    password: string,
    passwordHash: string;
>>>>>>> 8d21daf785765d557c095587d6501fd42655c956
}