---
layout: page
title: Showcases
permalink: /showcases/
---

<ul>
{% for showcase in site.data.showcases %}
<div class="col-lg-3 col-md-4 col-sm-6 showcase-index__item">
  <h2><a href="{{ showcase.id }}">{{ showcase.title }}</a></h2>
  <a href="{{ showcase.id }}"><img src="{{ site.baseurl }}/assets/images/showcases/{{ showcase.id }}.png" alt="{{ showcase.title }}" /></a>
  <p>{{ showcase.synopsis }}</p>
  <p><a href="{{ showcase.id }}">Read more</a></p>
</div>
{% endfor %}
</ul>
