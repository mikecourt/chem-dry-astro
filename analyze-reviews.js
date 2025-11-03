const fs = require('fs');
const path = require('path');

const reviewsFile = path.join(process.env.HOME, 'Downloads', 'Reviews 2025', 'combined-reviews.json');
const data = JSON.parse(fs.readFileSync(reviewsFile, 'utf8'));

// Define SEO criteria
const services = [
  'carpet cleaning', 'carpets', 'carpet',
  'upholstery cleaning', 'upholstery', 'sofa', 'couch', 'furniture',
  'tile', 'stone', 'grout', 'tile and grout',
  'area rug', 'rug', 'rugs',
  'pet odor', 'pet stain', 'urine', 'pet smell', 'pet'
];

const phoenixCities = [
  'phoenix', 'scottsdale', 'tempe', 'mesa', 'chandler', 'glendale',
  'peoria', 'gilbert', 'surprise', 'avondale', 'goodyear', 'buckeye',
  'fountain hills', 'paradise valley', 'cave creek', 'anthem'
];

const messagingPillars = {
  speed: ['dried in 2 hours', 'quick', 'fast', 'same day', 'next day', 'dry', 'drying'],
  results: ['like new', 'amazing', 'brand new', 'excellent', 'incredible', 'spotless', 'clean', 'removed'],
  professionalism: ['on time', 'professional', 'respectful', 'thorough', 'courteous', 'polite', 'friendly'],
  health: ['safe for kids', 'safe for pets', 'eco friendly', 'non-toxic', 'green', 'healthy'],
  value: ['worth every penny', 'affordable', 'fair price', 'great value', 'reasonable', 'highly recommend']
};

function scoreReview(review) {
  const text = `${review.comment || ''} ${review.reviewer?.displayName || ''}`.toLowerCase();
  let score = 0;
  const matches = {
    services: [],
    cities: [],
    pillars: []
  };

  // Check for services (high value)
  services.forEach(service => {
    if (text.includes(service)) {
      score += 10;
      if (!matches.services.includes(service)) {
        matches.services.push(service);
      }
    }
  });

  // Check for Phoenix area cities (very high value)
  phoenixCities.forEach(city => {
    if (text.includes(city)) {
      score += 15;
      if (!matches.cities.includes(city)) {
        matches.cities.push(city);
      }
    }
  });

  // Check for messaging pillars
  Object.entries(messagingPillars).forEach(([pillar, keywords]) => {
    keywords.forEach(keyword => {
      if (text.includes(keyword)) {
        score += 5;
        if (!matches.pillars.includes(pillar)) {
          matches.pillars.push(pillar);
        }
      }
    });
  });

  // Bonus for having a comment
  if (review.comment && review.comment.length > 50) {
    score += 5;
  }

  // Bonus for 5-star rating
  if (review.starRating === 'FIVE') {
    score += 3;
  }

  // Bonus for having multiple matches
  if (matches.services.length > 1) score += 5;
  if (matches.pillars.length > 2) score += 5;

  return { score, matches, review };
}

// Score all reviews
const scoredReviews = data.reviews
  .filter(r => r.comment) // Only reviews with comments
  .map(review => scoreReview(review))
  .filter(r => r.score > 0) // Only reviews with some SEO value
  .sort((a, b) => b.score - a.score);

// Get top 50
const top50 = scoredReviews.slice(0, 50);

// Determine appropriate page for each review
function determinePage(matches, comment) {
  const text = comment.toLowerCase();

  // Check for specific services mentioned
  if (text.includes('tile') || text.includes('grout') || text.includes('stone')) {
    return 'Tile & Grout Cleaning';
  }
  if (text.includes('area rug') || (text.includes('rug') && !text.includes('carpet'))) {
    return 'Area Rug Cleaning';
  }
  if (text.includes('upholstery') || text.includes('sofa') || text.includes('couch') || text.includes('furniture')) {
    return 'Upholstery Cleaning';
  }
  if (text.includes('pet odor') || text.includes('pet stain') || text.includes('urine') || text.includes('pet smell')) {
    return 'Pet Odor Removal';
  }
  if (text.includes('carpet')) {
    return 'Carpet Cleaning';
  }

  // Default to homepage or carpet cleaning (most common service)
  return 'Homepage';
}

// Format for output
const formatted = top50.map((item, index) => {
  const page = determinePage(item.matches, item.review.comment || '');

  return {
    rank: index + 1,
    score: item.score,
    reviewer: item.review.reviewer?.displayName || 'Anonymous',
    rating: item.review.starRating,
    comment: item.review.comment || '',
    date: item.review.createTime,
    page: page,
    services: item.matches.services.join(', '),
    cities: item.matches.cities.join(', '),
    pillars: item.matches.pillars.join(', ')
  };
});

// Save to file
const outputFile = path.join(process.env.HOME, 'Desktop', 'Current Projects', 'chem-dry-site', 'top-50-seo-reviews.json');
fs.writeFileSync(outputFile, JSON.stringify(formatted, null, 2));

console.log(`\nTop 50 SEO-Friendly Reviews Selected`);
console.log(`=====================================`);
console.log(`Total reviews analyzed: ${data.reviews.length}`);
console.log(`Reviews with SEO value: ${scoredReviews.length}`);
console.log(`Top 50 selected and saved to: ${outputFile}\n`);

// Show summary
console.log('Page Distribution:');
const pageCount = {};
formatted.forEach(r => {
  pageCount[r.page] = (pageCount[r.page] || 0) + 1;
});
Object.entries(pageCount).sort((a, b) => b[1] - a[1]).forEach(([page, count]) => {
  console.log(`  ${page}: ${count} reviews`);
});

console.log('\nTop 10 Reviews:');
formatted.slice(0, 10).forEach(r => {
  console.log(`\n${r.rank}. ${r.reviewer} (Score: ${r.score}, Page: ${r.page})`);
  console.log(`   "${r.comment.substring(0, 100)}${r.comment.length > 100 ? '...' : ''}"`);
});
