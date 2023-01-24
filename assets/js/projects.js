let projects = [];
let tags = [];

window.addEventListener("DOMContentLoaded", async() => {
    await loadTags();
    generateTags();
    await loadProjects();
    generateProjects();
    filterProjects();
    document.querySelector("#project-modal .close").addEventListener("click", () => unfocusProject());
    document.querySelector("#project-modal").addEventListener("click", () => unfocusProject());
    document.querySelector("#image-modal .close").addEventListener("click", () => unfocusImage());
    document.querySelector("#image-modal").addEventListener("click", () => unfocusImage());
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
        const projectItem = document.createElement("div");
        const projectImg = document.createElement("img");
        const projectText = document.createElement("div");
        const projectTitle = document.createElement("h3");
        const projectTags = document.createElement("div");

        projectItem.className = "project";
        projectText.className = "text";
        projectTags.className = "tags";
        projectTitle.className = "title";

        projectImg.src = project.img;
        projectImg.alt = project.name;

        projectTitle.innerText = project.name;

        project.tags.filter(tag => tags.filter(t => t.id == tag).length > 0).forEach(tagId => {
            const tag = tags.filter(t => t.id == tagId)[0];
            const tagItem = document.createElement("div");
            tagItem.classList.add("tag");
            tagItem.setAttribute("data-tag", tag.id);
            tagItem.textContent = tag.label;
            projectTags.appendChild(tagItem);
        });

        projectItem.addEventListener("click", () => {
            focusProject(project);
        });

        projectText.appendChild(projectTitle);
        projectText.appendChild(projectTags);
        projectItem.appendChild(projectImg);
        projectItem.appendChild(projectText);
        document.querySelector("#projects-list").appendChild(projectItem);
    });
}

function filterProjects() {
    const tagsActive = [...document.querySelectorAll("#tags-list .tag.active")].map(tag => tag.getAttribute("data-tag"));
    const projects = [...document.querySelectorAll("#projects-list .project")];
    projects.forEach(project => {
        const projectTags = [...project.querySelectorAll(".tags .tag")].map(tag => tag.getAttribute("data-tag"));
        project.querySelectorAll(".tags .tag").forEach(tag => {
            if (tag.classList.contains("active")) tag.classList.remove("active");
        });
        if (tagsActive.length > 0) {
            if (tagsActive.filter(tag => projectTags.includes(tag)).length === tagsActive.length && tagsActive.length > 0) {
                project.style.display = "flex";
                project.querySelectorAll(".tags .tag").forEach(tag => {
                    if (tagsActive.includes(tag.getAttribute("data-tag"))) {
                        tag.classList.add("active");
                    }
                });
            } else {
                project.style.display = "none";
            }
        } else {
            project.style.display = "flex";
        }
    });
    const visibleProjects = projects.filter(p => p.style.display === "flex");
    if (visibleProjects.length === 0) {
        document.querySelector(".empty-projects").style.display = "flex";
    } else {
        document.querySelector(".empty-projects").style.display = "none";
    }
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
    if (project.buttons && project.buttons.length > 0) project.buttons.forEach(link => {
        const linkItem = document.createElement("a");
        const linkIcon = document.createElement("span");
        linkIcon.className = "material-symbols-outlined";
        linkIcon.innerText = link.icon;
        if(link.icon) linkItem.appendChild(linkIcon);
        linkItem.className = "button";
        linkItem.href = link.link;
        linkItem.target = "_blank";
        linkItem.innerHTML += link.name;
        projectButtons.appendChild(linkItem);
    });

    projectModal.addEventListener("click", e => e.stopPropagation());

    projectModal.appendChild(projectTitle);
    projectModal.appendChild(projectTags);
    projectModal.appendChild(projectDesc);
    if (project.images && project.images.length > 0) projectModal.appendChild(projectImages);
    if (project.buttons && project.buttons.length > 0) projectModal.appendChild(projectButtons);
    document.querySelector("#project-modal").appendChild(projectModal);
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
    tags.forEach(tag => {
        const tagItem = document.createElement("div");
        tagItem.classList.add("tag");
        tagItem.textContent = tag.label;
        tagItem.setAttribute("data-tag", tag.id);

        tagItem.addEventListener("click", () => {
            tagItem.classList.toggle("active");
            filterProjects();
        });

        document.querySelector("#tags-list").appendChild(tagItem);
    });
}