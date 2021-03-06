/*
 * Start bolting things together
 * MIT License, all that Jazz. Use it however.
 * 2014 Derek M. Anderson
 */
define('meta', function () {
	return {
		version: '0.0.2'
	}
});

define(['./oyakata/main', './basho/main', './haridashi/main', './ichimon/main', './yobidashi/main', './henka/main', 'meta'],
	function (oop, platform, haridashi, mixins, yobidashi, henka, meta) {

		//public api map
		var sumo = platform.scope.sumo = {
			/* bindings for utility lib */
			bind: haridashi.bind,
			extend: haridashi.extend,
			ready: haridashi.ready,
			create: oop.create,
			mixin: mixins.mix,
			platform: platform,
			version: meta.version,
			/* bindings for a messaging lib */
			pub: yobidashi.pub,
			sub: yobidashi.sub,
			unsub: yobidashi.unsub
		};

		return sumo;
	});