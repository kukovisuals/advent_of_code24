import fs from 'fs';
import path from 'path';

// Function to read input data from a file
function readInputFile(day) {
    try {
        const filePath = path.join('src', day, 'index.txt');
        const data = fs.readFileSync(filePath, 'utf8');
        return data.split('\n');
    } catch (err) {
        console.error(`Error reading file for ${day}:`, err);
        return null;
    }
}

// Main function to dynamically import the day's module and run its solution
async function main(dayFromFunction) {
    const day = dayFromFunction || process.argv[2]; // Use function parameter if available

    if (!day) {
        console.log("Please specify the day to run, e.g., 'node src/index.js day1'");
        return;
    }

    try {
        const dayModulePath = `./${day}/index.js`;
        const dayModule = await import(dayModulePath);
        const input = readInputFile(day);
        if (input) {
            console.log(`Solution for ${day}:`, dayModule.solve(input));
        }
    } catch (err) {
        console.error(`Error loading module for ${day}:`, err);
    }
}

main('day4');
