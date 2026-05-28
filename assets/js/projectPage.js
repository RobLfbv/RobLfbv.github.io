
window.addEventListener("DOMContentLoaded", async () => {
    document.querySelector("#image-modal .close").addEventListener("click", () => unfocusImage());
    document.querySelector("#leaveScreen").addEventListener("click", () => unfocusImage());
    var projectDesc = document.getElementsByClassName("desc");
    var imagesDiv = projectDesc[0]?.querySelectorAll(".images");
    imagesDiv.forEach(div => {
        const imagesDiv = div.querySelectorAll("img");
        console.log(imagesDiv)
        for (let i = 0; i < imagesDiv.length; i++) {
            imagesDiv[i].addEventListener("click", e => {
                focusImage(imagesDiv[i].src, imagesDiv[i].alt || "", div, i);
            });
        }
    });
});

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