const reseaux = [
    { icon: "mail", name: "Email", link: "mailto:kieran@kieran.fr" },
    { name: "Twitter", link: "https://twitter.com/kieranfr" },
    { name: "GitHub", link: "https://github.com/kieranfr" },
    { name: "LinkedIn", link: "https://www.linkedin.com/in/kieranfr/" },
    { name: "Instagram", link: "https://www.instagram.com/kieranfr/" },
    { name: "Facebook", link: "https://www.facebook.com/kieranfr/" },
    { name: "YouTube", link: "https://www.youtube.com/channel/UCY8YJ2ZQZ8ZQZ8ZQZ8ZQZ8Q" },
    { name: "Twitch", link: "https://www.twitch.tv/kieranfr" },
    { name: "Discord", link: "https://discord.gg/8Z8Z8Z8" },
    { name: "Steam", link: "https://steamcommunity.com/id/kieranfr/" },
    { name: "Mastodon", link: "https://mastodon.social/@kieranfr" },
    { name: "Keybase", link: "https://keybase.io/kieranfr" },
    { name: "GitLab", link: "https://gitlab.com/kieranfr" }
]
const anniv = new Date("12/12/2002");
const age = Math.floor((new Date(Date.now() - anniv.getTime()) - 1970) / 31536000000);

window.addEventListener("DOMContentLoaded", () => {
    generateMenu();
    generateSocials();
    document.querySelectorAll(".age").forEach(element => element.innerText = age);
});

function generateSocials() {
    const socials = document.querySelector(".socials");
    reseaux.forEach(reseau => {
        const social = document.createElement("a");
        social.classList.add("button");
        social.href = reseau.link;
        if(reseau.link.startsWith('http')) social.target = "_blank";
        if(reseau.link.startsWith('http')) social.rel = "noopener";
        if (reseau.icon) {
            const icon = document.createElement("span");
            icon.classList.add("material-symbols-outlined");
            icon.innerText = reseau.icon;
            social.appendChild(icon);
        }
        social.innerHTML += ' ' + reseau.name;
        socials.appendChild(social);
    });
}

function generateMenu() {
    const sections = document.querySelectorAll("main section");
    sections.forEach(section => {
        console.log(section.id);
        if (section.id) {
            const menuItem = document.createElement("li");
            const menuItemLink = document.createElement("a");
            menuItemLink.href = `#${section.id}`;
            menuItemLink.textContent = section.querySelector(".title").innerText;
            menuItem.appendChild(menuItemLink);
            document.querySelector("header ul").appendChild(menuItem);
        }
    });
}