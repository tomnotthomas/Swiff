import { createRequire } from 'module';
const require = createRequire(import.meta.url);

console.log("Testing module loading");
try {
  const cloudVmCreator = require('../google/cloud-vm-creator.cjs');
  console.log('Module loaded:', cloudVmCreator);
} catch (error) {
  console.error('Error loading module:', error);
}

