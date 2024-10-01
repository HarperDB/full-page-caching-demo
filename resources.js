
const {PageCache, MyCache} = tables;

/** Here we can define any JavaScript-based resources and extensions to tables

export class MyCustomResource extends tables.TableName {
	// we can define our own custom POST handler
	post(content) {
		// do something with the incoming content;
		return super.post(content);
	}
	// or custom GET handler
	get() {
		// we can modify this resource before returning
		return super.get();
	}
}
 */
// we can also define a custom resource without a specific table
export class Greeting extends Resource {
	// a "Hello, world!" handler
	get() {
		return { greeting: 'Hello, world!' };
	}
}

const parseCacheControl = (cacheContolHeader) => {

}

export class WebPageCacheResource extends Resource {
	async get() {
		try{

			const htmlContent = `
						<div>
							<h1>Hello, World!</h1>
							<p>This is a sample HTML response in JSON format.</p>
						</div>
    		`;

			//return {html: htmlContent }

			return{
				id: "/testPage",
				cachedData: htmlContent
			}
			
		}catch(e){
			console.log("CACHING ERROR", e);
		}
		
	}
}


export class testPageCache extends Resource {
	invalidate() {
		super.invalidate();
	  }

	async get(){
		
		try{
			console.log("FETCHING PAGE");
			const response = (await fetch(`https://www.google.com/`));
			console.log("RESPONSE", response);
			const rawHtmltoStr = await response.text();
            console.log("RESPONSE", rawHtmltoStr);
			
            return { id: "/testPage", cachedData: rawHtmltoStr };
		}catch(e){
			console.log("ERROR", e);
		}
		
	}
}
MyCache.sourcedFrom(testPageCache, { replicationSource: true });




// you can access the cache from the browser using the following URL: http://localhost:9926/MyCache/testPage


// TODO: need to clean up this repo and turn it into a template 

//TODO:  need to set expiration time for cache

//TODO:  need to configure when cache needs to be updated in table

// TODO: need to create a README.md file with instructions on how to implement partial page caching

