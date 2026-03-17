import Dexie from 'dexie';

export const db = new Dexie('AmicaOfflineDB');

// Define database schema
// version(1) is the initial version
db.version(1).stores({
  // Stores for caching data
  user: 'id', // Local user profile
  crops: 'id, name, status',
  orders: 'id, status, createdAt',
  marketPrices: 'id, item',
  weather: 'id',
  
  // Sync queue for offline mutations
  // 'id' is autoincremented
  // 'action' (CREATE, UPDATE, DELETE)
  // 'entity' (crops, orders, etc)
  // 'data' (the payload)
  // 'processed' (boolean)
  syncQueue: '++id, entity, action, processed'
});

// Helper functions for offline data management
export const addToSyncQueue = async (entity, action, data) => {
  return await db.syncQueue.add({
    entity,
    action,
    data,
    processed: false,
    timestamp: Date.now()
  });
};

export const clearProcessedSyncItems = async () => {
  return await db.syncQueue.where('processed').equals(true).delete();
};
