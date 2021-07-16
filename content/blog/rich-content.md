---
author: "Hugo Authors"
title: "Rich Content"
date: 2021-04-24
description: "A brief description of Hugo Shortcodes"
tags: ["shortcodes", "privacy"]
---

Hugo ships with several [Built-in Shortcodes](https://gohugo.io/content-management/shortcodes/#use-hugos-built-in-shortcodes) for rich content, along with a [Privacy Config](https://gohugo.io/about/hugo-and-gdpr/) and a set of Simple Shortcodes that enable static and no-JS versions of various social media embeds.

## <!--more-->

## YouTube Privacy Enhanced Shortcode

{{< youtube crE_O7JVHjk >}}

----gist----
{{< gist spf13 7896402 >}}

{{< codepen MWmJaPw >}}
{{< codepen NWjpdpz >}}
{{< codepen BaaBage >}}
<br>

---

## Twitter Simple Shortcode

<br>

---
{{< highlight text >}}
<section id="main">
  <div>
   <h1 id="title">{{ .Title }}</h1>
    {{ range .Pages }}
        {{ .Render "summary"}}
    {{ end }}
  </div>
</section>
{{< /highlight >}}

