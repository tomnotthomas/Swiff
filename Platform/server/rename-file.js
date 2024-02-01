
import fs from 'fs';
import path from 'path';

try {
  // Get the directory where the script is located
  const scriptDir = path.dirname(new URL(import.meta.url).pathname);

  // Define the source directory
  const sourceDir = path.join(scriptDir, './dist/src/google'); 

  // Read files from the source directory
  const files = fs.readdirSync(sourceDir);

  // Filter out .js files and rename them to .cjs
  files.forEach(file => {
    if (path.extname(file) === '.js') {
      const originalFilePath = path.join(sourceDir, file);
      const newFilePath = originalFilePath.replace('.js', '.cjs');

      fs.renameSync(originalFilePath, newFilePath);
      console.log(`${originalFilePath} has been renamed to ${newFilePath}`);
    }
  });

} catch (error) {
  console.error('Error in rename-file script:', error);
}