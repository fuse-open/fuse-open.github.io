---
layout: page
title: Showcases
permalink: /showcases/
---
There are tens of thousands of developers and designers who use Fuse to
build awesome cross-platform native apps. Here's a small selection of apps
made with Fuse. Want to be featured?
[Let us know!](mailto:fuse-open@googlegroups.com)

<div class="showcases">
<ul>
{% for showcase in site.data.showcases %}
<li>
  <h2><a href="{{ showcase.id }}">{{ showcase.title }}</a></h2>
  <a href="{{ showcase.id }}"><img src="{{ site.baseurl }}/assets/images/showcases/{{ showcase.id }}.png" alt="{{ showcase.title }}" /></a>
  <p>{{ showcase.synopsis }}</p>
  <p><a href="{{ showcase.id }}">Read more</a></p>
</li>
{% endfor %}
</ul>
</div>
