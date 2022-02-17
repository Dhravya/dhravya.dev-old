
// On blur, set the src of qrcode_image to the empty string.
document.getElementById("inputField").addEventListener("blur", e => {
    document.getElementById("qrcode_image").src = "https://api.dhravya.me/qrcode?query=" + encodeURIComponent(e.target.value);
    });

document.getElementById("mask_select").addEventListener("change", e => {
    document.getElementById("qrcode_image").src = "https://api.dhravya.me/qrcode?query=" + encodeURIComponent(document.getElementById("inputField").value) + "&mask=" + e.target.value;
    });

document.getElementById("drawer_select").addEventListener("change", e => {
    document.getElementById("qrcode_image").src = "https://api.dhravya.me/qrcode?query=" + encodeURIComponent(document.getElementById("inputField").value) + "&mask=" + document.getElementById("mask_select").value + "&drawer=" + e.target.value;
    });

document.getElementById("foreground_iput").addEventListener("change", e => {
    if (e.target.value == 0) {
        document.getElementById("qrcode_image").src = "https://api.dhravya.me/qrcode?query=" + encodeURIComponent(document.getElementById("inputField").value) + "&mask=" + document.getElementById("mask_select").value + "&drawer=" + document.getElementById("drawer_select").value;
    } else {
    document.getElementById("qrcode_image").src = "https://api.dhravya.me/qrcode?query=" + encodeURIComponent(document.getElementById("inputField").value) + "&fg=" + encodeURIComponent(e.target.value)
    }});

document.getElementById("background_iput").addEventListener("change", e => {
    if (e.target.value == 0) {
        document.getElementById("qrcode_image").src = "https://api.dhravya.me/qrcode?query=" + encodeURIComponent(document.getElementById("inputField").value) + "&mask=" + document.getElementById("mask_select").value + "&drawer=" + document.getElementById("drawer_select").value;
    } else {
    document.getElementById("qrcode_image").src = "https://api.dhravya.me/qrcode?query=" + encodeURIComponent(document.getElementById("inputField").value) + "&fg=" + document.getElementById("foreground_iput").value + "&bg=" + e.target.value
    }});

// If permissions for clipboard_write are granted, copy the image in qrcode_image to the clipboard.
document.getElementById("copy_button").addEventListener("click", e => {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(document.getElementById("qrcode_image").src).then(function() {
            console.log("Copied to clipboard");
            document.getElementById("image_success").textContent = "Successfully copied to clipboard";
        }, function(err) {
            console.error("Could not copy to clipboard: ", err);
        });
    } else {
        console.log("Clipboard API not supported");
    }
});


document.getElementById("download_button").addEventListener("click", e => {
    console.log("Downloading image");
    const link = document.createElement('a');
    // Download the image in qrcode_image.
    function download(){
        axios({
            url:document.getElementById("qrcode_image").src,
            method:'GET',
            responseType: 'blob'
    })
    .then((response) => {
        const url = window.URL
        .createObjectURL(new Blob([response.data]));
               const link = document.createElement('a');
               link.href = url;
               link.setAttribute('download', 'image.jpg');
               document.body.appendChild(link);
               link.click();
 })
 }
 download()

});