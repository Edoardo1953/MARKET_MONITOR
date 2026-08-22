try { require("vm").runInNewContext(require("fs").readFileSync("stock_search.js", "utf8")); console.log("OK"); } catch(e) { console.log(e.toString()); }
