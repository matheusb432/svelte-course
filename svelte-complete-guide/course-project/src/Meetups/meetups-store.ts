import { mockMeetups } from './mock-meetups';
import { Writable, writable } from 'svelte/store';
import { Meetup } from '.';

// const meetupsStore = writable(mockMeetups);
const meetupsStore: Writable<Meetup[]> = writable([]);

const customMeetupsStore = {
  subscribe: meetupsStore.subscribe,
  setMeetups: (meetups: Meetup[]) => {
    meetupsStore.set(meetups);
  },
  addMeetup: (meetup: Meetup, createdId: string) => {
    meetupsStore.update((meetups) => {
      const newMeetup = { ...meetup, id: createdId } as Meetup;

      return [...meetups, newMeetup];
    });
  },
  toggleFavorite: (id: string) => {
    meetupsStore.update((meetups) => {
      const updatedMeetup = meetups.find((m) => m.id === id);
      const updatedMeetups = [...meetups];
      const meetupIndex = meetups.findIndex((m) => m.id === id);

      if (updatedMeetup == null) return meetups;

      updatedMeetup.isFavorite = !updatedMeetup.isFavorite;

      updatedMeetups[meetupIndex] = updatedMeetup;

      return updatedMeetups;
    });
  },
  updateMeetup: (id: string, meetup: Meetup) => {
    meetupsStore.update((meetups) => {
      const updatedMeetups = [...meetups];
      const meetupIndex = meetups.findIndex((m) => m.id === id);

      if (meetupIndex == null) return meetups;

      const updatedMeetup = { ...meetups[meetupIndex], ...meetup };

      updatedMeetup.isFavorite = updatedMeetups[meetupIndex].isFavorite;

      updatedMeetups[meetupIndex] = updatedMeetup;

      return updatedMeetups;
    });
  },

  removeMeetup: (id: string) => {
    meetupsStore.update((meetups) => {
      return meetups.filter((m) => m.id !== id);
    });
  },
};

export default customMeetupsStore;
