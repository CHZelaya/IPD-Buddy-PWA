export function log(tag: string, message: string, ...args: any[]) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] [${tag}] ${message}`, ...args);
}

export function warn(tag: string, message: string, ...args: any[]) {
  const timestamp = new Date().toISOString();
  console.warn(`[${timestamp}] [${tag}] ${message}`, ...args);
}

export function error(tag: string, message: string, ...args: any[]) {
  const timestamp = new Date().toISOString();
  console.error(`[${timestamp}] [${tag}] ${message}`, ...args);
}
