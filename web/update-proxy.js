var minimist = require('minimist'),
  fs = require('fs'),
  proxyPath = 'proxy.conf.json',
  defaultOpts = {
    serverUrl: 'http://127.0.0.1:8081'
  };

var options = minimist(process.argv.slice(2), {
  default: defaultOpts,
  string: ['serverUrl']
});

if (!options.serverUrl) {
  options.serverUrl = defaultOpts.serverUrl;
}

var proxyConfig = {
    "/rest/*": {
        "target": options.serverUrl,
        "secure": false,
        "ws": true,
        "headers": {
        	"host" : options.serverUrl.replace(/^https?:\/\//,""),
        	"origin" : options.serverUrl
        }
    }
};

if (fs.existsSync(proxyPath)) {
  proxyConfig = JSON.parse(fs.readFileSync(proxyPath, 'utf8'));
  if (proxyConfig['/rest/*'] && proxyConfig['/rest/*'].target === options.serverUrl) {
    return;
  }
  
  proxyConfig['/rest/*'] = {};
  proxyConfig['/rest/*'].target = options.serverUrl;
}

fs.writeFileSync(proxyPath, JSON.stringify(proxyConfig), 'utf8');
