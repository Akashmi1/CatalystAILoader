(function() {
  // Set a flag to indicate the loader has executed
  window.__catalystLoaderStatus = false;

  const apiUrl = 'http://localhost:3000'; // Replace with your production backend URL as needed
  const currentUrl = encodeURIComponent(window.location.href);
  
  fetch(`${apiUrl}/get-seo-data?url=${currentUrl}`)
    .then(response => response.json())
    .then(data => {
      if (data && Object.keys(data).length > 0) {
        if (data.title) {
          document.title = data.title;
        }
        let metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc) {
          metaDesc = document.createElement('meta');
          metaDesc.name = 'description';
          document.head.appendChild(metaDesc);
        }
        if (data.metaDescription) {
          metaDesc.content = data.metaDescription;
        }
      }
      // Mark loader as executed
      window.__catalystLoaderStatus = true;
      // Optionally, add a hidden element for testing
      const statusEl = document.createElement('div');
      statusEl.id = 'catalyst-loader-status';
      statusEl.style.display = 'none';
      statusEl.innerText = 'loaded';
      document.body.appendChild(statusEl);
    })
    .catch(error => {
      console.error('Error fetching SEO data:', error);
      window.__catalystLoaderStatus = false;
    });
})();
