(function() {
  // Initialize loader flag
  window.__catalystLoaderStatus = false;
  
  // Define your backend API URL (update for production as needed)
  const apiUrl = 'http://localhost:3000';
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
      // Create a hidden marker element
      if (!document.getElementById('catalyst-loader-status')) {
        const marker = document.createElement('div');
        marker.id = 'catalyst-loader-status';
        marker.style.display = 'none';
        marker.innerText = 'loaded';
        document.body.appendChild(marker);
      }
      // If this window was opened by another window, send a message back
      if (window.opener) {
        window.opener.postMessage({ loaderStatus: true, url: window.location.href }, "*");
      }
    })
    .catch(error => {
      console.error('Error fetching SEO data:', error);
      window.__catalystLoaderStatus = false;
      if (window.opener) {
        window.opener.postMessage({ loaderStatus: false, url: window.location.href, error: error.message }, "*");
      }
    });
})();
