type sectionsCount = 2 | 3 | 4 | 5 | 6;

type PointСoordinate = {
  x: number;
  y: number;
};

type EventItem = { year: number; description: string };
type SectionConfig = {
  id: number;
  title: string;
  eventList: EventItem[];
};

type Length2to6<T> =
  | [T, T]
  | [T, T, T]
  | [T, T, T, T]
  | [T, T, T, T, T]
  | [T, T, T, T, T, T];

enum Animations {
  IDLE = 'idle',
  FADE_OUT = 'fade-out',
  FADE_IN = 'fade-in',
}

type AnimationType = Animations.IDLE | Animations.FADE_OUT | Animations.FADE_IN;

export type {
  sectionsCount,
  PointСoordinate,
  EventItem,
  SectionConfig,
  Length2to6,
  AnimationType,
};
export { Animations };
