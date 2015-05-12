---
layout: default
---

## Introduction - Management API

Welcome to the braid documentation. The first part of the docs will explain to you how to use the Management API, the resources that are available to you and the type of requests you can make to manage content.

### Getting Started

To starting using the API, all your requests must be based on the following url, if you don't include the base url, you'll be faced with a 404 error status.

{% highlight html %}

	'http://getbraid.io/api/management/v1/:resource/:resource_id'

{% endhighlight %}

Anything after that will be a resource, to see what resources are available and what you can do with them please continue further down into the documentation. They typically follow a pattern of the resource and a resource ID, if you have it. This will allow you to edit or delete the exact entry.

### Making Requests

In order to make requests, you must first have a user account and know it's username and password. Every route and resource is authenticated via Basic Auth and your username and password is needed on every request to the management API. If you simply want to query data then please use the [Delivery API](/), it was made for that very reason and doesn't require any authentication to use.

Once your request is authenticated it is checked to see if you are authorized for the action you are trying to perform. If you are not authorized to perform that action then you shall recieve a 403 forbidden.

As a quick example you couldn't delete another person's braid, only your own. The only way you could do that is if you were an admin, becuase they are authorized.

The API accepts request types of `POST` `PUT` and `DELETE`. To see what you can do on each resource please, refer to documentation further down the page.

### Available Resources

The Management API provides you with the ability to request using the above HTTP Verbs to 5 types of resources, these are as follows.

- [user](#user-resource)
- [braid](#braid-resource)
- [thread](#thread-resource)
- [modifier](#modifier-resource)
- [entries](#entries-resource)

## CRUD Operations

### Post & Update

When performing basic CRUD operations, the API accepts a two type of data encoding, these are `x-www-form-urlencoded` and raw json or `application/json`. To make sure the server knows what to do, please make sure that you send over request headers with a content-type that matches either one.

When a `POST` or `PUT` request is successful, the response is the new resource that you just requested to edit.

### Delete

When deleting a resource, the resource is never returned instead a response message is sent telling you that it was successfuly deleted.

For a complete breakdown of what each resource expects from a request please refer to the approprite resources documentation. This is further down the page.

## User Resource

A User resource is what is needed to create braids and other resource. Because you need to authenticate on every route a user `POST` requests to a user resource is actually un-authenticated. 

To make sure people don't mess around too much an email is sent to the email address and asked to verify it. if not the system will clean up any accounts and delete accounts that haven't been verified after a set amount of time.

### POST

{% highlight html %}

	POST 'http://getbraid.io/api/management/v1/user'

{% endhighlight %}

When creating a new user, there are set fields that are required in order to succesfully make a new user. They are as following;

- username
- email
- firstName
- lastName
- password

As an example of a request lets submit a post request using javascript. For brevity lets assume you have an ajax library of choice. I'm going to use superagent.

{% highlight javascript %}

//set up our data
var data = {
	username: 'catlover72',
	email: 'toby@example.com',
	firstName: 'Toby',
	lastName: 'Jenkins',
	password: 'ireallylovecats'
}

request
.post('/user')
.set('Content-Type','application/json')
.send(data)
.end(callback);


{% endhighlight %}

If all is successful you should end up with a response that looks like the following, that user now exists within braid and you can use that to start creating braids and doing all the cool things it lets you do. However you don't have to create a user this way you can just use the signup form at [getbraid.io](http://getbraid.io).

{% highlight json %}
{
  "firstName": "Toby",
  "lastName": "Jenkins",
  "email": "toby@example.com",
  "username": "catlover72",
  "modifiers": [],
  "braids": [],
  "verified": false,
  "created": "2015-05-06T20:23:58.003Z",
  "last_logged_in": "2015-05-06T20:23:58.003Z",
  "role": "user"
}
{% endhighlight %}

### UPDATE

{% highlight html %}

	PUT 'http://getbraid.io/api/management/v1/user/:username'

{% endhighlight %}

Update is very similar to POST, you can easily just update only the selected properties, through just using a json object like before.

Toby got married and has decided to take his partners surname. Lets update it.

{% highlight javascript %}

//set up our data
var data = {
	lastName: 'catistinia',
}

request
.put('/user/catlover72')
.set('Content-Type','application/json')
.auth('catlover72','ireallylovecats')
.send(data)
.end(callback);

//or

request
.put('/user/catlover72')
.set('Content-Type','application/json')
.auth('catlover72','ireallylovecats')
.send({ lastName: 'catistinia'})
.end(callback);

{% endhighlight %}

You can see it's super easy to update certain parts. It's reccomended you don't try and update threads or braids. They will automatically be updated when you post to those resources and if you do it might mess with things.

### DELETE

{% highlight html %}

	DELETE 'http://getbraid.io/api/management/v1/user/:username'

{% endhighlight %}

To `DELETE` a resource you need to target it with it's unique identify, in most resources that would be `_id` for a user the unique value is the `username`

To delete toby, or catlover72 we would send the following request.

{% highlight javascript %}

request
.del('/user/catlover72')
.set('Content-Type','application/json')
.auth('catlover72','ireallylovecats')
.send()
.end(callback);

{% endhighlight %}

And just like that poof, catlover72 is gone.

{% highlight json %}
	"User: catlover72 has been removed"
{% endhighlight %}

## Braid Resource

A braid resource is what you use to expose threads of content, a braid is a handy way of grouping related threads of content together from different places but allow you to tie it all in and expose at one point.

A braid doesn't need much to be made, jsut a name and a description.

### POST

{% highlight html %}

	POST 'http://getbraid.io/api/management/v1/braid'

{% endhighlight %}

When making a braid the required fields and data is as follows;

- name
- description

Thats all you need to make a braid, just make sure your authenticated, or else you'll just keep getting 401 unauthorized error.

{% highlight javascript %}

//set up data
var data = {
	name: 'Cat Braid',
	description: 'A braid dedicated to all things cats'
}

request
.post('/braid')
.set('Content-Type','application/json')
.auth('catlover72','ireallylovecats')
.send(data)
.end(callback);

{% endhighlight %}

and the response should look like this

{% highlight json %}
{
  "_id": "554a8034dfd1a2521ce4a179",
  "_userId": "catlover72",
  "name": "Cat Braid",
  "description": "A braid dedicated to all things cats",
  "threads": [],
  "created": "2015-05-06T20:57:24.801Z",
  "last_modified": "2015-05-06T20:57:24.801Z"
}
{% endhighlight %}

### Update

{% highlight html %}

	PUT 'http://getbraid.io/api/management/v1/braid/:braid_id'

{% endhighlight %}

When updating a braid it is really only needed if you want to change the name or description of it to make it more recognisable or realted to the content it contains. Don't update the threads, the system will do that when you create a new thread.

### Delete

{% highlight html %}

	DELETE 'http://getbraid.io/api/management/v1/braid/:braid_id'

{% endhighlight %}

Deleting a braid is just like deleting any other resource, simply provide it's unique identifier and use a `DELETE` request to that endpoint and it will simply disapear. If the braid has any threads in it, they will also be deleted.

## Thread Resource

Threads are set up using a specific service. When you specify a source of content for a thread it will then periodically scrape it keeping upto date with any of the content that is added to that source.

### POST

{% highlight html %}

	POST 'http://getbraid.io/api/management/v1/thread/?braidId=:braid_id'

{% endhighlight %}

When creating a braid resource, the folowing fields / details are needed;

- name
- description
- service
- username / unique identifier
- braidId (query parameter)

The username / unique identifier is dependant upon what service being used. Since braid only works with youtube at the moment, all that is required is a channel username, then all public videos will be pulled into the braid, where they can then be further edited and modified using [modifiers](#modifier-resource).

When a thread is made it must also be assigned to a braid to do that provide a `braidId` as a query parameter

To make it clear, lets make one.

{% highlight javascript %}
//set up data

var data = {
	name: 'Simon the Cat',
	description: 'All the public videos from the simon the cats youtube channel',
	service: 'youtube',
	username: 'simonthecat'
}

request
.post('/thread?braidId=554a8034dfd1a2521ce4a179')
.set('Content-Type','application/json')
.auth('catlover72','ireallylovecats')
.send(data)
.end(callback);

{% endhighlight %}

If sucessful, you should end up with a request that looks like the following.

{% highlight json %}
{
  "message": "Thread successfully added to braid, references have been added",
  "braid": {
    "_id": "554a8034dfd1a2521ce4a179",
    "_userId": "catlover72",
    "name": "Cat Braid",
    "description": "A braid dedicated to all things cats",
    "threads": [
      "554a818f6eda17d33587e567"
    ],
    "created": "2015-05-06T20:57:24.801Z",
    "last_modified": "2015-05-06T20:57:24.801Z"
  },
  "thread": {
    "_id": "554a818f6eda17d33587e567",
    "_braidId": "554a8034dfd1a2521ce4a179",
    "_userId": "catlover72",
    "service": "youtube",
    "name": "Simon the Cat",
    "description": "All the public videos from the simon the cats youtube channel",
    "service_meta": {
      "channel_username": "simonthecat"
    },
    "__v": 0,
    "modifiers": [],
    "entries": [],
    "last_checked": "2015-05-11T17:13:26.402Z",
    "poll_time": 15,
    "active": true
  }
}
{% endhighlight %}

You can see that the system has done quite a bit of work for you and that the braid now has the thread id that you just created in the threads property.

You can also see the thread has the `_braidId` equal to the braidId we added when creating the resource.

### UPDATE

{% highlight html %}

	PUT 'http://getbraid.io/api/management/v1/thread/:thread_id'

{% endhighlight %}

It's possible to update threads, when you do, it's reccomended you only update, the name or description. if you want to change the source of content. Then please `delete` the thread and then create a new one, with the correct username for the channel you wish to pull data from.

### DELETE

{% highlight html %}

	DELETE 'http://getbraid.io/api/management/v1/thread/:thread_id'

{% endhighlight %}

To delete a thread, simply provide it's `_id` and hit the API endpoint. The system will take care of the rest. That includes removing the reference from the braid and deleting any entries it had scraped from the source.

## Modifier Resource

Modifiers are applied to threads. The system will loop through every entry in the thread you've attached a modifier to and then attach the modifier to the entries. To do this there is an additional API endpoint to hit that will help with this.

Currently there is only one type of modifier, it is know as a collection type modifier and allows you to group simiilar entries in a thread together.

The same modifier can be applied to multiple threads.

### POST

{% highlight html %}

	POST 'http://getbraid.io/api/management/v1/modifier'

{% endhighlight %}

When creating a modifier there are certain required fields to make one. They are as follows;

- name
- description
- type
- slug
- slug_plural

The type and slug are important because later on, these are used in the [Delivery API](/) to allow you to query entries based on the slug and any terms you have added.

To make it easier, lets make a modifier for catlover72

{% highlight javascript %}
//set up data

var data = {
	name: 'tags',
	description: 'Allow to group entries based on similar terms',
	type: 'collection',
	slug: 'tags',
	slug_plural: 'tag'
}

request
.post('/modifier')
.set('Content-Type','application/json')
.auth('catlover72','ireallylovecats')
.send(data)
.end(callback);

{% endhighlight %}

If all is correct then you should see a response similar to the following.

{% highlight json %}

{
  "_id": "553d63a24e31e84061cf923c",
  "_userId": "catlover72",
  "type": "collection",
  "name": "tags",
  "description": "Allow to group entries based on similar terms",
  "modifier_meta": {
    "slug_singular": "tag",
    "slug": "tags",
    "terms": []
  },
  "threads": [],
  "__v": 0
}

{% endhighlight %}

## UPDATE

{% highlight html %}

	PUT 'http://getbraid.io/api/management/v1/modifier/:modifier_id'

{% endhighlight %}

To update a modifier, then simply send the required changes to the API endpoint above. This is really only useful for updating the name and description. 

If you're trying to change the type of modifier or change the slug then it's best to delete it and then make a new one.

If you're trying to add new terms to a collection type modifier. It's best to update an entry within a thread that has had that modifier applied to it. This is because when the terms for a specific entry are updated, the term is also added to the related modifier automatically. See [entries](#entries-resource) for more info.

## Attach a Modifier

{% highlight html %}

	PUT 'http://getbraid.io/api/management/v1/attach/modifier/:modifier_id/to/thread/:thread_id'

{% endhighlight %}

When you want to attach a modifier to a thread, use this url. Replace the id's with the desired id's and then the system will then add refrences to each resource automatically. The system will also apply the correct modifer meta data to the modifiers property of each entry in the thread.

To make it clearer here is an example.

{% highlight javascript %}

request
.put('/attach/modifer/553d63a24e31e84061cf923c/to/thread/554a818f6eda17d33587e567')
.set('Content-Type','application/json')
.auth('catlover72','ireallylovecats')
.send(data)
.end(callback);

{% endhighlight %}

You should then get a response like so

{% highlight json %}
{
  "message": "Modifier has been sucessfully attached to the thread",
  "modifier": {
    "_id": "553d63a24e31e84061cf923c",
    "_userId": "catlover72",
    "type": "collection",
    "name": "tags",
    "description": "Allow to group entries based on similar terms",
    "modifier_meta": {
      "slug_singular": "tag",
      "slug": "tags",
      "terms": []
    },
    "__v": 220,
    "threads": [
      "554a818f6eda17d33587e567"
    ]
  },
  "thread": {
    "_id": "554a818f6eda17d33587e567",
    "_braidId": "554a8034dfd1a2521ce4a179",
    "_userId": "catlover72",
    "service": "youtube",
    "name": "Simon the Cat",
    "description": "All the public videos from the simon the cats youtube channel",
    "service_meta": {
      "channel_username": "simonthecat"
    },
    "__v": 0,
    "modifiers": ["553d63a24e31e84061cf923c"],
    "entries": ["..."],
    "last_checked": "2015-05-11T17:13:26.402Z",
    "poll_time": 15,
    "active": true
  }
}
{% endhighlight %}

### Remove a Modifier

{% highlight html %}

	PUT 'http://getbraid.io/api/management/v1/remove/modifier/:modifier_id/from/thread/:thread_id'

{% endhighlight %}

You also have the ability to remove a modifer from a thread, in a similar way to how you attach one. Once this is run, the system will automatically loop through the entries and remove the modifier from them, leaving no trace that a modifier had even been applied to them in the first place.

### DELETE

{% highlight html %}

	DELETE 'http://getbraid.io/api/management/v1/modifier/:modifier_id'

{% endhighlight %}

Just like the deleting of all resource, simply provide the resources exact `_id` as a request parameter and it will be automatically remove from the system.

## Entries Resource

An entry varies in the data that it has, the system tries it's best to put the data in the most standard format possible, to make it easier to access common data properties.

An entry is created based on the service it was pulled from and is automatically filled with the data scraped from the source.

### POST

You don't create an entry it's automatically made by the system when a thread is created and a source of content is successfully added.

### UPDATE

{% highlight html %}

	PUT 'http://getbraid.io/api/management/v1/entries/entry_id'

{% endhighlight %}

To update an entry it follows the same specification as all the other update routes. The difference is that when you update an entry you're normally trying to update the part where you applied the modifier. 

To do that you need to make sure you select the following properties to update, since only one modifier type exists at the moment. You would want to update the terms of a collection type. You'd need to update the following.

- modifier_slug
- modifier_term

Here is an example

{% highlight javascript %}
//set up data

var data = {
	modifier_slug: 'tags',
	modifier_term: 'fluffy'
}

request
.put('/entries/554b7c7f0f9c288477c26780')
.set('Content-Type','application/json')
.auth('catlover72','ireallylovecats')
.send(data)
.end(callback);

{% endhighlight %}

and then you'd end up with a response similar to this

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
    "title": "Javascript Selectors - Javascript Tutorial for Beginners With Examples",
    "playlistId": null,
    "channelTitle": null,
    "channelId": "UCVTlvUkGslCV_h-nSAId8Sw",
    "publishedAt": "2015-04-21T15:59:01.000Z",
    "videoId": "W3EK4MlZW4g",
    "id": "UUZQHUkVFzQXUU3Y2iQZTSCVX9Yml5XHN1"
  },
  "__v": 0,
  "modifiers": {
    "tags": {
      "terms": [],
      "slug_singular": "tag",
      "slug": "tags",
      "type": "collection",
      "_modId": "553d63a24e31e84061cf923c"
    }
  },
  "active": true
}
{% endhighlight %}

### DELETE

There isn't really a proper way to delete an entry since if you did, it would simply, get re-added on the next scrape by the system. 

To stop an entry from appearing in results, there is a handy active property, if you set that to false, then only entries that have active set to true can be returned.

## Finished

Thank you for reading the documentation for the Management API, I really hope it's useful. if you were wondering how to `GET` data then please refer to the [Delivery API](/). 

If you like the looks of braid and want to try it out then feel free to head over to [getbraid.io](http://getbraid.io) and signup. 

If you want to see it doing its magic then please check out the [example](#).
