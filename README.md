# HarperDB Full Page/Partial Page Cache Application Template

This repo is a template for implementing full/partial page caching using HarperDB application component.

You can visit the links below to learn more about HarperDB and application components

- [HarperDB Application Component Github repo](https://github.com/HarperDB/application-template)
-[HarperDB Documentation](https://docs.harperdb.io/docs/developers/applications)



## Getting Started

### Prerequisites

Before you begin, ensure that you have HarperDB installed on your machine. You can install HarperDB via npm:


```npm i harperdb``` 


### ***Installation***

1. ***Clone this repository to your local machine***


```git clone <repository-url>```

2. ***Go to the project directory***

```cd <repository-directory>```

3. ***Start HarperDB in your project directory by running*** 

```harperdb dev .```


## Implementing the Caching Solution

To implement caching, you need to modify the PageCacheResource class located in the resource.js file. 

The class is responsible for fetching the web page content and storing it in a cache.

Follow the comments in the code for guidance on how to set it up.



## Example



Below is an example of how to define a custom ```PageCacheResource```

Uncomment this code in the ```resource.js``` file 


```javascript
export class ExamplePageCacheResource extends Resource {
    // Invalidate cache if necessary
    invalidate() {
        super.invalidate();
    }
    
    // Fetch and cache the page
    async get() {
        try {
            // Fetch the page content from an external source
            const response = await fetch(`https://www.google.com/`);
            
            // Check if the response is successful (status code 200)
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            
            // Convert the raw HTML response to a string
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

```

Once the comments have been removed from this code visit the following URL in the browser to access the webpage cached. 

``` http://localhost:9926/PageCache/testPage```



## To learn more about caching with HarperDB visit:

- [HarperDB Application Caching Docs](https://docs.harperdb.io/docs/developers/applications/caching)

- {Link to Dev Center Blog}

- {Link to Demo Video}









