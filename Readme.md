# GeoExt Demo Application

This GeoExt application aims to demonstrate the following:

* demonstrate the functionality available in GeoExt - the [Examples](https://geoext.github.io/geoext3/) are excellent resources
  but the next step of integrating all of them can be intimidating
* show best-practices on creating and structuring a full GeoExt application
  * MVVM approach and data-binding
  * lazy instantiation of components
  * use of Sencha Cmd

The application is an ExtJS "classic" application, rather than the mobile-focussed 
"modern" application. 

A future aim of this application is to become a "universal" application which supports
both types and shares code between both where possible. 

## Demo Features

* Drag and Drop
* Gazetteer

## Requirements

The following are required to run the application:

* [Sencha's ExtJS framework (GPL version)](https://www.sencha.com/legal/gpl/) - tested with `ext-6.2.0-gpl.zip`
* [Sencha Cmd](https://www.sencha.com/products/extjs/cmd-download/) - tested with version 6.7
* GeoExt - we will get a copy of this using `git` in the next section

The application uses [OpenLayers v4.6.5](https://github.com/openlayers/openlayers/releases/download/v4.6.5/v4.6.5-dist.zip) - this
is already included in the `lib/openlayers` folder. 

The references to the dependencies can be seen in the [app.json](app.json) file in `classpath`, `js`, and `css` sections. 

* TOCHECK - is npm required? Errors on OSGeoLive setup, but app loads anyway - `sudo apt install npm`

## Setup

Clone the app:

```
cd /home/user
git clone https://github.com/geographika/geoext-demo-app.git
```

Add GeoExt to the `lib/geoext3` folder

*For now use the following*

```
git clone https://github.com/geographika/geoext3.git
cd geoext3
git checkout geoext-demo-app
```

In the future we will use:

```
cd geoext-demo-app/lib
git clone https://github.com/geoext/geoext3.git
```

Extract `ext-6.2.0-gpl.zip` to `/home/user/geoext-demo-app/ext`
Extract `SenchaCmd-6.7.0.63-linux-amd64.sh.zip` to `SenchaCmd-6.7.0.63-linux-amd64.sh` and double click to run the installer 

Sencha Cmd installs by default to `/home/user/bin/Sencha/Cmd/6.7.0.63`
When installing:

* Add sencha to your PATH
* There is no requirement for the "Compass" extension for this demo

You will now need to open a new terminal to make sure the `sencha` application can be found. 

To run the application:

```
cd /home/user/geoext-demo-app
sencha app watch
```

You can now navigate to http://localhost:1841 to see the application

## Building the Application

```
sencha app build
```

## Initial Project Creation

A skeleton application was created using the following commands (on Windows 10):

```
SET PATH=%PATH%;C:\Program Files\Git\bin;D:\Tools\Sencha\Cmd\6.7.0.63
cd /D D:\GitHub\geoext-demo-app
sencha -sdk D:\Tools\Sencha\ext-6.2.0 generate app -classic geoext-demo-app ./
```

Views were created using the `sencha generate` command, e.g.:

```
sencha generate view layertree.LayerTree
```

Help for the above commands can be accessed using:

```
sencha help 
sencha help generate
```

## Project Structure

The following files are all needed to build and load the application.

 - `"app.json"` - The application descriptor which controls how the application is
   built and loaded.
 - `"app.js"` - The file that launches the application. This is primarily used to
   launch an instance of the `MyApp.Application` class.
 - `"index.html"` - The default web page for this application. This can be customized
   in `"app.json"`.
 - `"build.xml"` - The entry point for Sencha Cmd to access the generated build
   script. This file is a place where you can hook into these processes and tune
   them. See the comments in that file for more information.
 - `".sencha"` - This (typically hidden) folder contains the generated build scripts
   and configuration files for the application. This folder is required in order to
   build the application but its content should not need to be edited in most cases.
   The content of this folder is updated by "sencha app upgrade".

These files can be ignored from source control as they are regenerated by the build
process.

 - `"build"` - This folder contain the output of the build. The generated CSS file,
   consolidated resources and concatenated JavaScript file are all stored in this
   folder.
 - `"bootstrap.*"` - These files are generated by the build and watch commands to
   enable the application to load in "development mode".

### Folder Layout

The application has the following structure.

    app/                # Contains JavaScript code
        model/          # Data model classes
        view/           # Views as well as ViewModels and ViewControllers
        store/          # Data stores
        controller/     # Global / application-level controllers

    lib/                # 3rd party libraries including GeoExt and OpenLayers

    sass/
        etc/            # Misc Sass code (all.scss is imported by default)
        var/            # Sass variable and mixin declarations
        src/            # Sass rules

    resources/          # Assets such as images, fonts, etc.
    WEB-INF/            # contains web.xml for configuring the inbuilt web server when running `sencha app watch --j2ee`

See the [Sass readme](sass/Readme.md) for details on the "sass" folder.


## Issues

The following occurs on Firefox, but does not prevent the application from running:

```
XML Parsing Error: not well-formed
Location: http://localhost:1841/bootstrap.json?_dc=1563986420948
Line Number 1, Column 1:
```

This can be fixed by configuring the JSON mime type in `WEB-INF/web.xml`, and then running: `sencha app watch --j2ee`
