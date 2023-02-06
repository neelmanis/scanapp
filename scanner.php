<html>
<head>
    <title>Html-Qrcode Demo</title>
<body>
    <div id="qr-reader" style="width:500px"></div>
    <div id="qr-reader-results"></div>
</body>
<!-- <script src="/html5-qrcode.min.js"></script> -->
<script src="https://unpkg.com/html5-qrcode"></script>
<script>
    function docReady(fn) {
        // see if DOM is already available
        if (document.readyState === "complete"
            || document.readyState === "interactive") {
            // call on next available tick
            setTimeout(fn, 1);
        } else {
            document.addEventListener("DOMContentLoaded", fn);
        }
    }

    docReady(function () {
        var resultContainer = document.getElementById('qr-reader-results');
      
        function onScanSuccess(decodedText, decodedResult) {
            
                lastResult = decodedText;
                // Handle on success condition with the decoded message.
                // console.log(`Scan result ${decodedText}`, decodedResult);
                alert(decodedText);
                
         

        }

        var html5QrcodeScanner = new Html5QrcodeScanner(
            "qr-reader", { fps: 5, qrbox: 250 });
        html5QrcodeScanner.render(onScanSuccess);
    });
</script>
</head>
</html>