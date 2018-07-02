---
layout: page
title: Logo Contest
permalink: /logo-contest/
---

After Fuse 1.9, the Fuse Open project will need a new logo and/or logomark that
new icon-sets can be based on, to avoid confusion with Fusetools and future
Fusetools projects.

We've decided to involve the community, as it has a lot of creative people who
are great at exactly this kind of thing, and a quick survey of our Slack
group showed great interest in it. This page has all the info you need to
contribute and submit.

## Guidelines:
- Entries should to be visually distinct from the current ["fat-comma" logo](https://mms.businesswire.com/media/20170124005067/en/565461/2/Fuse_logo_Black.jpg).
- It should be possible to create a visually clear icon from the logo, even in
  small resolutions (even 16x16 pixels).
- The logo must work in square (ex: icons) as well as wide (ex: website) formats.
- The logo must be available under the
  [CC BY 4.0 license](https://creativecommons.org/licenses/by/4.0/).
- The logo cannot contain fonts that require a license. This means that either
  only license-free fonts may be used, or the font needs to be properly licensed,
  and converted to outlines (or rasterized) before distribution.
- Entries that are obviously jokes, or of offending nature, will not be
  accepted.
- Optional: The logo should spell "Fuse Open".
- Optional: It's very nice if the logo is easy to adopt to spell "Fuse Studio"
  as well.
- Optional: [SVG](https://en.wikipedia.org/wiki/Scalable_Vector_Graphics) fonts
  are preferred, as they are easier to rescale.

## How to enter

<div class="alert alert-warning" role="alert">
  We're currently past the submission deadline, so no more submissions will be
  accepted.
</div>

### By E-Mail

You can submit your logo simply by e-mailing it to
[our mailing list](mailto:fuse-open@googlegroups.com). Please prefix the
subject of the e-mail with "[logo-contest]" to make submissions easy to
filter.

### Via Pull-Request

Alternatively, if you want to ease our burden a bit, you can also submit by
sending a pull-request to the
[GitHub repository](https://github.com/fuse-open/fuse-open.github.io) for our
website.

If so, add your logo to the [`assets/images/logo-contest/`-subdirectory](https://github.com/fuse-open/fuse-open.github.io/tree/master/assets/images/logo-contest/),
and add your entry to [`_data/logo-contest.yml`](https://github.com/fuse-open/fuse-open.github.io/blob/master/_data/logo-contest.yml),
in the following format:

```
- file: filename.png
  author: John Doe
  email: john.doe@example.com
```

You can see an example-submission [here](https://github.com/kusma/fuse-open.github.io/compare/logo-contest...example-submission).

## Deadline

The deadline is Sunday 1st of July 2018. Please submit your entries before
then.

## Submissions

{% if site.data.logo-contest %}
<table class="table table-striped">
  <thead>
    <tr>
      <th>Logo</th>
      <th>Author</th>
    </tr>
  </thead>
  <tbody>
{% for logo in site.data.logo-contest %}
    <tr>
      <td><a href="{{ site.baseurl }}/assets/images/logo-contest/{{ logo.file }}"><img class="img-fluid" src="{{ site.baseurl }}/assets/images/logo-contest/{{ logo.file }}" alt="Logo by {{ logo.author }}" style="max-height: 300px" /></a></td>
      <td><span style="white-space:nowrap"><a href="mailto:{{ logo.email }}">{{ logo.author }}</a></span></td>
    </tr>
{% endfor %}
  </tbody>
</table>
{% else %}

There's no sumbissions yet :(

Want to be the first?

{% endif %}
