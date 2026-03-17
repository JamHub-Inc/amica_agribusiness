import { db } from '../db/db';
import { authService } from './authService';

export const syncService = {
  // Flush the offline sync queue to the server
  flushQueue: async () => {
    const offlineActions = await db.syncQueue.where('processed').equals(false).toArray();
    
    if (offlineActions.length === 0) return;

    console.log(`Syncing ${offlineActions.length} pending actions...`);

    for (const action of offlineActions) {
      try {
        // Here we would map entities to their respective service calls
        // Example:
        // if (action.entity === 'crops') {
        //   if (action.action === 'CREATE') await cropService.create(action.data);
        // }
        
        // After successful sync, mark as processed
        await db.syncQueue.update(action.id, { processed: true });
      } catch (error) {
        console.error(`Failed to sync action ${action.id}:`, error);
        // If it's a server error we might want to retry later, 
        // so we don't mark as processed.
      }
    }
    
    // Cleanup processed items
    await db.syncQueue.where('processed').equals(true).delete();
  },

  // Start a listener for connectivity
  init: () => {
    window.addEventListener('online', () => {
      console.log('App is online. Starting background sync...');
      syncService.flushQueue();
    });
  }
};
