module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("assets");
    // Notre filtre "Tech Art"
    eleventyConfig.addFilter("transformCustomTags", function (text, project) {
        let output = text;

        // 1. Remplacer les images : $!img=X!$
        // On cherche $!img= un nombre ! et on le remplace par la balise <img>
        output = output.replace(/\$!img=(\d+)!/g, (match, index) => {
            const imgData = project.images[index];
            return `<figure>
                <img src="/${imgData.url}" alt="${imgData.legende}">
                <figcaption>${imgData.legende}</figcaption>
              </figure>`;
        });

        // 2. Remplacer les embeds : £!emb=X!£
        output = output.replace(/£!emb=(\d+)!£/g, (match, index) => {
            const embData = project.embed[index];
            return `<iframe width="${embData.width}%" height="400" src="${embData.url}" title="${embData.title}"></iframe>`;
        });

        return output;
    });

};
