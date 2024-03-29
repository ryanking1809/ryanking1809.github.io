# pjax

            .--.
           /    \
          ## a  a
          (   '._)
           |'-- |
         _.\___/_   ___pjax___
       ."\> \Y/|<'.  '._.-'
      /  \ \_\/ /  '-' /
      | --'\_/|/ |   _/
      |___.-' |  |`'`
        |     |  |
        |    / './
       /__./` | |
          \   | |
           \  | |
           ;  | |
           /  | |
     jgs  |___\_.\_
          `-"--'---'

## pjax = pushState + ajax

pjax is a jQuery plugin that uses ajax and pushState to deliver a fast browsing experience with real permalinks, page titles, and a working back button.

pjax works by grabbing html from your server via ajax and replacing the content of a container on your page with the ajax'd html. It then updates the browser's current url using pushState without reloading your page's layout or any resources (js, css), giving the appearance of a fast, full page load. But really it's just ajax and pushState.

For [browsers that don't support pushState][compat] pjax fully degrades.

## Overview

pjax is not fully automatic. You'll need to setup and designate a containing element on your page that will be replaced when you navigate your site.

Consider the following page.

```html
<!DOCTYPE html>
<html>
	<head>
		<!-- styles, scripts, etc -->
	</head>
	<body>
		<h1>My Site</h1>
		<div class="container" id="pjax-container">
			Go to <a href="/page/2">next page</a>.
		</div>
	</body>
</html>
```

We want pjax to grab the url `/page/2` then replace `#pjax-container` with whatever it gets back. No styles or scripts will be reloaded and even the h1 can stay the same - we just want to change the `#pjax-container` element.

We do this by telling pjax to listen on `a` tags and use `#pjax-container` as the target container:

```javascript
$(document).pjax("a", "#pjax-container");
```

Now when someone in a pjax-compatible browser clicks "next page" the content of `#pjax-container` will be replaced with the body of `/page/2`.

Magic! Almost. You still need to configure your server to look for pjax requests and send back pjax-specific content.

The pjax ajax request sends an `X-PJAX` header so in this example (and in most cases) we want to return just the content of the page without any layout for any requests with that header.

Here's what it might look like in Rails:

```ruby
def index
  if request.headers['X-PJAX']
    render :layout => false
  end
end
```

If you'd like a more automatic solution than pjax for Rails check out [Turbolinks](https://github.com/rails/turbolinks).

Also check out [RailsCasts #294 : Playing with PJAX](https://railscasts.com/episodes/294-playing-with-pjax)

## Installation

### bower

Via [bower](https://github.com/twitter/bower).

```
$ bower install jquery-pjax
```

Or add `jquery-pjax` to your apps `bower.json`.

```json
  "dependencies": {
    "jquery-pjax": "latest"
  }
```

### standalone

pjax can be downloaded directly into your app's public directory - just be sure you've loaded jQuery first.

```
curl -O https://raw.github.com/defunkt/jquery-pjax/master/jquery.pjax.js
```

**WARNING** Do not hotlink the raw script url. GitHub is not a CDN.

## Dependencies

Requires jQuery 1.8.x or higher.

## Compatibility

pjax only works with [browsers that support the `history.pushState` API][compat]. When the API isn't supported pjax goes into fallback mode: `$.fn.pjax` calls will be a no-op and `$.pjax` will hard load the given url. This mode targets the browser requirements of the jQuery version being used.

For debugging purposes, you can intentionally disable pjax even if the browser supports `pushState`. Just call `$.pjax.disable()`. To see if pjax is actually supports `pushState`, check `$.support.pjax`.

## Usage

### `$.fn.pjax`

Let's talk more about the most basic way to get started:

```javascript
$(document).pjax("a", "#pjax-container");
```

This will enable pjax on all links and designate the container as `#pjax-container`.

If you are migrating an existing site you probably don't want to enable pjax everywhere just yet. Instead of using a global selector like `a` try annotating pjaxable links with `data-pjax`, then use `'a[data-pjax]'` as your selector.

Or try this selector that matches any `<a data-pjax href=>` links inside a `<div data-pjax>` container.

```javascript
$(document).pjax("[data-pjax] a, a[data-pjax]", "#pjax-container");
```

When invoking `$.fn.pjax` there are a few different argument styles you can use:

1. `$(document).pjax(delegation selector, options object)`
2. `$(document).pjax(delegation selector, container selector, options object)`

In other words:

1. The first argument must always be a `String` selector used for delegation.
2. The second argument can either be a `String` container selector or an options object.
3. If there are three arguments the second must be the `String` container selector and the third must be the options object.

### `$.pjax.click`

This is a lower level function used by `$.fn.pjax` itself. It allows you to get a little more control over the pjax event handling.

This example uses the current click context to set an ancestor as the container:

```javascript
if ($.support.pjax) {
	$(document).on("click", "a[data-pjax]", function (event) {
		var container = $(this).closest("[data-pjax-container]");
		$.pjax.click(event, { container: container });
	});
}
```

**NOTE** Use the explicit `$.support.pjax` guard. We aren't using `$.fn.pjax` so we should avoid binding this event handler unless the browser is actually going to use pjax.

### `$.pjax.submit`

Submits a form via pjax. This function is experimental but GitHub uses it on [Gist][gist] so give it a shot!

```javascript
$(document).on("submit", "form[data-pjax]", function (event) {
	$.pjax.submit(event, "#pjax-container");
});
```

### `$.pjax`

Manual pjax invocation. Used mainly when you want to start a pjax request in a handler that didn't originate from a click. If you can get access to a click `event`, consider `$.pjax.click(event)` instead.

```javascript
function applyFilters() {
	var url = urlForFilters();
	$.pjax({ url: url, container: "#pjax-container" });
}
```

### Events

pjax fires a number of events regardless of how its invoked.

All events are fired from the container, not the link was clicked.

#### start and end

-   `pjax:start` - Fired when pjaxing begins.
-   `pjax:end` - Fired when pjaxing ends.
-   `pjax:click` - Fired when pjaxified link is clicked.

This pair events fire anytime a pjax request starts and finishes. This includes pjaxing on `popstate` and when pages are loaded from cache instead of making a request.

#### ajax related

-   `pjax:beforeSend` - Fired before the pjax request begins. Returning false will abort the request.
-   `pjax:send` - Fired after the pjax request begins.
-   `pjax:complete` - Fired after the pjax request finishes.
-   `pjax:success` - Fired after the pjax request succeeds.
-   `pjax:error` - Fired after the pjax request fails. Returning false will prevent the the fallback redirect.
-   `pjax:timeout` - Fired if after timeout is reached. Returning false will disable the fallback and will wait indefinitely until the response returns.

`send` and `complete` are a good pair of events to use if you are implementing a loading indicator. They'll only be triggered if an actual request is made, not if it's loaded from cache.

```javascript
$(document).on("pjax:send", function () {
	$("#loading").show();
});
$(document).on("pjax:complete", function () {
	$("#loading").hide();
});
```

Another protip: disable the fallback timeout behavior if a spinner is being shown.

```javascript
$(document).on("pjax:timeout", function (event) {
	// Prevent default timeout redirection behavior
	event.preventDefault();
});
```

### Server side

Server configuration will vary between languages and frameworks. The following example shows how you might configure Rails.

```ruby
def index
  if request.headers['X-PJAX']
    render :layout => false
  end
end
```

An `X-PJAX` request header is set to differentiate a pjax request from normal XHR requests. In this case, if the request is pjax, we skip the layout html and just render the inner contents of the container.

Check if your favorite server framework supports pjax here: https://gist.github.com/4283721

#### Layout Reloading

Layouts can be forced to do a hard reload assets or html changes.

First set the initial layout version in your header with a custom meta tag.

```html
<meta http-equiv="x-pjax-version" content="v123" />
```

Then from the server side, set the `X-PJAX-Version` header to the same.

```ruby
if request.headers['X-PJAX']
  response.headers['X-PJAX-Version'] = "v123"
end
```

Deploying a deploy, bumping the version constant to force clients to do a full reload the next request getting the new layout and assets.

### Legacy API

Pre 1.0 versions used an older style syntax that was analogous to the now deprecated `$.fn.live` api. The current api is based off `$.fn.on`.

```javascript
$("a[data-pjax]").pjax("#pjax-container");
```

Expanded to

```javascript
$("a[data-pjax]").live("click", function (event) {
	$.pjax.click(event, "#pjax-container");
});
```

The new api

```javascript
$(document).pjax("a[data-pjax]", "#pjax-container");
```

Which is roughly the same as

```javascript
$(document).on("click", "a[data-pjax]", function (event) {
	$.pjax.click(event, "#pjax-container");
});
```

**NOTE** The new api gives you control over the delegated element container. `$.fn.live` always bound to `document`. This is what you still want to do most of the time.

## Contributing

```
$ git clone https://github.com/defunkt/jquery-pjax.git
$ cd jquery-pjax/
```

To run the test suite locally, start up the Sinatra test application.

```
$ ruby test/app.rb
== Sinatra/1.3.2 has taken the stage on 4567 for development with backup from WEBrick

$ open https://localhost:4567/
```

[compat]: https://caniuse.com/#search=pushstate
[gist]: https://gist.github.com/
