import React, { createContext, useContext, useState } from 'react';
import { EventItem } from '@/types';
import { INITIAL_EVENTS } from '@/data/dummyEvents';

interface EventContextType {
  events: EventItem[];
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  addEvent: (eventData: Omit<EventItem, 'id'>) => EventItem;
  deleteEvent: (id: string) => void;
}

const EventContext = createContext<EventContextType>({
  events: [],
  favorites: [],
  toggleFavorite: () => {},
  isFavorite: () => false,
  addEvent: () => ({} as EventItem),
  deleteEvent: () => {},
});

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<EventItem[]>(INITIAL_EVENTS);
  const [favorites, setFavorites] = useState<string[]>(['1', '2', '3']);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  const isFavorite = (id: string) => favorites.includes(id);

  const addEvent = (eventData: Omit<EventItem, 'id'>) => {
    const newEvent: EventItem = {
      ...eventData,
      id: Date.now().toString(),
    };
    setEvents((prev) => [newEvent, ...prev]);
    return newEvent;
  };

  const deleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
    setFavorites((prev) => prev.filter((favId) => favId !== id));
  };

  return (
    <EventContext.Provider
      value={{
        events,
        favorites,
        toggleFavorite,
        isFavorite,
        addEvent,
        deleteEvent,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => useContext(EventContext);
