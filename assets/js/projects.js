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
    await loadTags();
    await loadProjects();
    await generateTags();
    await generateMainProjects();
    await generateProjects();
    filterProjects();
    document.querySelector("#project-modal .close").addEventListener("click", () => unfocusProject());
    document.querySelector("#project-modal").addEventListener("click", () => unfocusProject());
    document.querySelector("#image-modal .close").addEventListener("click", () => unfocusImage());
    document.querySelector("#image-modal").addEventListener("click", () => unfocusImage());
    mainItems = carouselMain.querySelectorAll(carouselMainName);
    secondItems = carouselSecond.querySelectorAll(carouselSecondName);
    updateOpacity(mainItems, carouselMain, nextBtnMain, prevBtnMain);
    updateOpacity(secondItems, carouselSecond, nextBtnSecond, prevBtnSecond);
});

function loadProjects() {
    return new Promise((resolve, reject) => {
        fetch("data/projects.json").then(res => res.json()).then(json => {
            projects = json;
            resolve();
        }).catch(err => reject(err));
    });
}

function generateProjects() {
    projects.forEach(project => {
        if (project.keep && !project.jeux) {
            const projectItem = document.createElement("div");
            const projectImg = document.createElement("img");
            const projectText = document.createElement("div");
            const projectTitle = document.createElement("h3");
            const projectTags = document.createElement("div");
            const projectDate = document.createElement("h4");
            const projectDesc = document.createElement("p");
            const projectType = document.createElement("p");
            const projectImgDiv = document.createElement("div");

            projectDesc.className = "desc";
            projectType.className = "type";
            projectImgDiv.className = "imgDiv";
            projectItem.className = "project";
            projectText.className = "text";
            projectTags.className = "tags";
            projectTitle.className = "title";
            projectDate.className = "date";

            projectImg.src = project.img;
            projectImg.alt = project.name;

            projectTitle.innerText = project.name;
            projectDate.innerText = project.date;
            projectDesc.innerText = project.smalldesc;
            projectType.innerText = project.type;

            project.tags.filter(tag => tags.filter(t => t.id == tag).length > 0).forEach(tagId => {
                const tag = tags.filter(t => t.id == tagId)[0];
                const tagItem = document.createElement("div");
                tagItem.classList.add("tag");
                tagItem.setAttribute("data-tag", tag.id);
                tagItem.textContent = tag.shortlabel;
                projectTags.appendChild(tagItem);
            });

            projectItem.addEventListener("click", () => {
                focusProject(project);
            });

            projectText.appendChild(projectTitle);
            projectText.appendChild(projectDesc);
            projectText.appendChild(projectTags);
            //projectText.appendChild(projectDate);
            projectImgDiv.appendChild(projectImg);
            projectImgDiv.appendChild(projectType);

            projectItem.appendChild(projectImgDiv);
            //projectItem.appendChild(projectImg);
            projectItem.appendChild(projectText);
            document.querySelector("#projects-list").appendChild(projectItem);
        }
    });
}
function generateMainProjects() {
    projects.forEach(project => {
        if (project.keep && project.jeux) {
            const projectItem = document.createElement("div");
            const projectImg = document.createElement("img");
            const projectText = document.createElement("div");
            const projectTitle = document.createElement("h2");
            const projectDate = document.createElement("p");
            const projectDesc = document.createElement("p");
            const projectType = document.createElement("p");
            const projectTags = document.createElement("div");
            const projectImgDiv = document.createElement("div");

            projectItem.className = "projectMain";
            projectText.className = "text";
            projectTags.className = "tags";
            projectTitle.className = "title";
            //projectDate.className = "date";
            projectDesc.className = "desc";
            projectType.className = "type";
            projectImgDiv.className = "imgDiv";
            projectImg.src = project.img;
            projectImg.alt = project.name;

            projectTitle.innerText = project.name;
            if (project.period != null & project.year != null) {
                projectDate.innerText = project.period + " - " + project.year;
            } else {
                projectDate.innerText = project.date;
            }
            projectDesc.innerText = project.smalldesc;
            projectType.innerText = project.type;

            project.tags.filter(tag => tags.filter(t => t.id == tag).length > 0).forEach(tagId => {
                const tag = tags.filter(t => t.id == tagId)[0];
                const tagItem = document.createElement("div");
                tagItem.classList.add("tag");
                tagItem.setAttribute("data-tag", tag.id);
                tagItem.textContent = tag.shortlabel;
                projectTags.appendChild(tagItem);
            });

            projectItem.addEventListener("click", () => {
                focusProject(project);
            });

            projectText.appendChild(projectTitle);
            //projectText.appendChild(projectDate);
            projectText.appendChild(projectDesc);
            projectText.appendChild(projectTags);
            projectImgDiv.appendChild(projectImg);
            projectImgDiv.appendChild(projectType);
            //projectText.appendChild(projectType);

            projectItem.appendChild(projectImgDiv);
            //projectItem.appendChild(projectTags);
            projectItem.appendChild(projectText);
            document.querySelector("#mainProjects-list").appendChild(projectItem);
        }
    });
}


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

function focusProject(project) {
    const projectModal = document.createElement("section");
    const projectTitle = document.createElement("h2");
    const projectTags = document.createElement("div");
    const projectDesc = document.createElement("p");
    const projectImages = document.createElement("div");
    const projectButtons = document.createElement("div");

    projectModal.className = "modal";
    projectTitle.className = "title";
    projectTags.className = "tags";
    projectDesc.className = "desc";
    projectImages.className = "images";
    projectButtons.className = "buttons";

    projectTitle.innerText = project.name;
    project.tags.filter(tag => tags.filter(t => t.id == tag).length > 0).forEach(tagId => {
        const tag = tags.filter(t => t.id == tagId)[0];
        const tagItem = document.createElement("div");
        tagItem.classList.add("tag");
        tagItem.setAttribute("data-tag", tag.id);
        tagItem.textContent = tag.label;
        projectTags.appendChild(tagItem);
    });
    var allTitle = [];
    var allDesc = [];
    var allImage = [];
    if (project.titles != null) {
        for (var i = 0; i < project.description.length; i++) {
            if (project.titles != null) {
                projectTitleTemp = document.createElement("h3");
                projectTitleTemp.innerText = project.titles[i];
                allTitle.push(projectTitleTemp);
            }

            projectDescTemp = document.createElement("p");
            projectDescTemp.innerText = project.description[i];
            allDesc.push(projectDescTemp);
            var tempProjectImages = document.createElement("div");
            if (project.images[0][0] != null) {
                tempProjectImages.classList = "images";
                if (project.images && project.images[i] && project.images.length > 0) project.images[i].forEach(image => {
                    const imageItem = document.createElement("img");
                    imageItem.src = image.url;
                    imageItem.alt = image.legende || project.name;

                    imageItem.addEventListener("click", e => {
                        focusImage(image.url, image.legende || "");
                    });

                    tempProjectImages.appendChild(imageItem);
                });
                allImage.push(tempProjectImages)
            }
            //projectDescImage
        }
    } else {
        projectDesc.innerText = project.description;
        if (project.images && project.images.length > 0) project.images.forEach(image => {
            const imageItem = document.createElement("img");
            imageItem.src = image.url;
            imageItem.alt = image.legende || project.name;

            imageItem.addEventListener("click", e => {
                focusImage(image.url, image.legende || "");
            });

            projectImages.appendChild(imageItem);
        });
    }

    if (project.buttons && project.buttons.length > 0) project.buttons.forEach(link => {
        const linkItem = document.createElement("a");
        const linkIcon = document.createElement("span");
        linkIcon.className = "material-symbols-outlined";
        linkIcon.innerText = link.icon;
        if (link.icon) linkItem.appendChild(linkIcon);
        linkItem.className = "button";
        linkItem.href = link.link;
        linkItem.target = "_blank";
        linkItem.innerHTML += link.name;
        projectButtons.appendChild(linkItem);
    });

    projectModal.addEventListener("click", e => e.stopPropagation());

    projectModal.appendChild(projectTitle);
    projectModal.appendChild(projectTags);
    if (allTitle[0] != null) {
        for (var i = 0; i < allDesc.length; i++) {
            if (allTitle[0] != null)
                projectModal.appendChild(allTitle[i]);
            if (allDesc[0] != null)
                projectModal.appendChild(allDesc[i]);
            if (allImage[0] != null)
                projectModal.appendChild(allImage[i]);
        }
    } else {
        projectModal.appendChild(projectDesc);
    }

    if (project.buttons && project.buttons.length > 0) projectModal.appendChild(projectButtons);
    if (project.images && project.images.length > 0) projectModal.appendChild(projectImages);
    var toInsertBefore = document.getElementById("closeProject");
    document.querySelector("#project-modal").insertBefore(projectModal, toInsertBefore);
    document.querySelector("#project-modal").style.display = "flex";
}

function unfocusProject() {
    document.querySelectorAll("#project-modal .modal").forEach(modal => modal.classList.add("disappear"));
    document.querySelector("#project-modal").classList.add("disappear");
    setTimeout(() => {
        document.querySelector("#project-modal").style.display = "none";
        document.querySelector("#project-modal").classList.remove("disappear");
        document.querySelectorAll("#project-modal .modal").forEach(modal => modal.remove());
    }, 280);
}

function focusImage(img, legende) {
    const imageModal = document.createElement("section");
    const image = document.createElement("img");
    const imageLegende = document.createElement("p");

    imageModal.className = "modal image-modal";
    image.className = "image";
    imageLegende.className = "legende";

    image.src = img;
    image.alt = legende;
    imageLegende.innerText = legende;

    imageModal.addEventListener("click", e => e.stopPropagation());

    imageModal.appendChild(image);
    imageModal.appendChild(imageLegende);
    document.querySelector("#image-modal").appendChild(imageModal);
    document.querySelector("#image-modal").style.display = "flex";
}

function unfocusImage() {
    document.querySelectorAll("#image-modal .modal").forEach(modal => modal.classList.add("disappear"));
    document.querySelector("#image-modal").classList.add("disappear");
    setTimeout(() => {
        document.querySelector("#image-modal").style.display = "none";
        document.querySelector("#image-modal").classList.remove("disappear");
        document.querySelectorAll("#image-modal .modal").forEach(modal => modal.remove());
    }, 280);
}

function loadTags() {
    return new Promise((resolve, reject) => {
        fetch("data/tags.json").then(res => res.json()).then(json => {
            tags = json;
            resolve();
        }).catch(err => reject(err));
    });
}

function generateTags() {
    var tagsToShowMain = [];
    var tagsToShowSecond = [];
    projects.forEach(project => {
        if (project.jeux == false && project.keep == true) {
            project.tags.forEach(tag => {
                if (!tagsToShowSecond.includes(tag)) {
                    tagsToShowSecond.push(tag);
                }
            });
        }
        if (project.jeux == true && project.keep == true) {
            project.tags.forEach(tag => {
                if (!tagsToShowMain.includes(tag)) {
                    tagsToShowMain.push(tag);
                }
            });
        }
    });
    tags.forEach(tag => {
        if (tagsToShowSecond.includes(tag.id)) {
            const tagItem = document.createElement("div");
            tagItem.classList.add("tag");
            tagItem.textContent = tag.label;
            tagItem.setAttribute("data-tag", tag.id);
            tagItem.addEventListener("click", () => {
                tagItem.classList.toggle("active");
                filterProjects();
            });
            document.querySelector("#tags-listSecond").appendChild(tagItem);
        }
        if (tagsToShowMain.includes(tag.id)) {
            const tagItem = document.createElement("div");
            tagItem.classList.add("tag");
            tagItem.textContent = tag.label;
            tagItem.setAttribute("data-tag", tag.id);
            tagItem.addEventListener("click", () => {
                tagItem.classList.toggle("active");
                filterProjects();
            });
            document.querySelector("#tags-listMain").appendChild(tagItem);
        }
    });

    //updateOpacity('.projectMain');
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
