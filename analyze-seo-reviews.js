const fs = require('fs');
const path = require('path');

// Messaging pillars keywords
const messagingPillars = {
  'Speed/Convenience': ['dried', 'quick', 'same day', 'efficient', 'fast', 'prompt', 'on time', 'next day', 'hours'],
  'Results': ['like new', 'brand new', 'amazing', 'stains gone', 'looks great', 'fantastic', 'excellent', 'wonderful', 'perfect', 'beautiful', 'clean', 'renewed', 'bright'],
  'Professionalism': ['on time', 'respectful', 'courteous', 'thorough', 'professional', 'polite', 'pleasant', 'friendly', 'knowledgeable', 'explained'],
  'Health/Safety': ['safe', 'kids', 'pets', 'green', 'non-toxic', 'allergy', 'sanitized', 'vaccinated'],
  'Value': ['worth', 'reasonable', 'great value', 'best', 'recommend']
};

// Service keywords
const serviceKeywords = {
  'Carpet Cleaning': ['carpet', 'carpets'],
  'Upholstery Cleaning': ['couch', 'sofa', 'furniture', 'chair', 'upholstery', 'sectional', 'leather'],
  'Tile, Grout, and Stone Cleaning': ['tile', 'grout', 'stone', 'granite', 'shower'],
  'Area Rug Cleaning': ['rug', 'rugs', 'area rug'],
  'Pet Odor/Urine Removal': ['pet', 'urine', 'odor', 'cat', 'dog', 'puppy', 'spray']
};

// City keywords
const cities = ['Mesa', 'Phoenix', 'Gilbert', 'Tempe', 'Scottsdale', 'Chandler', 'Apache Junction', 'Queen Creek'];

function detectPillars(text) {
  const pillars = [];
  const lowerText = text.toLowerCase();

  for (const [pillar, keywords] of Object.entries(messagingPillars)) {
    if (keywords.some(keyword => lowerText.includes(keyword.toLowerCase()))) {
      pillars.push(pillar);
    }
  }

  return pillars;
}

function detectServices(text, serviceType = '') {
  const services = new Set();
  const lowerText = text.toLowerCase();
  const lowerServiceType = serviceType.toLowerCase();

  // Check service type field first
  if (lowerServiceType.includes('carpet')) services.add('Carpet Cleaning');
  if (lowerServiceType.includes('upholstery') || lowerServiceType.includes('furniture')) services.add('Upholstery Cleaning');
  if (lowerServiceType.includes('rug')) services.add('Area Rug Cleaning');
  if (lowerServiceType.includes('odor')) services.add('Pet Odor/Urine Removal');
  if (lowerServiceType.includes('tile') || lowerServiceType.includes('grout')) services.add('Tile, Grout, and Stone Cleaning');

  // Check text content
  for (const [service, keywords] of Object.entries(serviceKeywords)) {
    if (keywords.some(keyword => lowerText.includes(keyword))) {
      services.add(service);
    }
  }

  return Array.from(services);
}

function detectCity(text) {
  for (const city of cities) {
    if (text.includes(city)) {
      return city;
    }
  }
  return null;
}

function isSubstantive(text) {
  // Filter out very short or generic reviews
  const lowerText = text.toLowerCase();
  const genericPhrases = ['great job', 'no comment', 'nothing', 'no comments'];

  if (text.length < 30) return false;
  if (genericPhrases.some(phrase => lowerText === phrase || lowerText === phrase + '.')) return false;

  return true;
}

function processCSV(filePath, source) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n').slice(1); // Skip header
  const reviews = [];

  for (const line of lines) {
    if (!line.trim()) continue;

    // Parse CSV line (basic parser)
    const match = line.match(/^([^,]*),(?:"([^"]*)"|([^,]*)),([^,]*),(.*)$/);
    if (!match) continue;

    const reviewer = match[1].trim();
    const text = (match[2] || match[3] || '').trim();
    const reviewSource = match[4].trim();
    const link = match[5].trim();

    if (isSubstantive(text)) {
      reviews.push({
        review: text,
        reviewer: reviewer || null,
        source: reviewSource || source,
        link: link || null,
        messaging_pillars: detectPillars(text),
        services: detectServices(text),
        city: detectCity(text)
      });
    }
  }

  return reviews;
}

function processJSON(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  let data = JSON.parse(content);

  // Handle different JSON structures
  if (data.reviews && Array.isArray(data.reviews)) {
    data = data.reviews;
  } else if (!Array.isArray(data)) {
    console.error(`Invalid JSON structure in ${filePath}`);
    return [];
  }

  const reviews = [];

  for (const item of data) {
    // Handle different rating formats
    let rating = item.rating;
    if (item.starRating === 'FIVE') rating = 5;
    else if (item.starRating === 'FOUR') rating = 4;
    else if (item.starRating === 'THREE') rating = 3;
    else if (item.starRating === 'TWO') rating = 2;
    else if (item.starRating === 'ONE') rating = 1;

    // Only include 4 and 5 star reviews
    if (rating && rating < 4) continue;

    // Handle different text field names
    const text = item.text || item.comment || item.review || '';
    if (!text || !isSubstantive(text)) continue;

    // Handle different reviewer field names
    const reviewerName = item.author ||
                        (item.reviewer && typeof item.reviewer === 'object' ? item.reviewer.displayName : item.reviewer) ||
                        null;

    reviews.push({
      review: text,
      reviewer: reviewerName,
      source: item.source || 'Unknown',
      link: item.link || null,
      messaging_pillars: detectPillars(text),
      services: detectServices(text, item.serviceType || ''),
      city: detectCity(text),
      seo_notes: []
    });

    // Add SEO notes
    const lastReview = reviews[reviews.length - 1];

    // Flag multi-service reviews
    if (lastReview.services.length > 1) {
      lastReview.seo_notes.push('Multi-service mention - can be used across multiple service pages');
    }

    // Flag repeat customer mentions
    if (text.toLowerCase().includes('again') || text.toLowerCase().includes('multiple times') || text.toLowerCase().includes('years')) {
      lastReview.seo_notes.push('Mentions repeat business or long-term trust');
    }

    // Flag referral mentions
    if (text.toLowerCase().includes('recommend') || text.toLowerCase().includes('refer')) {
      lastReview.seo_notes.push('Mentions recommendations/referrals - signals trust');
    }
  }

  return reviews;
}

// Process all files
const testimonialDir = path.join(__dirname, 'docs', 'testimonials');
let allReviews = [];

// Process CSV files
console.log('Processing Angi reviews...');
allReviews = allReviews.concat(processCSV(path.join(testimonialDir, 'angi-reviews.csv'), 'Angi'));

console.log('Processing Yelp reviews...');
allReviews = allReviews.concat(processCSV(path.join(testimonialDir, 'yelp-reviews.csv'), 'Yelp'));

console.log('Processing Facebook reviews...');
allReviews = allReviews.concat(processCSV(path.join(testimonialDir, 'brimleys_facebook_reviews.csv'), 'Facebook'));

console.log('Processing Customer Lobby reviews...');
allReviews = allReviews.concat(processCSV(path.join(testimonialDir, 'customer-lobby-reviews.csv'), 'CustomerLobby'));

// Process JSON files
console.log('Processing Google reviews...');
const googleReviews = processJSON(path.join(testimonialDir, 'google-reviews.json'));
googleReviews.forEach(review => {
  if (review.source === 'Unknown') review.source = 'Google';
});
allReviews = allReviews.concat(googleReviews);

console.log('Processing Thumbtack reviews...');
allReviews = allReviews.concat(processJSON(path.join(testimonialDir, 'thumbtack-reviews.json')));

// Sort by number of messaging pillars (most valuable first)
allReviews.sort((a, b) => {
  const scoreA = a.messaging_pillars.length + a.services.length + (a.seo_notes ? a.seo_notes.length : 0);
  const scoreB = b.messaging_pillars.length + b.services.length + (b.seo_notes ? b.seo_notes.length : 0);
  return scoreB - scoreA;
});

// Add SEO notes to older reviews that don't have them
allReviews.forEach(review => {
  if (!review.seo_notes) {
    review.seo_notes = [];

    // Flag multi-service reviews
    if (review.services.length > 1) {
      review.seo_notes.push('Multi-service mention - can be used across multiple service pages');
    }

    // Flag repeat customer mentions
    if (review.review.toLowerCase().includes('again') || review.review.toLowerCase().includes('multiple times') || review.review.toLowerCase().includes('years')) {
      review.seo_notes.push('Mentions repeat business or long-term trust');
    }

    // Flag referral mentions
    if (review.review.toLowerCase().includes('recommend') || review.review.toLowerCase().includes('refer')) {
      review.seo_notes.push('Mentions recommendations/referrals - signals trust');
    }
  }
});

// Write output
const outputPath = path.join(__dirname, 'docs', 'testimonials', 'seo-optimized-reviews.json');
fs.writeFileSync(outputPath, JSON.stringify(allReviews, null, 2));

console.log(`\n✅ Analysis complete!`);
console.log(`📊 Total SEO-worthy reviews extracted: ${allReviews.length}`);
console.log(`📁 Output saved to: ${outputPath}`);

// Print summary stats
const pillarCounts = {};
const serviceCounts = {};

allReviews.forEach(review => {
  review.messaging_pillars.forEach(pillar => {
    pillarCounts[pillar] = (pillarCounts[pillar] || 0) + 1;
  });
  review.services.forEach(service => {
    serviceCounts[service] = (serviceCounts[service] || 0) + 1;
  });
});

console.log('\n📈 Reviews by Messaging Pillar:');
Object.entries(pillarCounts).sort((a, b) => b[1] - a[1]).forEach(([pillar, count]) => {
  console.log(`   ${pillar}: ${count}`);
});

console.log('\n🔧 Reviews by Service:');
Object.entries(serviceCounts).sort((a, b) => b[1] - a[1]).forEach(([service, count]) => {
  console.log(`   ${service}: ${count}`);
});
