---
title: Chad's Blog
---
## Welcome to my blog!

### Posts
{% for post in site.posts %}
    {% if post.category != "woodworking" %}
* [{{post.title}}]({{site.baseurl}}{{post.permalink}})
    {% endif %}
{% endfor %}

### Woodworking
{% for post in site.posts %}
    {% if post.category == "woodworking" %}
* [{{post.title}}]({{site.baseurl}}{{post.permalink}})
    {% endif %}
{% endfor %}