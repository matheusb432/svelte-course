import meetups from '../meetups-store';

const firebaseUrl = 'https://svelte-meetus-5382f-default-rtdb.firebaseio.com';
const meetupsUrl = `${firebaseUrl}/meetups.json`;
const meetupUrl = (id) => `${firebaseUrl}/meetups/${id}.json`;

export { firebaseUrl, meetupsUrl, meetupUrl };

// NOTE getting the server's `this` param to the getMeetup function so it can call fetch even when running in the server
function getMeetup(thisContext, meetupId) {
  return thisContext
    .fetch(meetupUrl(meetupId))
    .then(mapToJson)
    .then((meetupData) => {
      return { loadedMeetup: { ...meetupData, id: meetupId } };
    })
    .catch((err) => handleNotFoundError(thisContext, err));
}

function getMeetups(thisContext) {
  return thisContext
    .fetch(meetupsUrl)
    .then(mapToJson)
    .then((data) => {
      const loadedMeetups = [];
      for (const key in data) {
        loadedMeetups.push({
          ...data[key],
          id: key,
        });
      }
      return { fetchedMeetups: loadedMeetups.reverse() };
    })
    .catch((err) => handleFetchError(thisContext, err));
}

async function postMeetup(meetupData) {
  return fetch(meetupsUrl, {
    method: 'POST',
    body: JSON.stringify({ ...meetupData, isFavorite: false }),
    headers: { 'Content-Type': 'application/json' },
  })
    .then(mapToJson)
    .then((jsonData) => {
      meetups.addMeetup({
        ...meetupData,
        isFavorite: false,
        id: jsonData.name,
      });
    })
    .catch(handleError);
}

async function patchMeetup(id, meetupData) {
  return fetch(meetupUrl(id), {
    method: 'PATCH',
    body: JSON.stringify(meetupData),
    headers: { 'Content-Type': 'application/json' },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error('An error occurred, please try again!');
      }
      meetups.updateMeetup(id, meetupData);
    })
    .catch(handleError);
}

async function removeMeetup(id) {
  return fetch(meetupUrl(id), {
    method: 'DELETE',
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error('An error occurred, please try again!');
      }
      meetups.removeMeetup(id);
    })
    .catch(handleError);
}

function mapToJson(res) {
  if (!res.ok) {
    throw new Error('Fetching meetups failed, please try again later!');
  }
  return res.json();
}

function handleError(err) {
  console.log(err);
}

function handleFetchError(thisContext, err) {
  error = err;
  console.log(err);
  thisContext.error(500, 'An error occurred, please try again!');
}

function handleNotFoundError(thisContext, err) {
  console.log(thisContext);
  thisContext.error(404, 'Could not fetch meetup!');
}

export { getMeetup, getMeetups, postMeetup, patchMeetup, removeMeetup };
