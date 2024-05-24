import { Member } from './member.model';
export class Team {
  teamName: any;
  constructor(
    public id: string,
    public name: string,
    public members: Member[]
  ) {}
}
