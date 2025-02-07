(function() {
  // Initialize the loader flag to false.
  window.__catalystLoaderStatus = false;
  
  // Define your backend API URL (update for production if needed).
  const apiUrl = 'http://localhost:3000';
  const currentUrl = encodeURIComponent(window.location.href);
  
  // Fetch SEO data for the current page.
  fetch(`${apiUrl}/get-seo-data?url=${currentUrl}`)
    .then(response => response.json())
    .then(data => {
      // Optionally update the page (for example, document title and meta description).
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
      // Mark that the loader has executed.
      window.__catalystLoaderStatus = true;
      // Create a hidden marker element to signal that the loader is active.
      if (!document.getElementById('catalyst-loader-status')) {
        const marker = document.createElement('div');
        marker.id = 'catalyst-loader-status';
        marker.style.display = 'none';
        marker.innerText = 'loader-active';
        document.body.appendChild(marker);
      }
    })
    .catch(error => {
      console.error('Error in loader.js:', error);
      window.__catalystLoaderStatus = false;
    });
})();
