const firebaseUrl = 'https://svelte-meetus-5382f-default-rtdb.firebaseio.com';
const meetupsUrl = `${firebaseUrl}/meetups.json`;
const meetupUrl = (id) => `${firebaseUrl}/meetups/${id}.json`;

export { firebaseUrl, meetupsUrl, meetupUrl };

// NOTE getting the server's `this` param to the getMeetup function so it can call fetch even when running in the server
function getMeetup(thisContext, meetupId) {
  return thisContext
    .fetch(meetupUrl(meetupId))
    .then((res) => {
      if (!res.ok) {
        throw new Error('Fetching meetups failed, please try again later!');
      }
      return res.json();
    })
    .then((meetupData) => {
      return { loadedMeetup: { ...meetupData, id: meetupId } };
    })
    .catch((err) => {
      thisContext.error(404, 'Could not fetch meetup!');
    });
}

export { getMeetup };
