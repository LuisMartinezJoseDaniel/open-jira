interface SeedData{
  entries: SeedEntry[];
}

interface SeedEntry {
  description: string;
  status: string;
  created_at: number;
}

export const seedData: SeedData = {
  entries: [
    {
      description:
        "Pendiente: Officia aliqua velit nostrud velit ex fugiat excepteur ullamco minim aute nulla ipsum ut amet.",
      status: "pending",
      created_at: Date.now(),
    },
    {
      description:
        "in-progress: Officia aliqua velit nostrud velit ex fugiat excepteur ullamco minim aute nulla ipsum ut amet.",
      status: "in-progress",
      created_at: Date.now() - 10000000,
    },
    {
      description:
        "Terminadas: Officia aliqua velit nostrud velit ex fugiat excepteur ullamco minim aute nulla ipsum ut amet.",
      status: "finished",
      created_at: Date.now() - 100000,
    },
  ],
};
