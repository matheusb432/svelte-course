import { IgnoreMap } from 'mapper-ts/lib-esm';

@IgnoreMap('id')
export class MeetupPostDto {
  constructor(
    public title: string,
    public subtitle: string,
    public description: string,
    public imageUrl: string,
    public address: string,
    public contactEmail: string,
    public isFavorite: boolean
  ) {}
}
