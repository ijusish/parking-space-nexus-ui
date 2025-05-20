// Re-export from our new modules for backward compatibility
export * from './apiUtils';
export * from './authApi';

// Keep the api object export for backward compatibility
import { authApi } from './authApi';

export const api = authApi;
