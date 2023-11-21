export class Auth {
  constructor(private username: string = '', private password: string = '') {}
  getUsername(): string {
    return this.username;
  }
  getPassword(): string {
    return this.password;
  }
  setPassword(password: string): void {
    this.password = password;
  }
  setUsername(username: string): void {
    this.username = username;
  }
}
