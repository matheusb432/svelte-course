import { AddMap } from 'mapper-ts/lib-esm';

export class Meetup {
  @AddMap('id')
  id?: string;

  constructor(
    public title: string,
    public subtitle: string,
    public description: string,
    public imageUrl: string,
    public address: string,
    public contactEmail: string,
    public isFavorite = false
  ) {}
}
