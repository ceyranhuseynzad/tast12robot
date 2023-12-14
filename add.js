const nm = document.querySelector("#name");
const ctgry = document.querySelector("#category");
const image = document.querySelector("#image");
const frm = document.querySelector(".ctgryfrm");

frm.addEventListener("submit", function (event) {
    event.preventDefault();

    let obj = {};
    let src = image.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        obj = {
            img: e.target.result,
            name: nm.value,
            info: ctgry.value,
        };


        axios.post("http://localhost:3000/all", obj)
            .then(response => {

                console.log("Response:", response);

                window.location.href = "index.html";
            })
            .catch(error => {

                console.error("Error:", error);

            });
    };

    reader.readAsDataURL(src);
});