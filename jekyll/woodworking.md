---
title: Woodworking
---
# Woodworking

{% for post in site.posts %}
    {% if post.category == "woodworking" %}
* [{{post.title}}]({{site.baseurl}}{{post.permalink}})
    {% endif %}
{% endfor %}