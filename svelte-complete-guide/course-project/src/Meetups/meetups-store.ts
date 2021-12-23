import { mockMeetups } from './mock-meetups';
import { writable } from 'svelte/store';
import { Meetup } from '.';

const meetupsStore = writable(mockMeetups);

const customMeetupsStore = {
  subscribe: meetupsStore.subscribe,
  addMeetup: (meetup: Meetup) => {
    meetupsStore.update((meetups) => {
      console.log(meetups, meetup);
      return [...meetups, { ...meetup }];
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

      updatedMeetups[meetupIndex] = updatedMeetup;

      return updatedMeetups;
    });
  },
};

export default customMeetupsStore;
