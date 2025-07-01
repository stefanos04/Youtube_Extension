function createFunnyBlock(message) {
  const div = document.createElement("div");
  div.className = "funny-blocker";
  const imageUrl = chrome.runtime.getURL("image.gif");
  div.innerHTML = `
    <p>${message}</p>
    <img src="${imageUrl}" width="300" alt="Funny image" />
  `;
  return div;
}

function blockRecommendations() {
  // Homepage
  const homeSections = document.querySelectorAll('ytd-rich-section-renderer, ytd-rich-grid-renderer');
  homeSections.forEach(el => el.remove());

  const homePrimary = document.querySelector('ytd-two-column-browse-results-renderer #primary');
  if (homePrimary && !document.querySelector('.funny-blocker')) {
    homePrimary.appendChild(createFunnyBlock("Hey. I can see you."));
  }

  // Sidebar on video watch page
  const sidebar = document.getElementById('related');
  if (sidebar && !sidebar.querySelector('.funny-blocker')) {
    sidebar.innerHTML = '';
    sidebar.appendChild(createFunnyBlock("Hey. I can see you."));
  }

  // Endscreen
  const endScreen = document.querySelector('.ytp-endscreen-content');
  if (endScreen && !endScreen.querySelector('.funny-blocker')) {
    endScreen.innerHTML = '';
    endScreen.appendChild(createFunnyBlock("Hey. I can see you"));
  }
}

setInterval(blockRecommendations, 1000);
