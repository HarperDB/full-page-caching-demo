// import PageCache table from schemas.graphql
const { PageCache } = tables;


// ***********EXAMPLE IMPLEMENTATION OF HTML-ONLY CACHE RETURN************

// This is usefule if you are caching pages at scale and want to reduce the response payload

/* 

export class ExamplePageCache extends PageCache {
  
  // Method to return only the cached HTML string
  get() {
	try {
	  // Assuming `this.cachedData` contains the cached HTML string
	  if (this.cachedData) {
		return this.cachedData;
	  } else {
		throw new Error("No cached data found.");
	  }
	} catch (error) {
	  console.error("ERROR fetching cached HTML:", error);
	  return "Error fetching cached HTML";
	}
  }
}

********** Call this URL to access only the HTML string in the cache: http://localhost:9926/ExamplePageCache/testPage **********

*/

/********************************************************************************************************** */

// ***********EXAMPLE IMPLEMENTATION OF PAGE CACHE************ //

/*
	  Usage Instructions:
  
	  1. define the cache IDs.
	  2. Customize `pageURL` based on where the page is hosted.
	  3. Call this URL to access the cached content:
		 http://localhost:9926/PageCacheResource/{yourCacheId}
  
	  Example: 
	  - The returned `cachedData` will contain the HTML as a string.
  */


// A class used to update the cache for a specific page
export class PageCacheResource extends PageCache {
  // Invalidate the cache if necessary
  invalidate() {
    super.invalidate();
  }

  // Fetch the page and update the cache
  async get() {
    try {
      const pageURL = "https://www.google.com/"; // URL of the page to cache
      const cacheId = ""; // the ID of the page to cache (example: https://www.birkenstock.com/us/men/ or /us/men/)
      const response = await fetch(pageURL); // Fetch the page content

      // Convert the HTML content to string(Use response.text()) default response is in binary
      const convertHtmlTextToStr = await response.binary(); 

      //Return the cached data in a structured format
      return { id: cacheId, cachedData: convertHtmlTextToStr };
    } catch (e) {
      console.log("CACHING ERROR", e);
    }
  }
}

// you can access the cache from the browser using the following URL: http://localhost:9926/PageCache/<cacheId>

PageCache.sourcedFrom(PageCacheResource);
