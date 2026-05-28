module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("assets");
    eleventyConfig.addPassthroughCopy("data");
    eleventyConfig.addPassthroughCopy("data/svg");
    eleventyConfig.addPassthroughCopy("data/svg");


    eleventyConfig.addFilter("transformCustomTags", function (text, project) {
        var textToModif = text;
        const regexReplace = /\$[!img=\d{1,}!]{1,}\$/i;
        const regexMatch1 = /\$(.*?)\$/gm;
        const regexMatch2 = /(?<=!img=)\d+(?=!)/gm;

        const startDiv = "<div class=images>";
        const endDiv = "</div>";
        const startImg = "<img src=\"/";
        const altImg = "\" alt=\"";
        const endImg = "\">";
        var allDivToReplace = [];
        var allDiv = textToModif.match(regexMatch1);
        if (allDiv != null) {
            for (let i = 0; i < allDiv.length; i++) {
                var allImages = allDiv[i].match(regexMatch2);
                var images = "";
                if (allImages != null) {
                    allImages.forEach(image => {
                        images += startImg + project.images[image].url + altImg + project.images[image].legende + endImg;
                    });
                }

                allDivToReplace.push(startDiv + images + endDiv);
            }
            allDivToReplace.forEach(div => {
                textToModif = textToModif.replace(regexReplace, div);
            });
        }
        const regexReplaceEmbed = /\£[!emb=\d{1,}!]{1,}\£/i;
        const regexMatch1Embed = /\£(.*?)\£/gm;
        const regexMatch2Embed = /(?<=!emb=)\d+(?=!)/gm;
        const startDivEmbed = "<div class=embed>";
        const endDivEmbed = "</div>";
        const startEmbed = "<iframe";
        const widthEmbed = " width=\"";
        const heightEmbed = "\" height=\""
        const srcEmbed = "\" src=\"";
        const titleEmbed = "\" title=\"";
        const endEmbed = "\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>";
        var allDivToReplace = [];
        var allDiv = textToModif.match(regexMatch1Embed);
        if (allDiv != null) {
            for (let i = 0; i < allDiv.length; i++) {
                var allEmbed = allDiv[i].match(regexMatch2Embed);
                var embeds = "";
                if (allEmbed != null) {
                    allEmbed.forEach(embed => {
                        embeds += startEmbed + widthEmbed + project.embed[embed].width + heightEmbed + project.embed[embed].height + srcEmbed + project.embed[embed].url + titleEmbed + project.embed[embed].title + endEmbed;
                    });
                }

                allDivToReplace.push(startDivEmbed + embeds + endDivEmbed);
            }
            allDivToReplace.forEach(div => {
                textToModif = textToModif.replace(regexReplaceEmbed, div);
            });
        }

        return textToModif;
    });

    eleventyConfig.addFilter("getTag", function (tagsList, tagIdToFind) {
        return tagsList.find(tagObj => tagObj.id === tagIdToFind);
    });

    eleventyConfig.addFilter("isTagUsed", function (projectsList, tag, jeux) {
        if (!projectsList) return false;
        return projectsList.some(project => {
            if (project.keep && project.jeux == jeux)
                return project.tags.includes(tag.id);
        });
    });
};