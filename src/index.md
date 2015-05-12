---
layout: default
---

## Introduction - Delivery API

Welcome to the braid documentation. The first part of the docs will explain to you how to use the delivery API, the resources that are available to you and the URL Parameters that are made available in order to access the information you want from Braid.

### Getting Started

To start using the Braid Delivery API, there is a base route that all of the requests must go through. If you don’t provide the base route then the server will reply with a 404 not found error. The base route is as follows:

{% highlight html %}

	'http://api.getbraid.io/api/delivery/v1/:resource/:resource_id'

{% endhighlight %}

Anything after that will be a resource, to see what resources are available and what you can do with them please continue further down into the documentation. They typically follow a pattern of the resource and a resource ID, if you have it. This will return the exact entry.

The API also has generic query parameters available on all requests which will help control the data you request. See [URL Parameters](#url-parameters) for more.

### Making Requests

The API will only accept ```GET``` requests. If you want to manage or edit your content, then you're going to need to use the [Management API]('/management-api.html').

When the data is returned it will always return JSON as this is one of the most popular way of presenting data. There isn’t currently anyway of returning XMl or other data formats. No jsonp callback is provided either.

When requesting from the Delivery API there is no authentication needed; because of this, any personal information about a user is also automatically not included in any responses. This includes first name, last name, email and password. For extra security the password is hashed and salted too, so the password is secure even in the event of a database break in.

### Available Resources

The Delivery API provides you with the ability to request 5 types of resources, these are as follows.

- [user](#user-resource)
- [braid](#braid-resource)
- [thread](#thread-resource)
- [modifier](#modifier-resource)
- [entries](#entries-resource)

## URL Parameters

For every request there are helpful URL Parameters you can add. These allow you to have more control over that data you receive back in requests.

### Exclude Parameter

The exclude parameter allows you to exclude properties that you don’t want back, from a request through a space separated list. This is helpful because it’s less data to be sent over in a request and also means less JSON to look through. Look at the example below.

{% highlight json %}

	{
		"_id": "554b7c7f0f9c288477c26780",
		"id": "UUZQHUkVFzQXUU3Y2iQZTSCVX9Yml5XHN1",
		"_braidId": "554a8034dfd1a2521ce4a179",
		"_threadId": "554a818f6eda17d33587e567",
		"service": "youtube",
		"data": {
			"thumbnails": {
				"default": {
					"url": "https://i.ytimg.com/vi/W3EK4MlZW4g/default.jpg",
					"width": 120,
					"height": 90
				},
				"medium": {
					"url": "https://i.ytimg.com/vi/W3EK4MlZW4g/mqdefault.jpg",
					"width": 320,
					"height": 180
				},
				"high": {
					"url": "https://i.ytimg.com/vi/W3EK4MlZW4g/hqdefault.jpg",
					"width": 480,
					"height": 360
				},
				"standard": {
					"url": "https://i.ytimg.com/vi/W3EK4MlZW4g/sddefault.jpg",
					"width": 640,
					"height": 480
				},
				"maxres": {
					"url": "",
					"width": null,
					"height": null
				}
			},
			"description": "In this Javascript tutorial for beginners, we're going to be using Javascript selectors to access the DOM (document object model) and interact with our webpage in realtime. Selectors allow us to search for elements in the web page, get those html elements, and do things with them.\ \ Selector methods are:\ document.getElementsByTagName('div')\ document.getElementsByClassName('done')\ document.getElementById('my-id')\ document.querySelector('#my-id')\ document.querySelectorAll('.classname')\ \ Once you have selected an html element, you can modify it:\ document.getElementById('my-id').innerHTML = \"new html\"\ document.getElementById('my-id').className = \"newclass otherclass\"\ \ Hopefully you liked this javascript tutorial for beginners with examples (hopefully you like every web development tutorial I crank out)\ As you can see, selectors are powerful in Javascript and even if you're a javascript beginner, you can make any and every change to your web page.",
			"title": "Javascript Selectors - Javascript Tutorial for Beginners With Examples",
			"playlistId": null,
			"channelTitle": null,
			"channelId": "UCVTlvUkGslCV_h-nSAId8Sw",
			"publishedAt": "2015-04-21T15:59:01.000Z",
			"videoId": "W3EK4MlZW4g",
			"id": "UUZQHUkVFzQXUU3Y2iQZTSCVX9Yml5XHN1"
		},
		"__v": 0,
		"modifiers": {},
		"active": true
	}

{% endhighlight %}

You can see that sometimes requests are quite big, it’d be handy if we didn’t need the data, you can simply put `data` in the exclude parameter and then it won’t be returned. You’ll end up with a request thats much smaller in size.

{% highlight html %}

	'http://api.getbraid.io/api/delivery/v1/entries/554b7c7f0f9c288477c26780?exclude=data'

{% endhighlight %}

{% highlight json %}

{
  "_id": "554b7c7f0f9c288477c26780",
  "id": "UUZQHUkVFzQXUU3Y2iQZTSCVX9Yml5XHN1",
  "_braidId": "554a8034dfd1a2521ce4a179",
  "_threadId": "554a818f6eda17d33587e567",
  "service": "youtube",
  "__v": 0,
  "modifiers": {},
  "active": true
}

{% endhighlight %}

Exclude is quite powerful, it’s also possible to exclude nested properties. Going back to the first request it’s possible to exclude the thumbnails in data and still return everything else in the data property. You can do this by using dot notation, similar to how you would access object properties in JavaScript.

{% highlight html %}

	'http://api.getbraid.io/api/delivery/v1/entries/554b7c7f0f9c288477c26780?exclude=data.thumbnails'

{% endhighlight %}

and the request response would look like this

{% highlight json %}

	{
		"_id": "554b7c7f0f9c288477c26780",
		"id": "UUZQHUkVFzQXUU3Y2iQZTSCVX9Yml5XHN1",
		"_braidId": "554a8034dfd1a2521ce4a179",
		"_threadId": "554a818f6eda17d33587e567",
		"service": "youtube",
		"data": {
			"description": "In this Javascript tutorial for beginners, we're going to be using Javascript selectors to access the DOM (document object model) and interact with our webpage in realtime. Selectors allow us to search for elements in the web page, get those html elements, and do things with them.\ \ Selector methods are:\ document.getElementsByTagName('div')\ document.getElementsByClassName('done')\ document.getElementById('my-id')\ document.querySelector('#my-id')\ document.querySelectorAll('.classname')\ \ Once you have selected an html element, you can modify it:\ document.getElementById('my-id').innerHTML = \"new html\"\ document.getElementById('my-id').className = \"newclass otherclass\"\ \ Hopefully you liked this javascript tutorial for beginners with examples (hopefully you like every web development tutorial I crank out)\ As you can see, selectors are powerful in Javascript and even if you're a javascript beginner, you can make any and every change to your web page.",
			"title": "Javascript Selectors - Javascript Tutorial for Beginners With Examples",
			"playlistId": null,
			"channelTitle": null,
			"channelId": "UCVTlvUkGslCV_h-nSAId8Sw",
			"publishedAt": "2015-04-21T15:59:01.000Z",
			"videoId": "W3EK4MlZW4g",
			"id": "UUZQHUkVFzQXUU3Y2iQZTSCVX9Yml5XHN1"
		},
		"__v": 0,
		"modifiers": {},
		"active": true
	}

{% endhighlight %}

you could even exclude thumbnails and the description

{% highlight html %}

	'http://api.getbraid.io/api/delivery/v1/entries/554b7c7f0f9c288477c26780?exclude=data.thumbnails data.description'

{% endhighlight %}

{% highlight json %}

{
  "_id": "554b7c7f0f9c288477c26780",
  "id": "UUZQHUkVFzQXUU3Y2iQZTSCVX9Yml5XHN1",
  "_braidId": "554a8034dfd1a2521ce4a179",
  "_threadId": "554a818f6eda17d33587e567",
  "service": "youtube",
  "data": {
    "title": "Javascript Selectors - Javascript Tutorial for Beginners With Examples",
    "playlistId": null,
    "channelTitle": null,
    "channelId": "UCVTlvUkGslCV_h-nSAId8Sw",
    "publishedAt": "2015-04-21T15:59:01.000Z",
    "videoId": "W3EK4MlZW4g",
    "id": "UUZQHUkVFzQXUU3Y2iQZTSCVX9Yml5XHN1"
  },
  "__v": 0,
  "modifiers": {},
  "active": true
}

{% endhighlight %}

### Populate Parameter

Populate allows you to populate content of certain fields, if they are able to be populated. Populate can be used the same way as exclude. You provide a space separated list and then the request will then include the populated data, for a full list of populatable fields please refer to the populate section for each resource.

Here is a quick example of data that hasn’t been populated and then has been.

{% highlight html %}

	'http://api.getbraid.io/api/delivery/v1/user/demo'

{% endhighlight %}

{% highlight json %}

{
  "_id": "554f9a90efa011ddb52c5d97",
  "username": "demo",
  "__v": 2,
  "modifiers": [
    "554f9b89efa011ddb52c5d9b"
  ],
  "braids": [
    "554f9ac0efa011ddb52c5d99"
  ],
  "verified": false,
  "created": "2015-05-10T17:51:12.335Z",
  "last_logged_in": "2015-05-10T17:51:12.335Z",
  "role": "user"
}

{% endhighlight %}

You can use populate to populate and see what modifiers this user has, without looking up the modifiers directly. It is as simple as the following;

{% highlight html %}

	'http://api.getbraid.io/api/delivery/v1/user/demo?populate=modifiers'

{% endhighlight %}

Then we will recieve a request as follows

{% highlight json %}
{
  "_id": "554f9a90efa011ddb52c5d97",
  "username": "demo",
  "__v": 2,
  "modifiers": [
    {
      "_id": "554f9b89efa011ddb52c5d9b",
      "_userId": "demo",
      "type": "collection",
      "name": "categories",
      "description": "Used to categorise content",
      "modifier_meta": {
        "slug_singular": "category",
        "slug": "categories",
        "terms": []
      },
      "__v": 4,
      "threads": [
        "554fa00ae590c4c8c59e9d81"
      ]
    }
  ],
  "braids": [
    "554f9ac0efa011ddb52c5d99"
  ],
  "verified": false,
  "created": "2015-05-10T17:51:12.335Z",
  "last_logged_in": "2015-05-10T17:51:12.335Z",
  "role": "user"
}
{% endhighlight %}

### Limit && Skip Parameters

The limit and skip parameter, while they can be used on their own. They are much more suited to be used together. The parameters do exactly what they sound like. They allow you to skip and limit how many results are returned from a query. It essentially allows you to paginate through results, but is flexible enough to be decided by the person writing the logic.

These parameters can be used on all requests, to any resource but are really only helpful when querying entries from either a thread or a braid. 

Lets try it out.

{% highlight html %}
	'http://api.getbraid.io/api/delivery/v1/entries/?braidId=554f9ac0efa011ddb52c5d99&exclude=data.thumbnails data.description modifiers&limit=2'
{% endhighlight %}

{% highlight json %}

[
  {
    "_id": "554fa00de590c4c8c59e9d85",
    "id": "UU8YU_w1S4CfFztjI0GitMIC5eTSYPOA0K",
    "_braidId": "554f9ac0efa011ddb52c5d99",
    "_threadId": "554fa00ae590c4c8c59e9d81",
    "service": "youtube",
    "data": {
      "title": "JUMP TV Cultural Invasion: Chinese New Year 2015",
      "playlistId": null,
      "channelTitle": null,
      "channelId": "UCWlyjYJT4f18z6n3PjopdGA",
      "publishedAt": "2015-03-03T15:52:27.000Z",
      "videoId": "rM67STB43ZM",
      "id": "UU8YU_w1S4CfFztjI0GitMIC5eTSYPOA0K"
    },
    "__v": 0,
    "active": true
  },
  {
    "_id": "554fa00de590c4c8c59e9d86",
    "id": "UU8YU_w1S4CfFn4RD1Om5rnybYvdtrayA5",
    "_braidId": "554f9ac0efa011ddb52c5d99",
    "_threadId": "554fa00ae590c4c8c59e9d81",
    "service": "youtube",
    "data": {
      "title": "Jump Music Fix - 13th February",
      "playlistId": null,
      "channelTitle": null,
      "channelId": "UCWlyjYJT4f18z6n3PjopdGA",
      "publishedAt": "2015-02-13T17:53:35.000Z",
      "videoId": "H3hqN5nMcvM",
      "id": "UU8YU_w1S4CfFn4RD1Om5rnybYvdtrayA5"
    },
    "__v": 0,
    "active": true
  }
]

{% endhighlight %}

Here we end up with the result of 2 entries from the queried braid, now we can skip the first one and still limit it. To allow us to grab the second and third entry, instead of the first 2.

You should be able to clearly see that the first result above has been replaced with the second and we also have what appears to be a new entry.


{% highlight html %}
	'http://api.getbraid.io/api/delivery/v1/entries/?braidId=554f9ac0efa011ddb52c5d99&exclude=data.thumbnails data.description modifiers&limit=2&skip=1'
{% endhighlight %}

{% highlight json %}
[
  {
    "_id": "554fa00de590c4c8c59e9d86",
    "id": "UU8YU_w1S4CfFn4RD1Om5rnybYvdtrayA5",
    "_braidId": "554f9ac0efa011ddb52c5d99",
    "_threadId": "554fa00ae590c4c8c59e9d81",
    "service": "youtube",
    "data": {
      "title": "Jump Music Fix - 13th February",
      "playlistId": null,
      "channelTitle": null,
      "channelId": "UCWlyjYJT4f18z6n3PjopdGA",
      "publishedAt": "2015-02-13T17:53:35.000Z",
      "videoId": "H3hqN5nMcvM",
      "id": "UU8YU_w1S4CfFn4RD1Om5rnybYvdtrayA5"
    },
    "__v": 0,
    "active": true
  },
  {
    "_id": "554fa00de590c4c8c59e9d87",
    "id": "UU8YU_w1S4CfErCbmxXqZOakytgH7Xbaow",
    "_braidId": "554f9ac0efa011ddb52c5d99",
    "_threadId": "554fa00ae590c4c8c59e9d81",
    "service": "youtube",
    "data": {
      "title": "Jump TV News Round Up",
      "playlistId": null,
      "channelTitle": null,
      "channelId": "UCWlyjYJT4f18z6n3PjopdGA",
      "publishedAt": "2015-01-28T20:27:46.000Z",
      "videoId": "kfeXWt7Ztl0",
      "id": "UU8YU_w1S4CfErCbmxXqZOakytgH7Xbaow"
    },
    "__v": 0,
    "active": true
  }
]
{% endhighlight %}

## User Resource

{% highlight html %}
	'http://api.getbraid.io/api/delivery/v1/user/:username'
{% endhighlight %}

The user resource provides you with information on what modifiers a user has made and what braids they own. By simply replacing `:username` with a username you know exists (your own one perhaps?). You’ll now be able to see what data is stored by that user.

{% highlight json %}
{
  "_id": "554f9a90efa011ddb52c5d97",
  "username": "demo",
  "__v": 2,
  "modifiers": [
    "554f9b89efa011ddb52c5d9b"
  ],
  "braids": [
    "554f9ac0efa011ddb52c5d99"
  ],
  "verified": false,
  "created": "2015-05-10T17:51:12.335Z",
  "last_logged_in": "2015-05-10T17:51:12.335Z",
  "role": "user"
}
{% endhighlight %}

### Populatable fields

To save manual ‘look ups’ you can include a populate [URL query parameter](#url-parameters) that will automatically look up other resources based on the id. The populatable fields for a user resource are `braids` and `modifiers`. Simply provide it as a query parameter like so;

{% highlight html %}
	'http://api.getbraid.io/api/delivery/v1/user/demo?populate=braids modifiers'
{% endhighlight %}

{% highlight json %}
{
  "_id": "554f9a90efa011ddb52c5d97",
  "username": "demo",
  "__v": 2,
  "modifiers": [
    {
      "_id": "554f9b89efa011ddb52c5d9b",
      "_userId": "demo",
      "type": "collection",
      "name": "categories",
      "description": "Used to categorise content",
      "modifier_meta": {
        "slug_singular": "category",
        "slug": "categories",
        "terms": []
      },
      "__v": 4,
      "threads": [
        "554fa00ae590c4c8c59e9d81"
      ]
    }
  ],
  "braids": [
    {
      "_id": "554f9ac0efa011ddb52c5d99",
      "_userId": "demo",
      "name": "demo braid",
      "description": "A braid used for demos",
      "__v": 5,
      "threads": [
        "554fa00ae590c4c8c59e9d81"
      ],
      "created": "2015-05-10T17:52:00.659Z",
      "last_modified": "2015-05-10T17:52:00.659Z"
    }
  ],
  "verified": false,
  "created": "2015-05-10T17:51:12.335Z",
  "last_logged_in": "2015-05-10T17:51:12.335Z",
  "role": "user"
}
{% endhighlight %}

Now you’ve looked up two additional resource without the need to do it manually. Handy Ay’.

## Braid Resource

{% highlight html %}
	'http://api.getbraid.io/api/delivery/v1/braid/:braid_id'
{% endhighlight %}

A braid is responsible for storing all the threads and incidentally all of the entries contained within those threads. A braid is an entry point for grabbing all the entries from an entire braid, which would result in a mixture of entry types. If you wanted to be able to grab entries from a certain thread have a look at the [entries resource](#entries-resource).

### Query parameters

#### `username`

{% highlight html %}
	'http://api.getbraid.io/api/delivery/v1/braid/?username=:username'
{% endhighlight %}

Besides providing the direct `:braid_id` to a braid resource it's also possible to use a query parameter to request all the braids belonging to a certain user.

### Populatable fields

Braids only have one available populatable field, and that is `threads`. Provide threads as a value for the populate query parameter and you will be supplied with a response that contains the braid details and the data of the threads.

## Thread Resource

{% highlight html %}
	'http://api.getbraid.io/api/delivery/v1/thread/:thread_id'
{% endhighlight %}

Thread resources contain entries from a specified source of data. Currently that would only be YouTube as this is the only API it knows how to scrape at the moment. To request it, you provide the `:thread_id` and you’ll be given the information on that thread including an array of entries that it has a reference too.

### Query Parameters

#### `braidId`

{% highlight html %}
	'http://api.getbraid.io/api/delivery/v1/thread/?braidId=:braid_id'
{% endhighlight %}

Threads can be queried for based on two other resources, one of these is a `braid`.

#### `username`

{% highlight html %}
	'http://api.getbraid.io/api/delivery/v1/thread/?username=:username'
{% endhighlight %}

You can also query a thread based on what user it belongs to through the `username` url parameter.

### Populatable Fields

The only available populatable field for a thread is the `entries`, it will then return every single entry. It’s not really recommended but the option is still there if you wanted. Simply provide entries in the populate query parameter and then wait around as the server does a roundtrip to fetch each entry in the entries array.

## Modifier Resource

{% highlight html %}
	'http://api.getbraid.io/api/delivery/v1/modifier/:modifier_id'
{% endhighlight %}

Modifiers are resources that are based from different pre-determined types. The idea of a modifier is being able to quickly add certain data type to a thread and directly affect the entries that it references. At the moment there is only one modifier type. This modifier type is a collection modifier. This allows you to emulate the ability to add categories or tags and group related entries together.

### Query Parameters

#### ```username```

{% highlight html %}
	'http://api.getbraid.io/api/delivery/v1/modifier?username=:username'
{% endhighlight %}

Just like with both ```braid``` and ```thread``` resources, you can also list all the modifiers a user has by passing the username to the ```username``` query parameter.

### Populatable Fields

The only populatable field that is available for a modifier is ```threads```.

## Entries Resource

{% highlight html %}
	'http://api.getbraid.io/api/delivery/v1/entries/:entry_id'
{% endhighlight %}

Entries are the data that are pulled from the service using whatever username / unique identify that was made when creating the thread. Currently it only works with YouTube so you would provide a channel username. All entries belonging to the thread would have originally been pulled from the channel that you specified.

To request one entry, you simply provide the `entry_id` as show as above.


### Query Parameters

When it comes to finding entries there are quite a few different ways you can query for entries.

#### ```braidId```

{% highlight html %}
	'http://api.getbraid.io/api/delivery/v1/entries/?braidId=:braid_id'
{% endhighlight %}

You can choose to get all the entries from a braid, this means that if you had 3 threads in one braid. You would grab all the entries from each of the threads.

#### ```threadId```

{% highlight html %}
	'http://api.getbraid.io/api/delivery/v1/entries/?threadId=thread_id'
{% endhighlight %}

To limit your entries to just one thread then you can specify a `threadId` instead of a `braidId` to request all the entries from a specific thread.

### Populatable Fields

Entries have no populatable fields, this is due to an entry's structure changing so much. An entry will have a different structure based on the service it is pulled from.

### Find by Modifier

{% highlight html %}
	'http://api.getbraid.io/api/delivery/v1/entries/:modifier_slug/:modifier_term'
{% endhighlight %}

If a thread has had a modifier applied to it then it’s possible to request only the entries that fit that specific modifier. This works well for the collection type modifier. To request entries based on a modifier then you provide `:modifier_slug` with the name of the modifier and replace the `:modifier_term` with a term your looking for.

Because this is so different from other resources I've provided an example below. 

{% highlight html %}
	'http://api.getbraid.io/api/delivery/v1/entries/tags/javascript/?threadId=554a818f6eda17d33587e567&exclude=data.thumbnails'
{% endhighlight %}

You can see that in this request we’re using a little bit of everything. We’re using resource urls and query parameters to find all entries that have a `modifier_slug` called ‘tags’ and that if any have a `modifier_term` matching ‘javascript’ in a specific thread based on the `threadId`.

Lucky for us we managed to find one that did match our term 'javascript'.

{% highlight json %}


{
	"_id": "554b7c7f0f9c288477c26780",
	"id": "UUZQHUkVFzQXUU3Y2iQZTSCVX9Yml5XHN1",
	"_braidId": "554a8034dfd1a2521ce4a179",
	"_threadId": "554a818f6eda17d33587e567",
	"service": "youtube",
	"data": {
		"description": "In this Javascript tutorial for beginners, we're going to be using Javascript selectors to access the DOM (document object model) and interact with our webpage in realtime. Selectors allow us to search for elements in the web page, get those html elements, and do things with them.\ \ Selector methods are:\ document.getElementsByTagName('div')\ document.getElementsByClassName('done')\ document.getElementById('my-id')\ document.querySelector('#my-id')\ document.querySelectorAll('.classname')\ \ Once you have selected an html element, you can modify it:\ document.getElementById('my-id').innerHTML = \"new html\"\ document.getElementById('my-id').className = \"newclass otherclass\"\ \ Hopefully you liked this javascript tutorial for beginners with examples (hopefully you like every web development tutorial I crank out)\ As you can see, selectors are powerful in Javascript and even if you're a javascript beginner, you can make any and every change to your web page.",
		"title": "Javascript Selectors - Javascript Tutorial for Beginners With Examples",
		"playlistId": null,
		"channelTitle": null,
		"channelId": "UCVTlvUkGslCV_h-nSAId8Sw",
		"publishedAt": "2015-04-21T15:59:01.000Z",
		"videoId": "W3EK4MlZW4g",
		"id": "UUZQHUkVFzQXUU3Y2iQZTSCVX9Yml5XHN1"
	},
	"modifiers": {
		"tags": {
		"_modId": "553d63a24e31e84061cf923c",
		"type": "collection",
		"slug": "tags",
		"slug_singular": "tag",
		"terms": [
			"javascript"
			]
		}
	},
	"__v": 0,
	"active": true
}

{% endhighlight %}

## Finished

Thats all there is at the moment for the Braid Delivery API, If you'd like to see it in use then make sure to click [examples]() at the top. If your interesting in how to manage content in Braid then be sure to checkout the [Management API](/management-api.html).
