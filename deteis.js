let id =new URLSearchParams(window.location.search).get("id")
let prdcts = document.querySelector(".items");
fetch(`http://localhost:3000/all/${id}`)
 .then(res=>res.json())
 .then(data=>{
    prdcts.innerHTML += `
    <div class="item">
        <img src="${data.img}" alt="">
        <div class="info">
            <p class="name">${data.name}</p>
            <p class="info">${data.info}</p>
           
        </div>
    </div>
`;
 })