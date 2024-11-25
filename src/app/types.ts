export interface Task {
  id: number;
  name: string;
  description: string;
  labels: number[];
}

export interface Label {
  id: number;
  name: string;
}
