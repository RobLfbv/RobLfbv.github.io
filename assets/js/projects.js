let projects = [];
let tags = [];
const carouselMain = document.getElementById('mainProjects-list');
const carouselSecond = document.getElementById('projects-list');
const prevBtnMain = document.getElementById('prevBtnMain');
const nextBtnMain = document.getElementById('nextBtnMain');
const prevBtnSecond = document.getElementById('prevBtnSecond');
const nextBtnSecond = document.getElementById('nextBtnSecond');
const carouselMainName = '.projectMain';
const carouselSecondName = '.project';
var mainItems = carouselMain.querySelectorAll(carouselMainName);
var secondItems = carouselSecond.querySelectorAll(carouselSecondName);

window.addEventListener("DOMContentLoaded", async () => {
    filterProjects();
    mainItems = carouselMain.querySelectorAll(carouselMainName);
    secondItems = carouselSecond.querySelectorAll(carouselSecondName);
    updateOpacity(mainItems, carouselMain, nextBtnMain, prevBtnMain);
    updateOpacity(secondItems, carouselSecond, nextBtnSecond, prevBtnSecond);
});

function filterProjects() {
    const tagsActive = [...document.querySelectorAll("#tags-listSecond .tag.active")].map(tag => tag.getAttribute("data-tag"));
    const projects = [...document.querySelectorAll("#projects-list .project")];
    projects.forEach(project => {
        const projectTags = [...project.querySelectorAll(".tags .tag")].map(tag => tag.getAttribute("data-tag"));
        project.querySelectorAll(".tags .tag").forEach(tag => {
            if (tag.classList.contains("active")) tag.classList.remove("active");
        });
        if (tagsActive.length > 0) {
            if (tagsActive.filter(tag => projectTags.includes(tag)).length === tagsActive.length && tagsActive.length > 0) {
                project.style.display = "block";
                project.querySelectorAll(".tags .tag").forEach(tag => {
                    if (tagsActive.includes(tag.getAttribute("data-tag"))) {
                        tag.classList.add("active");
                    }
                });
            } else {
                project.style.display = "none";
            }
        } else {
            project.style.display = "block";
        }
    });
    const visibleProjects = projects.filter(p => p.style.display === "block");
    if (visibleProjects.length === 0) {
        document.querySelector("#empty-projectsSecond").style.display = "block";
    } else {
        document.querySelector("#empty-projectsSecond").style.display = "none";
    }

    const tagsActiveMain = [...document.querySelectorAll("#tags-listMain .tag.active")].map(tag => tag.getAttribute("data-tag"));
    const projectsMain = [...document.querySelectorAll("#mainProjects-list .projectMain")];
    projectsMain.forEach(project => {
        const projectTags = [...project.querySelectorAll(".tags .tag")].map(tag => tag.getAttribute("data-tag"));
        project.querySelectorAll(".tags .tag").forEach(tag => {
            if (tag.classList.contains("active")) tag.classList.remove("active");
        });
        if (tagsActiveMain.length > 0) {
            if (tagsActiveMain.filter(tag => projectTags.includes(tag)).length === tagsActiveMain.length && tagsActiveMain.length > 0) {
                project.style.display = "block";
                project.querySelectorAll(".tags .tag").forEach(tag => {
                    if (tagsActiveMain.includes(tag.getAttribute("data-tag"))) {
                        tag.classList.add("active");
                    }
                });
            } else {
                project.style.display = "none";
            }
        } else {
            project.style.display = "block";
        }
    });
    const visibleProjectsMain = projectsMain.filter(p => p.style.display === "block");
    if (visibleProjectsMain.length === 0) {
        document.querySelector("#empty-projectsMain").style.display = "block";
    } else {
        document.querySelector("#empty-projectsMain").style.display = "none";
    }
    updateOpacity(mainItems, carouselMain, nextBtnMain, prevBtnMain);
    updateOpacity(secondItems, carouselSecond, nextBtnSecond, prevBtnSecond);
}

function focusImage(img, legende, div, index) {
    const imageModal = document.createElement("label");
    const image = document.createElement("img");
    const imageLegende = document.createElement("p");
    const zoom = document.createElement("input");
    const prevBtn = document.createElement("button");
    const nextBtn = document.createElement("button");
    const buttonsLegend = document.createElement("div");

    prevBtn.id = "prevBtnImg";
    nextBtn.id = "nextBtnImg";

    prevBtn.className = "nav-btn left";
    nextBtn.className = "nav-btn right";

    prevBtn.innerText = "<";
    nextBtn.innerText = ">";

    buttonsLegend.className = "buttons-legend";

    imageModal.className = "modal image-modal";
    image.className = "image";
    imageLegende.className = "legende";
    zoom.type = "checkbox";

    image.src = img;
    image.alt = legende;
    imageLegende.innerText = legende;


    imageModal.appendChild(zoom);
    imageModal.appendChild(image);
    const allImg = div.querySelectorAll("img");
    if (allImg.length > 1)
        buttonsLegend.appendChild(prevBtn);

    document.querySelector("#image-modal").appendChild(imageLegende);

    if (allImg.length > 1)
        buttonsLegend.appendChild(nextBtn);

    var toInsertBefore = document.getElementById("closeImage");
    document.querySelector("#image-modal").insertBefore(imageModal, toInsertBefore);
    document.querySelector("#image-modal").style.display = "flex";
    document.querySelector("#image-modal").appendChild(buttonsLegend)


    function fastUnfocusImage() {
        prevBtn.removeEventListener("click", PrevButtonImage, true);
        nextBtn.removeEventListener("click", NextButtonImage, true);
        document.querySelector(".buttons-legend").remove();
        document.querySelector(".legende").remove();
        document.querySelectorAll("#image-modal .modal").forEach(modal => modal.classList.add("disappear"));
        document.querySelector("#image-modal").classList.add("disappear");
        document.querySelector("#image-modal").style.display = "none";
        document.querySelector("#image-modal").classList.remove("disappear");
        document.querySelectorAll("#image-modal .modal").forEach(modal => modal.remove());
    }
    function PrevButtonImage() {
        fastUnfocusImage();
        var prevIdx = index - 1;
        prevIdx = prevIdx < 0 ? allImg.length - 1 : prevIdx;
        focusImage(allImg[prevIdx].src, allImg[prevIdx].alt || "", div, prevIdx);
    }
    function NextButtonImage() {
        console.log("next");
        fastUnfocusImage();
        const nextIdx = (index + 1) % allImg.length;
        focusImage(allImg[nextIdx].src, allImg[nextIdx].alt || "", div, nextIdx);
    }


    prevBtn.addEventListener("click", PrevButtonImage, { once: true });
    nextBtn.addEventListener("click", NextButtonImage, { once: true });
}

function unfocusImage() {
    document.querySelectorAll("#image-modal .modal").forEach(modal => modal.classList.add("disappear"));
    document.querySelector("#image-modal").classList.add("disappear");
    document.querySelector(".buttons-legend").remove();
    document.querySelector(".legende").remove();

    setTimeout(() => {
        document.querySelector("#image-modal").style.display = "none";
        document.querySelector("#image-modal").classList.remove("disappear");
        document.querySelectorAll("#image-modal .modal").forEach(modal => modal.remove());
    }, 280);
}


/*Carousel Functions*/

document.addEventListener('DOMContentLoaded', () => {

    prevBtnMain.addEventListener('click', () => {
        carouselMain.scrollBy({ left: -getItemWidth(carouselMainName, mainItems, carouselMain, nextBtnMain, prevBtnMain), behavior: 'smooth' });
    });
    nextBtnMain.addEventListener('click', () => {
        carouselMain.scrollBy({ left: getItemWidth(carouselMainName, mainItems, carouselMain, nextBtnMain, prevBtnMain), behavior: 'smooth' });
    });

    prevBtnSecond.addEventListener('click', () => {
        carouselSecond.scrollBy({ left: -getItemWidth(carouselSecondName, secondItems, carouselSecond, nextBtnSecond, prevBtnSecond), behavior: 'smooth' });
    });
    nextBtnSecond.addEventListener('click', () => {
        carouselSecond.scrollBy({ left: getItemWidth(carouselSecondName, secondItems, carouselSecond, nextBtnSecond, prevBtnSecond), behavior: 'smooth' });
    });

    carouselMain.addEventListener('scroll', () => { updateOpacity(mainItems, carouselMain, nextBtnMain, prevBtnMain) });
    carouselSecond.addEventListener('scroll', () => { updateOpacity(secondItems, carouselSecond, nextBtnSecond, prevBtnSecond); });
    window.addEventListener('resize', () => { updateOpacity(mainItems, carouselMain, nextBtnMain, prevBtnMain); updateOpacity(secondItems, carouselSecond, nextBtnSecond, prevBtnSecond); });
});

function generateTab(items, list, next, prev) {
    var currentItem = [];
    const containerRect = list.getBoundingClientRect();
    items.forEach(item => {
        const rect = item.getBoundingClientRect();
        item.style.opacity = 1;
        //const fullyVisible = rect.left >= containerRect.left && rect.right <= containerRect.right;
        const fullyVisible = (rect.left - containerRect.left >= -5) && (containerRect.right - rect.right) >= -5;
        if (fullyVisible && item.style.display != 'none') {
            currentItem.push(item);
        }
        else
            currentItem.push(null);
    });
    if (currentItem[0] == items[0]) {
        currentItem.unshift(null);
    }

    if (currentItem[currentItem.length - 1] == items[items.length - 1]) {
        currentItem.push(null);
    }
    var count = 0;
    items.forEach(item => {
        if (item != null && item.style.display != 'none')
            count++;
    });

    next.style.display = null;
    prev.style.display = null;
    var displayedItem = [];

    items.forEach(item => {
        if (item.style.display != 'none') {
            displayedItem.push(item);
        }
    });

    if (currentItem.includes(displayedItem[displayedItem.length - 1]) || displayedItem.length == 0) {
        next.style.display = "none";
    }
    if (currentItem.includes(displayedItem[0]) || displayedItem.length == 0) {
        prev.style.display = "none";
    }
    return currentItem;
}

function updateOpacity(items, list, next, prev) {
    const tab = generateTab(items, list, next, prev);
    for (let i = 0; i < items.length; i++) {
        if (tab.includes(items[i]))
            items[i].style.opacity = '1';
        else
            items[i].style.opacity = '0.4';
    }
}

function getItemWidth(name, items, list, next, prev) {
    const firstItem = list.querySelector(name);
    if (!firstItem) return 0;
    var trueFirstItem;
    var tab = [];
    tab = generateTab(items, list, next, prev);

    for (let i = 0; i < tab.length; i++) {
        if (tab[i] != null) {
            trueFirstItem = tab[i];
            break;
        }
    }
    const style = getComputedStyle(list);
    const gap = parseFloat(style.columnGap);
    updateOpacity(items, list, next, prev);
    if (tab.length != items.length)
        return (trueFirstItem.offsetWidth + gap) * (style.getPropertyValue('--visible-items') - 0.5) - firstItem.offsetWidth * 0.25;
    else {
        return (trueFirstItem.offsetWidth + gap) * (style.getPropertyValue('--visible-items') - 0.5);
    }
}
