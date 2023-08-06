---
layout: page
title: Hackintosh
permalink: /hackintosh/
---

This section contains all the post related to Mac category

<p>Posts in category "Mac" are:</p>

<ul>
  {% for post in site.categories.mac %}
    {% if post.url %}
        <li><a href="{{ post.url }}">{{ post.title }}</a></li>
    {% endif %}
  {% endfor %}
</ul>