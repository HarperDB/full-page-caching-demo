// import page cache table
const {PageCache} = tables;



// ***********EXAMPLE IMPLEMENTATION OF PAGE CACHE************

/*  

******* How to implement Page Caching ********



export class ExamplePageCacheResource extends Resource {
  
	// Invalidate cache if necessary
	invalidate() {
	  super.invalidate();
	}
  
	// Fetch and cache the page
	async get() {
	  try {
		// Fetch the page content from the external source
		const response = await fetch(`https://www.google.com/`);
		
		// Check if the response is successful (status code 200)
		if (!response.ok) {
		  throw new Error(`HTTP error! Status: ${response.status}`);
		}
		
		// Convert raw HTML response to string
		const rawHtmlToStr = await response.text();
  
		// Return the cache data
		return { id: "/testPage", cachedData: rawHtmlToStr };
		
	  } catch (error) {
		// Log any errors that occur during the fetch process
		console.error("ERROR fetching page data:", error);
	  }
	}
  }
  
  
	// Define this class as a cache source for PageCache
  PageCache.sourcedFrom(ExamplePageCacheResource);
  



*/

/********** Call this URL to access the cache: http://localhost:9926/PageCache/testPage **********/



//************************************************************************************************* */



// ***********EXAMPLE IMPLEMENTATION OF HTML-ONLY CACHE RETURN************

  

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

/*

A class used to update the cache for a specific page
export class PageCacheResource extends PageCache {

	// Invalidate the cache if necessary
	invalidate() {
	  super.invalidate();
	}
  
	// Fetch the page and update the cache
	async get() {
	  try {
		const pageURL = ``; // URL of the page to cache
		const cacheId = `pageURL/ + ${this.getId()}`; // Get the ID of the page to cache (to be implemented by the user)
  
		// Fetch the page content
		const response = await fetch(pageURL);
		
		if (!response.ok) {
		  throw new Error(`Failed to fetch the page: ${response.status}`);
		}
  
		// Convert the HTML content to string
		const htmlContent = await response.text();
  
		// Return the cached data in a structured format
		return { id: cacheId, cachedData: htmlContent };
		
	  } catch (e) {
		console.log("CACHING ERROR:", e);
	  }
	}
  }
  
  // Define PageCacheResource as the cache source
  PageCache.sourcedFrom(PageCacheResource);
  */
  
  /*
	  Usage Instructions:
  
	  1. define the cache IDs.
	  2. Customize `pageURL` based on where the page is hosted.
	  3. Call this URL to access the cached content:
		 http://localhost:9926/PageCacheResource/{yourCacheId}
  
	  Example: 
	  - The returned `cachedData` will contain the HTML as a string.
  */


  
 





// The code below is the a class that is used to update the cache
export class PageCacheResource extends PageCache {

	invalidate() {
		super.invalidate();
	  }

	
	async get() {
		try{
			const pageURL = "" // URL of the page to cache
			const cacheId = "" // id of the page to cache
			const response = (await fetch(pageURL)); // fetch the page and get the html content to cache
			const convertHtmlTextToStr = await response.text(); // convert the html content to string
			return { id: cacheId, cachedData: convertHtmlTextToStr };
			
		}catch(e){
			console.log("CACHING ERROR", e);
		}
		
	}
}

PageCache.sourcedFrom(PageCacheResource);

// you can access the cache from the browser using the following URL: http://localhost:9926/MyCache/testPage

//http://localhost:9926/PageCache/<cacheId>


