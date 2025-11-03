const fs = require('fs');
const path = require('path');

const reviews = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'docs/testimonials/seo-optimized-reviews.json'), 'utf-8')
);

console.log('='.repeat(80));
console.log('TOP 10 REVIEWS FOR HOMEPAGE (Most Comprehensive)');
console.log('='.repeat(80));

reviews.slice(0, 10).forEach((review, index) => {
  console.log(`\n${index + 1}. ${review.reviewer || 'Anonymous'} - ${review.source}`);
  console.log(`Pillars: ${review.messaging_pillars.join(', ')}`);
  console.log(`Services: ${review.services.join(', ')}`);
  if (review.seo_notes.length > 0) {
    console.log(`SEO Notes: ${review.seo_notes.join('; ')}`);
  }
  console.log(`\n"${review.review.substring(0, 300)}${review.review.length > 300 ? '...' : ''}"`);
  console.log('-'.repeat(80));
});

// Group by primary service
console.log('\n\n' + '='.repeat(80));
console.log('TOP REVIEWS BY SERVICE CATEGORY');
console.log('='.repeat(80));

const serviceGroups = {
  'Carpet Cleaning': [],
  'Pet Odor/Urine Removal': [],
  'Upholstery Cleaning': [],
  'Tile, Grout, and Stone Cleaning': [],
  'Area Rug Cleaning': []
};

reviews.forEach(review => {
  review.services.forEach(service => {
    if (serviceGroups[service] && serviceGroups[service].length < 5) {
      serviceGroups[service].push(review);
    }
  });
});

Object.entries(serviceGroups).forEach(([service, serviceReviews]) => {
  console.log(`\n\n${'─'.repeat(80)}`);
  console.log(`${service.toUpperCase()} - Top 5 Reviews`);
  console.log('─'.repeat(80));

  serviceReviews.forEach((review, index) => {
    console.log(`\n${index + 1}. ${review.reviewer || 'Anonymous'} - ${review.source}`);
    console.log(`   Pillars: ${review.messaging_pillars.join(', ')}`);
    console.log(`   "${review.review.substring(0, 200)}${review.review.length > 200 ? '...' : ''}"`);
  });
});

// Speed/Convenience highlights
console.log('\n\n' + '='.repeat(80));
console.log('REVIEWS EMPHASIZING SPEED & CONVENIENCE (Dry Time)');
console.log('='.repeat(80));

const speedReviews = reviews.filter(r => r.messaging_pillars.includes('Speed/Convenience')).slice(0, 10);

speedReviews.forEach((review, index) => {
  const speedMentions = review.review.match(/(dried?|dry|quick|fast|hours?|same day|prompt|on time)[^.!?]*/gi);
  console.log(`\n${index + 1}. ${review.reviewer || 'Anonymous'}`);
  if (speedMentions) {
    console.log(`   Speed mentions: ${speedMentions.slice(0, 2).join(' | ')}`);
  }
  console.log(`   "${review.review.substring(0, 150)}..."`);
});

console.log('\n\n' + '='.repeat(80));
console.log('Analysis complete! See seo-optimized-reviews.json for full dataset.');
console.log('='.repeat(80));
