# sketch-liveserver

Serves artboard previews from [Skala Preview Sketch Plugin](https://bjango.com/help/skalapreview/sketch/) across network via http. Live reload supported via BrowserSync.

![](https://raw.githubusercontent.com/ofstudio/sketch-liveserver/master/sketch-liveserver.gif)

# Installation

1. Install [NodeJS](https://nodejs.org/en/download/) 8 or higher
2. `cd sketch-liveserver`
3. Run `npm install`
4. Install [Scala Preview](https://bjango.com/mac/skalapreview/) and [Skala Preview Sketch Plugin](https://bjango.com/help/skalapreview/sketch/)

# Run
1. Run `./sketch-liveserver`
2. Create new Sketch document and at least 1 artboard within it (or open existing document)
3. Enable Auto Preview: `Plugins > Sketch Preview > Toggle Auto Preview`
4. Open [http://localhost:3000](http://localhost:3000) in your browser
