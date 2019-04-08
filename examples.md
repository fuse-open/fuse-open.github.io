---
layout: page
title: All Examples
permalink: /examples/
---

<input id="searchInput" class="form-control form-control-lg mb-4" type="text" placeholder="Search" aria-label="Search" aria-describedby="basic-addon1">

<div class="examples row">
  {% assign examples = site.examples | reverse %}
  {% for example in examples %}
  <div data-id="{{ example.id | split: "/" | last }}" class="example col-6 col-lg-4 col-md-6 col-lg-3 pb-5">
    <h4><a href="{{ example.url }}">{{ example.title }}</a></h4>

    {% if example.preview-image %}
    <div class="bg-secondary p-3 mb-3">
      <a href="{{ example.url }}">
        <img class="mw-100" src="{{ site.baseurl }}/assets/images/examples/{{ example.preview-image }}" alt="{{ example.title }}" />
      </a>
    </div>
    {% endif %}

    <p>{{ example.synopsis }}</p>
    <p><a href="{{ example.url }}">View full example</a></p>
  </div>
  {% endfor %}

  <!-- Not related in any way to Fuse Opens FuseJS btw -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/fuse.js/3.4.4/fuse.min.js"></script>
  <script type="text/javascript">
  $(function() {

    //build the data list to search
    var list = [
    {% for example in examples %}
      {
        id: {{ example.id | split: "/" | last | jsonify }},
        title: {{ example.title | jsonify }},
        date: {{ example.date | jsonify }},
        tags: {{ example.tags | jsonify | join: ',' }},
        uxConcepts: {{ example.uxConcepts | jsonify | join: ',' }},
        jsConcepts: {{ example.jsConcepts | jsonify | join: ',' }}
      }{% if forloop.last == false %},{% endif %}
    {% endfor %}
    ];

    //setup search options
    var options = {
      shouldSort: true,
      includeScore: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: [
        "id",
        "title",
        "date",
        "tags",
        "uxConcepts",
        "jsConcepts",
      ]
    };

    var fuse = new Fuse(list, options);
    var result = [];
    var i = 0;
    var searchInput = $('#searchInput');
    searchInput.keyup(function(e) {

      //by default, display in original order
      if (searchInput.val() == '') {

        //reorder examples
        for (i = list.length-1; i >= 0; i--) {
          $(".examples").prepend($(".example[data-id='" + list[i].id + "']"));
        }

        //show all examples
        $('.example').show();
      } else {
        //hide all examples
        $('.example').hide();

        //get examples search results
        results = fuse.search(searchInput.val());

        //reorder based on results
        for (i = results.length-1; i >= 0; i--) {
          $(".examples").prepend($(".example[data-id='" + results[i].item.id + "']"));
          $(".example[data-id='" + results[i].item.id + "']").show();
        }
      }
    });
  });
  </script>
</div>
