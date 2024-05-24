export class Member {
  public id: string;
  public picture: string;
  constructor(
    public firstName: string,
    public lastName: string,
    public title: string,
    public team: string
  ) {}
}
