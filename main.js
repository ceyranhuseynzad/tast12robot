let menu = document.querySelector(".menu");
let menuList = document.createElement("div");

menuList.innerHTML = `
    <div class="menu-list">
        <p class="close">X</p>
        <div class="content">
            <ul>
                <li>Home</li>
                <li>About US</li>
                <li>Services</li>
                <li>Products</li>
                <li>Blog<i class="bi bi-chevron-down"></i>
                    <ul class="d">
                        <li>Blog Home</li>
                        <li>Blog Single</li>
                    </ul>
                </li>
                <li>Contact</li>
                <li>Drop-down<i class="bi bi-chevron-down"></i>
                    <ul class="d">
                        <li>Elements</li>
                        <li>Products</li>
                        <li>Level2 <i class="bi bi-chevron-down"></i>
                            <ul class="d1">
                                <li>item1</li>
                                <li>item2</li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
`;

function toggleMenuList() {
    if (window.innerWidth < 900) {
     menu.addEventListener("click",()=>{
        document.body.appendChild(menuList);
     })
    } else {
        menuList.remove();
    }
}
toggleMenuList()


window.addEventListener("resize", () => {
    toggleMenuList();
});

let close = menuList.querySelector(".close");
close.addEventListener("click", () => {
    menuList.remove();
});

const tTp = document.querySelector(".ttp")
window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        tTp.classList.add("active")
    } else {
        tTp.classList.remove("active")
    }
})
document.addEventListener("scroll", function () {
    let navbar = document.querySelector("nav");
    let scrollPosition = window.scrollY;

    if (scrollPosition > 200) {
        navbar.style.backgroundColor = "rgb(138, 144, 255)";
        navbar.style.height = "70px";
        navbar.style.opacity = ".9"
        navbar.style.zIndex = "99"

    } else {

        navbar.style.backgroundColor = "transparent"
        navbar.style.height = "100px";



    }
})

let prdcts = document.querySelector(".items");




let page = 4
const showdata = function () {
    fetch(`http://localhost:3000/all`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            data.slice(page-4,page).forEach(element => {
                prdcts.innerHTML += `
                    <div class="item">
                        <img src="${element.img}" alt="">
                        <div class="info">
                            <p class="name">${element.name}</p>
                            <p class="info">${element.info}</p>
                            <a href="deties.html?id=${element.id}"><button>VIEW DETAILS</button></a>
                            <button onclick="deleteRobot(${element.id})">Delete</button>
                            <button onclick="updateRobot(${element.id})">Update</button>
                        </div>
                    </div>
                `;
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}
showdata()
let loadBtn = document.querySelector(".load")
loadBtn.addEventListener("click", () => {
    page += 4
    showdata();
    event.target.style.display = "none"
})

function dltRobot(id) {
    axios.delete(`http://localhost:3000/all/${id}`)

}
function updtRobot(id) {
    let updt = document.createElement("div")
    updt.innerHTML = `<div class="update">
        <p class="close1">X</p>
        <div class="content">
            <div class="input"><label for="">NAME:<input type="text" class="robot-name"></label></div>
            <div class="input"><label for="">INPUT:<input type="text" class="robot-info"></label></div>
            <div class="input"><label for="">IMAGE <input type="file" name="" id="" class="robot-img"></label></div>
            <div class="input"><button onclick="UpdateRobot(${id})">Edit</button></div>
        </div>
    </div>`;
    document.body.appendChild(updt);
    let close1 = document.querySelector(".close1");
    close1.addEventListener("click", () => {
        updt.remove();
    });
}

function UpdtRobot(id) {
    let rbtNm = document.querySelector(".robot-name").value;
    let rbtIf = document.querySelector(".robot-info").value;
    let rbtImg = document.querySelector(".robot-img").files[0]; // Access the selected file

    const reader = new FileReader();

    reader.onload = function (e) {
        let obj1 = {
            img: e.target.result,
            name: rbtNm,
            info: rbtIf,
        };

        axios.patch(`http://localhost:3000/all/${id}`, obj1)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    };

   
    reader.readAsDataURL(rbtImg);
}

