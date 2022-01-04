
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