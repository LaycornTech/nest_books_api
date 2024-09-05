export default class User {
    id: number;
    firstName: string;
    lastname: string;
    email: string;
    passwordHash: string;
    constructor(id: number, firstName: string,lastname: string, email: string, passwordHash: string){
        this.id = id;
        this.firstName = firstName;
        this.lastname = lastname;
        this.email = email;
        this.passwordHash = passwordHash
    }
}