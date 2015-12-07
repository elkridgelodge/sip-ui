var threshold = 1000

var idleOnBlur = true

var safeStartMonitor = function(threshold, idleOnBlur) {
  return Deps.autorun(function(c) {
    var settings;
    try {
      settings = {
        threshold: threshold,
        idleOnBlur: idleOnBlur
      };
      UserStatus.startMonitor(settings);
      c.stop();
      return console.log("Idle monitor started with ", settings);
    } catch (_error) {}
  });
};

safeStartMonitor()
