export class Meetup {
  constructor(
    public id: string,
    public title: string,
    public subtitle: string,
    public description: string,
    public imageUrl: string,
    public address: string,
    public contactEmail: string
  ) {}
}
