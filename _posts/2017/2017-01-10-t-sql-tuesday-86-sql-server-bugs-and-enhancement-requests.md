---
layout: post
title:  "T-SQL Tuesday #86 - SQL Server Bugs & Enhancement Requests"
date:   2017-01-10 06:00:00 +00:00
categories: tsql2sday
comments: true
---
[<img src="https://www.brentozar.com/wp-content/uploads/2016/11/tsql2sday150x150.jpg">](https://www.brentozar.com/archive/2017/01/announcing-t-sql-tuesday-87-sql-server-bugs-enhancement-requests/)

Last week I came across this tweet that got me thinking about participating in 
the T-SQL Tuesday #86 SQL Server Bugs & Enhancement Requests event: 

![BIML fixes SSIS difficult to use](/images/biml-fixes-ssis-difficult-to-use.png)

I have not participated in T-SQL Tuesday before and although I have thought about 
taking this moment to write about BIML (I am working towards a "past year with BIML"
reflection post), I have instead decided to write about something else that has 
been bothering me for a while:

[#759940 Why can't I build an SSIS Project with MSBuild "out of the box"?](https://connect.microsoft.com/SQLServer/feedback/details/759940/ssis-support-msbuild-as-a-mechanism-for-deploying-ssis-ispac-files)

My background is in Software Engineering, so you could say I am an "accidental BI guy" and 
I am still shocked that some of the good Software Engineering practices do not seem to have
landed in "the BI World".

Being able to do a reproducable (ISPAC) build without additional tools should have been part of the SSIS 
development/MSBuild stack by now.

(on a side note, this same issue is also true for [#759939 SSAS](https://connect.microsoft.com/SQLServer/feedback/details/759939/ssas-support-msbuild-as-a-mechanism-for-deploying-ssas-cubes-models) 
and [#759938 SSRS](https://connect.microsoft.com/SQLServer/feedback/details/759938/ssrs-support-msbuild-as-a-mechanism-for-deploying-ssrs-reports))

Granted, there are some workarounds floating around (e.g. "SSISMSBuild"), but the
[SSDT (Database Project) people actually seem to get this right](https://blogs.msdn.microsoft.com/ssdt/2016/08/22/releasing-ssdt-with-visual-studio-15-preview-4-and-introducing-ssdt-msbuild-nuget-package/).

For comparison, let's have a look at some of the practices one can apply when developing a C# Console Application:

1. The 'result' of development is an executable that you can run from a Command Prompt

2. The 'input' is a C# Console Project containing a .csproj file and some .cs files containing the actual code

3. The .csproj is actually an MSBuild xml file (which is comparable to a Makefile on unix systems) and this allows
   for build automation.

4. When developing this program one would typically store all source code and projects inside [Version Control](https://en.wikipedia.org/wiki/Version_control).

5. There might even be written tests that verify correctness of (parts) of the code.

6. [Continuous Integration](https://en.wikipedia.org/wiki/Continuous_integration) might be applied to ensure we have working result at any moment in time.
   This means that a build is done and tests are executed on the resulting output whenever somebody checks in a change.


Now compare this with SSIS Development:

1. The 'result' of development is an 'ISPAC' file you can deploy to a server. 
   ISPAC or ([Integration Services Project Deployment File Format](https://msdn.microsoft.com/en-us/library/ff952821(v=sql.105).aspx)) was
   introduced in SQLServer 2012 with the SSIS Project Deployment Model. Whereas previously each package was a single unit of deployment, with
   the Project Deployment Model everything (including packages and parameters) are combined into a single (ISPAC) file ready for deployment.
   Also the managing of configuration (e.g. for Production, Acceptance, Testing, Development) can be done in a much easier way by using 
   Project Parameters and Environment variables.

2. The 'input' is an SSIS Project containing a .dtproj file and some .dtsx files containing the actual packages.

3. The .dtproj file is NOT an MSBuild based project. I don't know for sure, but I think this is probably a remnant of some old (pre-MSBuild) build system.
   Since SSIS was introduced in SQLServer 2005 and MSBuild was introduced in 2005 with .NET 2.0 it might be that the SSIS development tools (and thus
   the project system it uses) was never build with the MSBuild system in mind. The only 'official' way to build an ISPAC is by using Visual Studio.
   As a result of this, one can not build an ISPAC file with MSBuild "out of the box" and thus there is no good and official way to 
   automate building of ISPAC files.

4. There is nothing preventing you to use Version Control with SSIS development.
   But beware of merging .dtsx packages! You should probably treat it like a binary file and not like a text file.

5. Unfortunately out of scope for this post, but there are actually ways to automate testing of SSIS packages.
   We have a custom build SSIS testing framework at work (which is also a something I want to write about).

6. CI can also be applied for SSIS development (and this is something we actually do at work).


Hopefully, the (near) future will bring us more SQLServer MSbuild support in addition to what the SSDT (Database Project) Team is bringing.
