

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

*/

/********************************************************************************************************** */

// ***********EXAMPLE IMPLEMENTATION OF PAGE CACHE************ //

/*
	  Usage Instructions:
  
	  1. define the cache ID. (The ID is set using HarperDB REST handler):
	  	You can access the cache from the browser using the following URL: http://localhost:9926/PageCache/<cacheId>
	  2. Customize `pageURL` based on where the page is hosted.

	  Example: 
	  - The returned `cachedData` will contain the HTML as a string.
  */

//  export class InvalidateCache extends PageCache {

//   async get(data) {
//     await this.invalidate();
   

//       // Continue with your normal GET logic
//       return { cachedData: "Cache invalidated" };

  
//     }
  
//   }


//   async function parseURL(url) {
//     // Parse the request URL to get the `id` query parameter
//     const parsedUrl = new URL(url, 'http://localhost');
//     const id = parsedUrl.searchParams.get('id');
  
//     // If the id exists, return it
//     if (id) {
//       return id; // returns "123"
//     }
//   }


//   // A class used to update the cache for a specific page
// export class PageCacheResource extends PageCache {
//   //Invalidate the cache if necessary
//   invalidate() {
//     super.invalidate();
//   }

//   // Fetch the page and update the cache
//   async get(query) {

//     let context = this.getContext();
    
//     const OriginItemId = context.requestContext.url

    
//     const parseid = await parseURL(OriginItemId)

//     console.log("parseOriginUrl", parseid)

//     // Checks if item is in the cache
//     //const source = this.wasLoadedFromSource();

//     const itemPageIdInCache = this.itemPageID;

//     console.log("itemPageIdInCache", itemPageIdInCache)

//     if (parseid === itemPageIdInCache) {

//       return {
//         itemPageID: this.itemPageID,
//         contentType: 'text/html',
//         statusCode: 304,
//         cachedData: this.cachedData,
//       }
//     }

//     const baseUrl = "http://localhost:4000";
//     const path = "/products/backpacks/"
//     const pageURL = baseUrl + path + parseid; // URL of the page to be cached
    
//     console.log("pageURL", pageURL)
    
//     const response = await fetch(pageURL); // Fetch the page content

//     /**
//      * To save response as binary data, use response.bytes() instead of response.text()
//      *
//      * Example:
//      * const byteArray = await response.bytes();
//      *  return {cachedData: byteArray};
//      * Set cachedData type in schemas.graphql to Bytes
//      */

//     //convert html to string
//     const convertHtmlTextToStr = await response.text();


    
   

//     //Return the cached data in a structured format
//     return { 
      
//       itemPageID: parseid,
//       contentType: 'text/html',
//       statusCode: 200,
//       cachedData: convertHtmlTextToStr,
      


//     };
//   }


  

// }
  

// PageCache.sourcedFrom(PageCacheResource);

// Go to the following URL:



//http://localhost:9926/PageCache/backpacks











// ***********BREAK************ //





// Importing the PageCache class from the tables module
const {PageCache} = tables;

// Importing MongoDB client utilities and ObjectId constructor for database operations
import {MongoClient,ObjectId} from "mongodb";

// Importing the performance module for timing and latency measurement
import {performance} from 'perf_hooks';

// Class InvalidateCache inherits from PageCache, allowing cache invalidation before retrieving data
export class InvalidateCache extends PageCache {

  // Override of the get() method in PageCache
  async get(data) {
     // Invalidate cache before performing any get operations
     await this.invalidate();

     // Returning a custom response after cache invalidation
     return {
        cachedData: "Cache invalidated"
     };
  }
}

// Function to parse the provided URL and retrieve the 'id' query parameter
async function parseURL(url) {
  // URL parsing, assuming 'localhost' as the base URL
  const parsedUrl = new URL(url, 'http://localhost');
  const id = parsedUrl.searchParams.get('id');

  // Return the id if it exists, otherwise undefined
  if (id) {
     return id; // Example return value: "123"
  }
}

// Function to establish a MongoDB connection
async function conectToMongoDB() {
  // MongoDB connection URI
  const uri = "mongodb://localhost:27017";
  const client = new MongoClient(uri);
  const dbName = "FPC-DEMO";

  // Connect to MongoDB and log confirmation message
  await client.connect();
  console.log("Connected to MongoDB");

  // Return the specified database instance
  const db = client.db(dbName);
  return db;
}

// Function to query MongoDB for items by product ID, returning detailed product data
async function queryMongoForItems(productId) {
  // Get a connection to the MongoDB database
  const connectiontoDb = await conectToMongoDB();

  // Specify the 'products' collection within the database
  const collection = connectiontoDb.collection("products");

  // Query the database with an aggregation pipeline
  const product = await collection.aggregate([{
        $match: {
           _id: new ObjectId(productId)
        }
     }, // Match document by _id
     {
        $lookup: {
           from: 'categories', // Join the 'categories' collection
           localField: 'category', // Product's category field
           foreignField: '_id', // Category document's _id
           as: 'categoryDetails' // Add category details as array
        }
     },
     {
        $unwind: "$categoryDetails"
     } // Flatten category details array
  ]).toArray(); // Convert the result to an array

  return product[0]; // Return the first matching product document
}

// Class to handle cache for specific pages
export class PageCacheResource extends PageCache {

  // Method to invalidate the cache
  invalidate() {
     super.invalidate();
  }

  // Fetch data for a specific page, updating the cache if necessary
  async get(query) {
     // Track start time for latency measurement
     const start = performance.now();

     // Retrieve the context related to the cache request
     let context = this.getContext();

     // Extract the URL of the requested item
     const OriginItemId = context.requestContext.url;

     // Parse the URL to get the item ID
     const parseid = await parseURL(OriginItemId);

     // Check if the item ID in cache matches the parsed ID
     const itemPageIdInCache = this.itemPageID;

     if (parseid === itemPageIdInCache) {
        // If item is in cache, set response headers and return cached data
        const latency = performance.now() - start;
        

        return {
           itemPageID: this.itemPageID,
           contentType: 'text/html',
           statusCode: 304, // HTTP status 304 (Not Modified)
           cachedData: this.cachedData,
           latency: `Latency: ${latency.toFixed(2)} ms`
        };
     }

     // TODO: Implement URL construction for cache miss handling

     // Fetch item data directly from the database if not found in cache
     const getItem = await queryMongoForItems(parseid);

     /**
      * Note: To store response as binary data, use response.bytes() instead of response.text()
      * 
      * Example:
      * const byteArray = await response.bytes();
      * return {cachedData: byteArray};
      * Ensure cachedData type in schemas.graphql is set to Bytes
      */

     // Return structured cached data with calculated latency
     const latency = performance.now() - start;

     return {
        itemPageID: parseid,
        contentType: 'text/html',
        statusCode: 200, // HTTP status 200 (OK)
        cachedData: getItem,
        latency: `Latency: ${latency.toFixed(2)} ms`
     };
  }
}

// Setting PageCache to use PageCacheResource for source data handling
PageCache.sourcedFrom(PageCacheResource);