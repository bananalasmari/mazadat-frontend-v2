import { PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Runtime configuration interface.
 * Add new config properties here as needed.
 */
export interface AppConfig {
  API_BASE_URL: string;
  // Add more config properties as needed
}

/**
 * Declare window.env for TypeScript
 */
declare global {
  interface Window {
    env?: Partial<AppConfig>;
  }
}

/**
 * Default configuration values used when env.js is not available (local development)
 */
const defaultConfig: AppConfig = {
  API_BASE_URL: '',
};

/**
 * Get configuration value.
 * - In browser: reads from window.env (populated by env.js at runtime)
 * - On server: reads from process.env with NG_APP_ prefix
 * - Falls back to default values if not found
 *
 * @param key - The configuration key (without NG_APP_ prefix)
 * @returns The configuration value
 */
export function getConfig<K extends keyof AppConfig>(key: K): AppConfig[K] {
  const platformId = inject(PLATFORM_ID);

  if (isPlatformBrowser(platformId)) {
    // Browser: read from window.env (set by env.js)
    return window.env?.[key] ?? defaultConfig[key];
  } else {
    // Server: read from process.env with NG_APP_ prefix
    const envKey = `NG_APP_${key}`;
    return (process.env[envKey] as AppConfig[K]) ?? defaultConfig[key];
  }
}
