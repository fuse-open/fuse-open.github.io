---
layout: page
title: All Examples
permalink: /examples/
---
<div class="examples row">
  {% for example in site.examples reversed %}
  <div class="col-6 col-lg-4 col-md-6 col-lg-3 pb-5">
    <h4><a href="{{ example.url }}">{{ example.title }}</a></h4>

    {% if example.preview-image %}
    <div class="bg-secondary p-3">
      <a href="{{ example.url }}">
        <img class="mw-100" src="{{ site.baseurl }}/assets/images/examples/{{ example.preview-image }}" alt="{{ example.title }}" />
      </a>
    </div>
    {% endif %}

    <p>{{ example.synopsis }}</p>
    <p><a href="{{ example.url }}">Read full example</a></p>
  </div>
  {% endfor %}
</div>
