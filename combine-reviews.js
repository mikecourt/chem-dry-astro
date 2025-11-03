const fs = require('fs');
const path = require('path');

const reviewsDir = path.join(process.env.HOME, 'Downloads', 'Reviews 2025');
const outputFile = path.join(reviewsDir, 'combined-reviews.json');

// Read all JSON files in the directory
const files = fs.readdirSync(reviewsDir)
  .filter(file => file.endsWith('.json') && file !== 'combined-reviews.json');

console.log(`Found ${files.length} JSON files to combine`);

// Combine all reviews
const allReviews = [];
const reviewsById = new Map(); // To track duplicates

files.forEach(file => {
  const filePath = path.join(reviewsDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(content);

  if (data.reviews && Array.isArray(data.reviews)) {
    data.reviews.forEach(review => {
      // Use the review name as a unique identifier to avoid duplicates
      if (review.name && !reviewsById.has(review.name)) {
        reviewsById.set(review.name, review);
        allReviews.push(review);
      }
    });
  }
});

// Sort by createTime (newest first)
allReviews.sort((a, b) => {
  const dateA = new Date(a.createTime);
  const dateB = new Date(b.createTime);
  return dateB - dateA;
});

// Create the combined output
const combinedData = {
  reviews: allReviews,
  metadata: {
    totalReviews: allReviews.length,
    sourceFiles: files.length,
    combinedDate: new Date().toISOString()
  }
};

// Write to output file
fs.writeFileSync(outputFile, JSON.stringify(combinedData, null, 2));

console.log(`\nSuccessfully combined ${allReviews.length} unique reviews from ${files.length} files`);
console.log(`Output saved to: ${outputFile}`);
