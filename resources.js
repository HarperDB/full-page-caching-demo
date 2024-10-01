
const {PageCache} = tables;



const parseCacheControl = (cacheContolHeader) => {

	// let cacheInfo = response.headers.get('Cache-Control');
    //   // TODO: This line parses cache control header to find out how loing the data should be cached 
    //   if (cacheInfo) {
    //     let maxAge = cacheInfo?.match(/max-age=(\d+)/)?.[1];

    //     if(maxAge === "0") {
    //       console.error(`received max-age 0 from origin: ${cacheInfo}`)
    //     }

    //     if (maxAge)
    //       // we can set a specific expiration time by setting context.expiresAt
    //       // we are converting from seconds to milliseconds, but we aren't using the full
    //       // max-age because we are using stale-while-revalidate, so this is the time until
    //       // we refresh from origin, but _not_ the time until we consider the record
    //       // fully expired and requiring revalidation _before_ returning it. So we kind
    //       // of split the difference here by setting it at 70% of the max-age
    //       context.expiresAt = Date.now() + maxAge * (1000 * EXPIRE_PERCENT);
    //     response.data.cacheControl = cacheInfo;

	// write code for cache control

}

// The code below is the a class that is used to update the cache
export class PageCacheResource extends Resource {

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

PageCache.sourcedFrom(PageCacheResource, { replicationSource: true });

// you can access the cache from the browser using the following URL: http://localhost:9926/MyCache/testPage

//http://localhost:9926/PageCache/<cacheId>


// TODO: need to clean up this repo and turn it into a template 

//TODO:  need to set expiration time for cache

//TODO:  need to configure when cache needs to be updated in table

// TODO: need to create a README.md file with instructions on how to implement partial page caching

