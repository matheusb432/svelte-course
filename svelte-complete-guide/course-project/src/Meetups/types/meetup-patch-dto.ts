import { IgnoreMap } from 'mapper-ts/lib-esm';

@IgnoreMap('id', 'isFavorite')
export class MeetupPatchDto {
  constructor(
    public title: string,
    public subtitle: string,
    public description: string,
    public imageUrl: string,
    public address: string,
    public contactEmail: string
  ) {}
}
