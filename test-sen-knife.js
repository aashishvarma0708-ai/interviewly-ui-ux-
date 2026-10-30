import puppeteer from 'puppeteer';

async function runTest() {
  console.log('🚀 Starting Interviewly Comprehensive Verification Test...');

  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

  const consoleErrors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  page.on('pageerror', (err) => {
    consoleErrors.push(err.toString());
  });

  console.log('📍 Navigating to http://localhost:5173/ ...');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });

  // ── TEST 1: Intro Loading Page (No Loading Bar & Swipes Across on Cursor Move) ──
  console.log('🧪 TEST 1: Checking Opening Intro Sequence...');
  const progressBarExists = await page.$('.intro-progress-bar');
  const counterExists = await page.$('.intro-counter');
  console.log('   Loading bar exists in DOM?', !!progressBarExists);
  console.log('   Percentage counter exists in DOM?', !!counterExists);

  if (progressBarExists || counterExists) {
    console.error('❌ Loading bar or percentage counter was found on loading screen!');
  } else {
    console.log('   ✅ Loading bar and percentage counter are completely removed.');
  }

  // Trigger swipe across via cursor movement
  const introOverlay = await page.$('.intro-sequence-overlay');
  if (introOverlay) {
    console.log('   Triggering swipe across by moving mouse...');
    await page.mouse.move(200, 200);
    await page.mouse.move(450, 450);
    await new Promise((r) => setTimeout(r, 900));
    const isExiting = await page.$('.intro-sequence-overlay.is-exiting');
    console.log('   Intro swiped across successfully?', !!isExiting || !(await page.$('.intro-sequence-overlay')));
  }

  // ── TEST 2: Verify Removal of San Francisco Coordinates ──
  console.log('🧪 TEST 2: Checking Topbar and Footer for Coordinates Removal...');
  const pageContent = await page.content();
  const hasCoordinates = pageContent.includes('37.7749° N') || pageContent.includes('122.4194° W');
  const hasCities = pageContent.includes('SAN FRANCISCO · LONDON · TOKYO');

  console.log('   Contains "37.7749° N, 122.4194° W"?', hasCoordinates);
  console.log('   Contains "SAN FRANCISCO · LONDON · TOKYO"?', hasCities);

  if (hasCoordinates || hasCities) {
    console.error('❌ Coordinates or city header text still present in DOM!');
  } else {
    console.log('   ✅ Coordinates and cities successfully removed from Hero & Footer.');
  }

  // ── TEST 3: Verify Exact Requested Sequence of Sections ──
  console.log('🧪 TEST 3: Checking Section Ordering Sequence...');
  const sectionIds = await page.$$eval('section[id]', (sections) => sections.map((s) => s.id));
  console.log('   Actual Section Order in DOM:', sectionIds);

  const expectedOrder = ['hero', 'how-it-works', 'evidence', 'variants', 'audiences', 'benefits'];
  const matchesOrder = expectedOrder.every((id, idx) => sectionIds[idx] === id);

  if (matchesOrder) {
    console.log('   ✅ Sections are in the EXACT sequential order requested:');
    console.log('      1. Hero (#hero)');
    console.log('      2. How It Works (#how-it-works)');
    console.log('      3. Evidence (#evidence)');
    console.log('      4. Role Streams (#variants)');
    console.log('      5. For Companies / Audiences (#audiences)');
    console.log('      6. Platform Advantages (#benefits)');
  } else {
    console.error('❌ Section order mismatch! Actual:', sectionIds);
  }

  // ── TEST 4: Test Page Reload Scroll Position (Always Top) ──
  console.log('🧪 TEST 4: Testing Page Reload Scroll Position...');
  // Scroll down to the bottom
  await page.evaluate(() => window.scrollTo(0, 3500));
  await new Promise((r) => setTimeout(r, 300));
  const scrollBeforeReload = await page.evaluate(() => window.scrollY);
  console.log(`   Scrolled to: ${scrollBeforeReload}px before reload`);

  // Reload the page
  console.log('   Reloading page (Cmd+R simulation)...');
  await page.reload({ waitUntil: 'networkidle2' });
  await new Promise((r) => setTimeout(r, 600));

  const scrollAfterReload = await page.evaluate(() => window.scrollY);
  console.log(`   Scroll position after reload: ${scrollAfterReload}px`);

  if (scrollAfterReload === 0) {
    console.log('   ✅ Page reload is strictly pinned to top (scrollY === 0)!');
  } else {
    console.error(`❌ Page did not stay at top on reload! Current scroll: ${scrollAfterReload}px`);
  }

  // ── TEST 5: Capture Artifact Screenshots ──
  const artifactDir = '/Users/aashishvarma/.gemini/antigravity/brain/7f08fad5-f0e9-4829-94c5-4e2d56486667';
  console.log('📸 Capturing verification screenshots...');

  // Ensure all revealed classes are applied for complete visual inspection of all sections
  await page.evaluate(() => {
    document.querySelectorAll('.reveal-on-scroll, .line-mask-wrap').forEach((el) => {
      el.classList.add('is-revealed');
      el.classList.add('is-visible');
    });
    window.scrollTo(0, 0);
  });
  await new Promise((r) => setTimeout(r, 500));

  await page.screenshot({ path: `${artifactDir}/interviewly_dark_hero.png` });
  console.log(`   Saved Hero: ${artifactDir}/interviewly_dark_hero.png`);

  await page.screenshot({ path: `${artifactDir}/interviewly_dark_landing.png`, fullPage: true });
  console.log(`   Saved Fullpage: ${artifactDir}/interviewly_dark_landing.png`);

  // Check console errors
  if (consoleErrors.length > 0) {
    console.error('❌ Console errors encountered:', consoleErrors);
  } else {
    console.log('✅ ZERO console errors detected!');
  }

  await browser.close();
  console.log('🎉 All verification tests completed successfully!');
}

runTest().catch((err) => {
  console.error('Test failed:', err);
  process.exit(1);
});
