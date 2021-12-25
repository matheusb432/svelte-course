import { MeetupPostDto } from './types/meetup-post-dto';
import { FirebaseData } from './types/firebase-data';
import { Meetup } from './meetup.model';
import { Methods } from './types/methods.enum';
import { Mapper } from 'mapper-ts/lib-esm';
import { MeetupPatchDto } from './types/meetup-patch-dto';
import { errorStore, loadingStore } from '../UI';

/**
 * this entire file was not included in the original course, but I made it since it made sense to have
 * an abstraction layer for HTTP requests and a more generic error handling and request handling
 */

const firebaseUrl = 'https://svelte-meetus-5382f-default-rtdb.firebaseio.com';
const meetupsUrl = `${firebaseUrl}/meetups.json`;
const meetupUrl = (id: string) => `${firebaseUrl}/meetups/${id}.json`;

// NOTE this will map all Firebase data to a reversed array of objects of type Meetup
async function getMeetups(): Promise<Meetup[] | void> {
  return fetch(meetupsUrl)
    .then(mapRequest)
    .then((meetupsData: FirebaseData<Meetup>) => {
      if (!meetupsData) return;

      const keys = Object.keys(meetupsData);
      const meetups = Object.values(meetupsData).map((md, index) =>
        new Mapper(Meetup).map({ ...md, id: keys[index] })
      ) as Meetup[];

      return meetups.reverse();
    })
    .catch(handleError);
}

async function postMeetup(meetup: Meetup): Promise<Response | void> {
  // NOTE mapping meetup with the MeetupPostDto mapping config will simply make it ignore the id prop before posting it
  const postDto = new Mapper(MeetupPostDto).map(meetup);

  const request = fetch(meetupsUrl, {
    method: Methods.POST,
    body: JSON.stringify(postDto),
  });

  return pipeRequest(request);
}

async function updateMeetup(id: string, meetup: Meetup): Promise<Response> {
  if (!meetup || !id)
    throw Error(`Meetup ${meetup?.title} has no ID so it can't be updated!`);

  const patchDto = new Mapper(MeetupPatchDto).map(meetup);

  const request = fetch(meetupUrl(id), {
    method: Methods.PATCH,
    body: JSON.stringify(patchDto),
  });

  return pipeRequest(request);
}

async function patchMeetup(id: string, prop: object): Promise<Response> {
  if (!prop || !id) throw Error(`Invalid patch request!`);

  const request = fetch(meetupUrl(id), {
    method: Methods.PATCH,
    body: JSON.stringify(prop),
  });

  return pipeRequest(request);
}

async function deleteMeetup(id: string): Promise<Response> {
  if (!id) throw Error(`Invalid delete request!`);

  const request = fetch(meetupUrl(id), { method: Methods.DELETE });

  return pipeRequest(request);
}

async function pipeRequest(request: Promise<Response>) {
  return request.then(mapRequest).catch(handleError);
}

function mapRequest(res: Response): Promise<any> {
  return res.json();
}

function handleError(err: any) {
  // NOTE by updating errorStore and loadingStore values, this allows for a more global way of handling these states for HTTP requests
  errorStore.setError(err);
  loadingStore.setLoading(false);

  // NOTE also essential to throw the error after the handling otherwise the components won't be able to handle the error
  throw Error(err);
}

export { getMeetups, postMeetup, updateMeetup, patchMeetup, deleteMeetup };
