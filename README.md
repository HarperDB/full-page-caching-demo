# HarperDB Full Page/Partial Page Cache Application Template

This repo is a template for implementing full/partial page caching using HarperDB application component.

You can visit the links below to learn more about HarperDB and application components:

- [HarperDB Application Component Github repo](https://github.com/HarperDB/application-template)
- [HarperDB Documentation](https://docs.harperdb.io/docs/developers/applications)



## Getting Started

### Prerequisites

Before cloning this repository, ensure HarperDB is installed on your local machine. If it's not already installed,
copy the code snippet below into your terminal to install HarperDB."



```npm i -g harperdb``` 


### ***Installation***

1. ***Clone this repository to your local machine***



>>>> ```git clone <repository-url>```

2. ***Go to the project directory***

>>>```cd <repository-directory>```

3. ***Start HarperDB in your project directory by running*** 

>>>```harperdb dev .```


## Implementing the Caching Solution

To implement caching, you need to modify the PageCacheResource class located in the resource.js file. 

The class is responsible for fetching the web page content and storing it in a cache.

Follow the comments in the code for guidance on how to set it up.



## Example
    
***visit the following URL in the browser to access the webpage cached***: 

``` http://localhost:9926/PageCache/examplePage```



## Learn more about caching with HarperDB visit:

- [HarperDB Application Caching Docs](https://docs.harperdb.io/docs/developers/applications/caching)

- {Link to Dev Center Blog}

- {Link to Demo Video}









