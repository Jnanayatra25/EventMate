export interface EventItem {
  id: string;
  title: string;
  date: string;
  time?: string;
  location: string;
  category: string;
  description: string;
  imageUri: string;
}

export interface User {
  name: string;
  email: string;
  avatar?: string;
}
