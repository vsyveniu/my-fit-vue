export type Workouts = {
  workouts: Array<{ id: number; dayId: number }>;
}

export interface Day extends Workouts {
  id: number;
  isToday: boolean;
  type: string;
  createdAt: string;
  updatedAt: string;
}
