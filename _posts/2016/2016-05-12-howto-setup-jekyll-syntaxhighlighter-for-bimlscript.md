---
layout: post
title:  "Howto setup Jekyll SyntaxHighlighter for BimlScript"
date:   2016-05-12 22:02:26 +02:00
categories: syntaxhightlighter bimlscript
comments: false
---

In this post I am going to explain howto setup 
[SyntaxHighlighter](http://alexgorbatchev.com/SyntaxHighlighter/) on a 
[Jekyll](http://jekyllrb.com) blog (for the purpose of writing about 
[Biml](https://en.wikipedia.org/wiki/Business_Intelligence_Markup_Language)Script).

## Warning ##
This is my first blog post after not having any real website/blog for a loooooong time. 
That means I am still figuring out several things:

* how I want my workflow to be
* how the formatting of the regular text should be
* how the example code should look on this blog
* how Jekyll works
* how this blog should look

As a result, your reading experience may vary and I am open to suggestions on how to improve things.

That being said, lets dive into how to setup Jekyll and SyntaxHighlighter for BimlScript.

## Why use SyntaxHighlighter instead of Rouge?
I am hosting this blog on [GitHub Pages](https://pages.github.com/) and they have integrated 
[Rouge](http://rouge.jneen.net/) as a syntax highlighter. As of this writing the Rouge author has not included my 
[pull request for BimlScript](https://github.com/jneen/rouge/pull/415) yet. Next to that Github Pages
[do not allow user plugins](https://github.com/jekyll/jekyll/issues/325), which means I currently cannot 'solve'
this using the Rouge highlighting route and keeping my workflow the same.

Since I plan on writing about BimlScript in the (near) future I went looking for alternative solutions. 
Due to the nature of integrating with Jekyll I thought the most flexible 
route would probably be a javascript based highlighter since that would be easier to integrate. 
I looked at a number of different solutions and partly because the official 
[BimlScript](http://bimlscript.com/) website actually uses SyntaxHighlighter, it makes sense to use it as well.
Meeting [Scott Currie](https://twitter.com/scottcurrie) at the 
[Biml User Group Netherlands Kickoff](https://www.eventbrite.com/e/biml-accelerator-master-class-and-biml-user-group-netherlands-kick-off-registration-24240208115)
also helped with making this decision.

It makes sense for the Biml community to be able to blog (with syntax highlighting) about Biml, as a result 
I am also considering to make an overview/instruction on how to use other solutions on different platforms 
but that is out of scope for this blog post. **Please contact me or write a blog post about the (Biml) 
highlighting technology you are using.**

Note though that [SyntaxHighlighter version 4.0](https://github.com/syntaxhighlighter/syntaxhighlighter) 
is in progress on github. However, one of the things that has changed is the build proces and I have not 
gotten that working on Windows yet. So for the moment these instructions are based on the 3.0.x version.

## How and where to download it
At the moment of writing SyntaxHighlighter 3.0.83 is the latest official release and you can 
[download it here from the website](http://alexgorbatchev.com/SyntaxHighlighter/download/).

SyntaxHighlighter can be extended with new syntaxes (like BimlScript) through brushes (plugins) and the BimlScript brush and dependency 
can be downloaded from BimlScript.com. You will need:

*	[shBrushBimlScript.js](http://bimlscript.com/Scripts/shBrushBimlScript.js).  	
    (Note that this brush file also contains a slightly modified Xml brush, this is only relevant if you might also want to use xml highlighting)		
*	[shThemeBimlScript.css](http://bimlscript.com/Content/shThemeBimlScript.css)

## Preparing files for Jekyll
SyntaxHighlighter comes with a lot of brushes for different syntaxes and themes. Depending on your
needs you might want to install/use more than what I will describe here. Depending on where you
prefer to put certain filetypes in your Jekyll sources tree you might need to tweak the instructions a bit.

Download and extract the contents of the SyntaxHighlighter zipfile somewhere. The resulting directory structure should
be:

    syntaxhighlighter_3.0.83
        ├───compass
        ├───scripts
        ├───src
        ├───styles
        └───tests
            ├───brushes
            ├───cases
            └───js			

The things we need from the official release are located in the `scripts` and `styles` directories and are:

    - scripts/shCore.js
    - styles/shCore.css
    
Copy all relevant files to your Jekyll source tree. I am assuming the `.js` files end up in your `js/` folder 
and `.css` files and up in your `css/` folder.

The end result should be something like:

    YourJekyllSources
        ├───js
        |   ├───shCore.js
        |   └───shBrushBimlScript.js
        └───css
            ├───shCore.css
            └───shThemeBimlScript.css

## Integrating files into Jekyll
Now that we have all files stored in the Jekyll source tree, we need to modify some files in order
to integrate it into the website generation and enable SyntaxHighlighter.

The following needs be put in the `_includes/head.html`:

        <link rel="stylesheet" href="{{ "/css/shCore.css" | prepend: site.baseurl }}">  
        <link rel="stylesheet" href="{{ "/css/shThemeBimlScript.css" | prepend: site.baseurl }}">

The following needs be put in the `_includes/footer.html`:

        <script type="text/javascript" src="/js/shCore.js"></script>
        <script type="text/javascript" src="/js/shBrushBimlScript.js"></script>
        <script type="text/javascript">
            SyntaxHighlighter.defaults['html-script'] = true;
            SyntaxHighlighter.all()
        </script>

## Markdown syntax for SyntaxHighlighter
SyntaxHighlighter uses the `<pre>` tag with class `brush: bimlScript` to do syntax highlighting. In order
to do this with Jekyll/Markdown, you need to use the following in your markdown files:

    <pre>
        <!-- This is where you BimlScript content goes -->
    <pre>
    {: class="brush: bimlScript"}

## Your first BimlScript blogpost
When you have everything setup correctly, then you should be able to do something like the below in a blog post:

<pre>
    <!-- This sample demonstrates BimlScript that imports schemas and tables using a connection to AdventureWorksLT. -->
 
    <#@ template language="C#" hostspecific="True"#>
    <#@ import namespace="Varigence.Languages.Biml.Connection" #>
    <#@ import namespace="Varigence.Hadron.Extensions" #>
    <#@ import namespace="Varigence.Hadron.Extensions.SchemaManagement" #>
    
    <#+ public ImportResults Results
        { 
            get
            {   
                return ((AstOleDbConnectionNode)RootNode.Connections["AdventureWorksLT"]).ImportDB();
            }
        }
    #> 
    
    <Biml xmlns="http://schemas.varigence.com/biml.xsd">
        <Schemas>
            <#=Results.SchemaNodes.GetBiml()#>
        </Schemas>
        <Tables> 
            <#=Results.TableNodes.GetBiml()#>
        </Tables>
    </Biml>
</pre>
{: class="brush: bimlScript"}

## Next steps
That concludes the very first item on this blog. 

I have some ideas about a couple of BimlScript posts and I am also interested in what kind of workflow 
other people are using when writing BimlScript related articles and blog posts.

Feel free to comment below or contact me directly.
