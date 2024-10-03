// import page cache table
const {PageCache} = tables;


/*

TODO: Example of how to cache a page

export class testPageCache extends Resource {
	invalidate() {
		super.invalidate();
	  }

	async get(){
		
		try{
			
			const response = (await fetch(`https://www.google.com/`));
			const rawHtmltoStr = await response.text();

            return { id: "/testPage", cachedData: rawHtmltoStr };

		}catch(e){
			console.log("ERROR", e);
		}
		
	}
}

PageCache.sourcedFrom(testPageCache);

//http://localhost:9926/PageCache/testPage




*/



export class testPageCache extends Resource {
	invalidate() {
		super.invalidate();
	  }

	async get(){
		
		try{
			
			const response = (await fetch(`https://www.google.com/`));
			const rawHtmltoStr = await response.text();

            return { id: "/testPage", cachedData: rawHtmltoStr };

		}catch(e){
			console.log("ERROR", e);
		}
		
	}
}

PageCache.sourcedFrom(testPageCache);

export class Pc extends PageCache {
	get() {
		let context = this.getContext();
		// console.log("-----------", this)
		// console.log("------------")
		console.log("---CONTEXT", context, "--------CONTEXT 2------")
		return this.cachedData

		// http://localhost:9926/Pc/testPage
	  
	  }
	}


const parseCacheControl = (cacheContolHeader) => {

	// let cacheInfo = response.headers.get('Cache-Control');
    //   // TODO: This line parses cache control header to find out how long  the data should be cached 
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
export class PageCacheResource extends PageCache {

	invalidate() {
		super.invalidate();
	  }

	  // TODO: 
	  //const cacheId = this.getId()
	  //pageURL = 'http://somehost.com/' + cacheId
	  // response.byte as an optimization
	
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


// TODO: need to clean up this repo and turn it into a template 

//TODO:  need to set expiration time for cache

//TODO:  need to configure when cache needs to be updated in table

// TODO: need to create a README.md file with instructions on how to implement partial page caching



// TODO: 

//export class PageCache extends tables.PageCache {
// 	get() {
// 		return this.html;
//    }


// export class PageCache extends tables.PageCache {
// 	get() {
// 	  return { // can also return a full response header
// 		 status: 200,
// 		 headers: { 'Content-Type': 'text/html' },
// 		 body: this.html
// 		}
// 	  }
// 	}



// http://host.com/PageCache/testPage.html



// Put some thought into 

// Naming component based on the the functionality of the component


// fumctionality intent behind each component 

// extenstion


// TODO: 

// What distinguishes each component from the other 


// intent of use vs functionality of a component



