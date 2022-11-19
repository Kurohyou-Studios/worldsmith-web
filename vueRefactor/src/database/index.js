import { Low } from 'lowdb';

import { fsAsync } from './adapters';

export const connectDB = (handle) => new Low(new fsAsync(handle));