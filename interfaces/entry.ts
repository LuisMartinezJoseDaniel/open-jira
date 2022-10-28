// const enum Status{
//   pending,
//   inProgress,
//   finished
// }

export interface Entry {
  _id: string;
  description: string;
  created_at: number;
  status: EntryStatus;
}

export type EntryStatus = "pending" | "in-progress" | "finished";
