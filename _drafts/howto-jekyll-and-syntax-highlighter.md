---
layout: post
title:  "Howto blog about Biml on Jekyll with SyntaxHighlighter"
categories: jekyll syntaxhightlighter bimlscript
comments: true
---

In this post I am going to explain howto setup 
[SyntaxHighlighter](http://alexgorbatchev.com/SyntaxHighlighter/) on a 
[Jekyll](http://jekyllrb.com) blog (for the purpose of writing about 
[Biml](https://en.wikipedia.org/wiki/Business_Intelligence_Markup_Language)).

## Why use SyntaxHighlighter instead of Rouge?

I am hosting this blog on [GitHub Pages](https://pages.github.com/) and they use 
[Rouge](http://rouge.jneen.net/). As of this writing the author has not included my 
[update for BimlScript](https://github.com/jneen/rouge/pull/415) yet. Also Github Pages
[does not allow user plugins](https://github.com/jekyll/jekyll/issues/325).

Since I plan on writing about BimlScript in the near future I went looking for an 
alternative solution. Due to the nature of integrating with Jekyll I thought the best 
route would probably be a javascript based highlighter since that would be easier to integrate. 
I looked at a number of different solutions but partly because the official 
[BimlScript](http://bimlscript.com/) website uses SyntaxHighlighter, it makes sense to use it.
Meeting [Scott Currie](https://twitter.com/scottcurrie) at the 
[Biml User Group Netherlands Kickoff](https://www.eventbrite.com/e/biml-accelerator-master-class-and-biml-user-group-netherlands-kick-off-registration-24240208115)
also helped.

Since it makes sense for the Biml community to be able to blog (with syntax highlighting) about Biml,
I am also considering to make an overview/instruction on how to use other solutions on different platforms 
but that is out of scope for this blog post.

## How and where to download it

At the moment of writing SyntaxHighlighter 3.0.83 is the latest official release and you can 
[download it here from the website](http://alexgorbatchev.com/SyntaxHighlighter/download/).

Note though that [version 4.0 is in progress on github](https://github.com/syntaxhighlighter/syntaxhighlighter).
However, one of the things that has changed is the build proces and I have not gotten that working on
Windows yet.

SyntaxHighlighter can be extended for different/new syntaxes through brushes and you can 
[download the BimlScript Brush fromBimlScript.com](http://bimlscript.com/Scripts/shBrushBimlScript.js).

## Installing it all on Jekyll

SyntaxHighlighter comes with a lot of brushes for different syntaxes and themes. Depending on your
needs you might want to install/use more than what I will describe here. Also depending on where you
prefer to put certain filetypes in your Jekyll blog sources you might need to tweak the instructions a bit.

Download and extract the contents of SyntaxHighlighter somewhere. The resulting directory structure should
be something along the lines of:

	syntaxhighlighter_3.0.83
	    ├───compass
	    ├───scripts
	    ├───src
	    ├───styles
	    └───tests
	        ├───brushes
	        ├───cases
	        └───js			

The things we need are located in the `scripts` and `styles` directories and are:

	- js/shCore.js
	- styles/shCore.css
	- styles/shThemeDefault.css

Copy these files to your Jekyll source tree. I am assuming the `.js` files end up in your `js/` folder 
and `.css` files and up in your `css/` folder.

The end result should be something like:

	YourJekyllSources
		 ├───js
		 |   ├───shCore.js
		 |   └───shBrushBimlScript.js
		 └───css
             ├───shCore.css
             └───shThemeDefault.js

## Markdown syntax for SyntaxHighlighter

## Your first BimlScript blogpost




Demo of Jekyll and SyntaxHighlighter


<pre>
    /**
     * SyntaxHighlighter
     */
    function foo()
    {
        if (counter <= 10)
            return;
        // it works!
    }
</pre>
{: class="brush: js"}
    
test


<pre>
@mixin round_corners_custom($top, $right, $bottom, $left) {
	-moz-border-radius: $top $right $bottom $left !important;
	-webkit-border-radius: $top $right $bottom $left !important;
}

@mixin round_corners($radius) {
	@include round_corners_custom($radius, $radius, $radius, $radius);
}

.syntaxhighlighter {
	a,
	div,
	code,
	table,
	table td,
	table tr,
	table tbody,
	table thead,
	table caption,
	textarea {
		@include round_corners(0);
		
		background: none !important;
		border: 0 !important;
		bottom: auto !important;
		float: none !important;
		height: auto !important;
		left: auto !important;
		line-height: 1.1em !important;
		margin: 0 !important;
		outline: 0 !important;
		overflow: visible !important;
		padding: 0 !important;
		position: static !important;
		right: auto !important;
		text-align: left !important;
		top: auto !important;
		vertical-align: baseline !important;
		width: auto !important;
		font: {
			family: "Consolas", "Bitstream Vera Sans Mono", "Courier New", Courier, monospace !important;
			weight: normal !important;
			style: normal !important;
			size: 1em !important;
		}
		min: {
			// For IE8, FF & WebKit
			height: inherit !important;
			// For IE7
			height: auto !important;
		}
	}
}

.syntaxhighlighter {
	width: 100% !important;
	margin: 1em 0 1em 0 !important;
	
	position: relative !important;
	overflow: auto !important;
	font-size: 1em !important;
	
	&.source { overflow: hidden !important; }
	
	// set up bold and italic
	.bold { font-weight: bold !important; }
	.italic { font-style: italic !important; }
	
	.line { white-space: pre !important; }
	
	// main table and columns
	table {
		width: 100% !important;
		caption {
			text-align: left !important;
			padding: .5em 0 0.5em 1em !important;
		}
		
		td.code {
			width: 100% !important;
			
			.container {
				position: relative !important;
				
				textarea {
					position: absolute !important;
					left: 0 !important;
					top: 0 !important;
					width: 100% !important;
					height: 120% !important;
					border: none !important;
					background: white !important;
					padding-left: 1em !important;
					overflow: hidden !important;
					white-space: pre !important;
				} 
			} 
		}
		
		// middle spacing between line numbers and lines
		td.gutter .line {
			text-align: right !important;
			padding: 0 0.5em 0 1em !important; 
		}
		
		td.code .line {
			padding: 0 1em !important;
		}
	}
	
	&.nogutter {
		td.code {
			.container textarea, .line { padding-left: 0em !important; }
		}
	}
	
	&.show { display: block !important; }
	
	// Adjust some properties when collapsed
	&.collapsed {
		table { display: none !important; }
		
		.toolbar {
			padding: 0.1em 0.8em 0em 0.8em !important;
			font-size: 1em !important;
			position: static !important;
			width: auto !important;
			height: auto !important;
			
			span {
				display: inline !important;
				margin-right: 1em !important;
				
				a {
					padding: 0 !important;
					display: none !important;
					&.expandSource, &.help { display: inline !important; } 
				}
			}
		}
	}
	
	// Styles for the toolbar
	.toolbar {
		position: absolute !important;
		right: 1px !important;
		top: 1px !important;
		width: 11px !important;
		height: 11px !important;
		font-size: 10px !important;
		z-index: 10 !important;
		
		span.title { display: inline !important; }
		
		a {
			display: block !important;
			text-align: center !important;
			text-decoration: none !important;
			padding-top: 1px !important;
			
			&.expandSource { display: none !important; }
		}
	}
	
	// Print view.
	// Colors are based on the default theme without background.
	&.printing {
		.line.alt1 .content,
		.line.alt2 .content,
		.line.highlighted .number,
		.line.highlighted.alt1 .content,
		.line.highlighted.alt2 .content { background: none !important; }
		
		// Gutter line numbers
		.line {
			.number { color: #bbbbbb !important; }
			// Add border to the lines
			.content { color: black !important; }
		}
		
		// Toolbar when visible
		.toolbar { display: none !important; }
		a { text-decoration: none !important; }
		.plain, .plain a { color: black !important; }
		.comments, .comments a { color: #008200 !important; }
		.string, .string a { color: blue !important; }
		.keyword {
			color: #006699 !important;
			font-weight: bold !important; 
		}
		.preprocessor { color: gray !important; }
		.variable { color: #aa7700 !important; }
		.value { color: #009900 !important; }
		.functions { color: #ff1493 !important; }
		.constants { color: #0066cc !important; }
		.script { font-weight: bold !important; }
		.color1, .color1 a { color: gray !important; }
		.color2, .color2 a { color: #ff1493 !important; }
		.color3, .color3 a { color: red !important; }
		.break, .break a { color: black !important; }
	}
}
</pre>
{: class="brush: sass"}