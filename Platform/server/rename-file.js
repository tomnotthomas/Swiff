import fs from 'fs';
import path from 'path';

try {
  // Get the directory where the script is located
  const scriptDir = path.dirname(new URL(import.meta.url).pathname);

  // Define the source directory
  const sourceDir = path.join(scriptDir, './dist'); // Change to your actual output directory

  // Specify the file you want to rename (including the path)
  const targetFileName = 'cloud-vm-creator/cloud-vm-creator.js'; // Change to your target file

  // Generate the new filename with the .cjs extension
  const newFileName = path.join(sourceDir, targetFileName).replace('.js', '.cjs');
  const originalFilePath = path.join(sourceDir, targetFileName);

  // Check if the original file exists
  if (!fs.existsSync(originalFilePath)) {
    console.log(`${originalFilePath} does not exist.`);
  } else {
    // Rename the file
    fs.renameSync(originalFilePath, newFileName);
    console.log(`${targetFileName} has been renamed to ${newFileName}`);


  }
} catch (error) {
  console.error('Error in rename-file script:', error);
}
