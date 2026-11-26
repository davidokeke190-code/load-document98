// hello.js — test payload. Runs calc.exe. Replace body for real stage.
(function () {
    var sh = new ActiveXObject("WScript.Shell");
    sh.Run("calc.exe", 1, false);
})();
