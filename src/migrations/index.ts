import * as migration_20260505_215737 from './20260505_215737';
import * as migration_20260617_180820 from './20260617_180820';

export const migrations = [
  {
    up: migration_20260505_215737.up,
    down: migration_20260505_215737.down,
    name: '20260505_215737',
  },
  {
    up: migration_20260617_180820.up,
    down: migration_20260617_180820.down,
    name: '20260617_180820'
  },
];
