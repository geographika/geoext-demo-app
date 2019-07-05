
Aims 

Show best practice
Create a full ExtJS application from scratch with all dependencies and build steps
Examples are greate but the next step of integrating all of them can be intimidating

OSGeoLive environment

https://www.sencha.com/products/extjs/cmd-download/
https://www.sencha.com/products/extjs/evaluate/


SET PATH=%PATH%;C:\Program Files\Git\bin;D:\Tools\Sencha\Cmd\6.7.0.63

cd /D D:\GitHub\geoext-demo-app

sencha -sdk D:\Tools\Sencha\ext-6.2.0 generate app -classic geoext-demo-app ./

sencha app watch

http://localhost:1841



We will make use of Sencha Cmd
Help for commands can be accessed using

sencha help 
sencha help generate

Now add in GeoExt and OpenLayers. We will store these in a /lib folder. 

cd /D D:\GitHub\geoext-demo-app
md lib
cd lib

git clone https://github.com/geoext/geoext3.git

OpenLayers

https://github.com/openlayers/openlayers/releases/download/v4.6.5/v4.6.5-dist.zip

Unzip the three files
ol.css
ol.js
ol-debug.js

Into lib/openlayers 

Now add these dependencies to the project

app.json

  "classpath": [
    "app",
    "./lib/geoext3/src",
    "./lib/geoext3/classic"
  ],

  "js": [
    {
      "path": "${framework.dir}/build/ext-all-rtl-debug.js"
    },
    {
      "path": "app.js",
      "bundle": true
    }
  ]

  "js": [
    {
      //"path": "./lib/openlayers/ol.js"
      "path": "./lib/openlayers/ol-debug.js"
    },
    {
      "path": "${framework.dir}/build/ext-all-rtl-debug.js"
    },
    {
      "path": "app.js",
      "bundle": true
    }
  ],

    "css": [
    {
      // this entry uses an ant variable that is the calculated
      // value of the generated output css file for the app,
      // defined in .sencha/app/defaults.properties
      "path": "${build.out.css.path}",
      "bundle": true,
      "exclude": [ "fashion" ]
    },
    {
      "path": "./lib/openlayers/ol.css"
    }
  ],

Now let's generate a Map view:

`sencha generate view Map`

Or sencha generate view map.Map

Creates:

Geoext.demo.app.view.Map

sencha generate view layertree.LayerTree


MapServer Setup
---------------

Natural Earth dataset

msLoadMap(): Unable to access file. (D:\GitHub\mappyfile-basemaps\natural_earth\template.map)
Grant "users" group read access

CGI Request 1 on process 80672
msDrawMap(): rendering using outputformat named png (AGG/PNG).
msDrawMap(): WMS/WFS set-up and query, 0.000s
msDrawMap(): Layer 2 (Lakes), 0.128s
msOGRFileNextShape(): OGR error. OGR GetNextFeature() error'd. Check logs.
msOGRFileNextShape(): Unable to open EPSG support file gcs.csv.  Try setting the GDAL_DATA environment variable to point to the directory containing EPSG csv files.
msDrawMap(): Image handling error. Failed to draw layer named 'Countries'.
mapserv request processing time (msLoadMap not incl.): 0.326s
msFreeMap(): freeing map at 000001DF1DF7AE70.

WFS Grid
--------

sencha generate view grid.Grid



localhost/:1 Access to XMLHttpRequest at 'http://localhost/mapserver/geoext/?&_dc=1560293721819&service=WFS&version=2.0.0&request=GetFeature&typeName=Countries&outputFormat=application%2Fjson&sortBy=name_long&startIndex=0&count=10' from origin 'http://localhost:1841' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.

Add WEB-INF folder
sencha app watch --j2ee

QUESTIONS
---------

Good practice to use: var map = BasiGX.util.Map.getMapComponent().map;
or try and save as a global variable and pass around?


App Features:

+ Drag and Drop
+ Gazetteer

TODO
++++

Center on Germany
