document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.getElementById('mainProjects-list');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    var items = carousel.querySelectorAll('.projectMain');

    function generateTab() {
        items = carousel.querySelectorAll('.projectMain');
        var currentItem = [];
        const containerRect = carousel.getBoundingClientRect();
        items.forEach(item => {
            const rect = item.getBoundingClientRect();
            item.style.opacity = 1;
            const fullyVisible = rect.left >= containerRect.left && rect.right <= containerRect.right;
            if (fullyVisible)
                currentItem.push(item);
            else
                currentItem.push(null);
        });
        if (currentItem[0] == items[0]) {
            currentItem.unshift(null);
        }
        if (currentItem[currentItem.length - 1] == items[items.length - 1]) {
            currentItem.push(null);
        }
        return currentItem;
    }
    
    function getItemWidth() {
        const firstItem = carousel.querySelector('.projectMain');
        if (!firstItem) return 0;
        var tab = [];
        tab = generateTab();
        console.log(tab);
        const style = getComputedStyle(carousel);
        const gap = parseFloat(style.columnGap);
        updateOpacity();
        if (tab.length != items.length)
            return (firstItem.offsetWidth + gap) * (style.getPropertyValue('--visible-items') - 0.5) - firstItem.offsetWidth * 0.25;
        else {
            return (firstItem.offsetWidth + gap) * (style.getPropertyValue('--visible-items') - 0.5);
        }
    }

    prevBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: -getItemWidth(), behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: getItemWidth(), behavior: 'smooth' });
    });

    function updateOpacity() {
        console.log("opacity");
        const tab = generateTab();
        console.log(tab);
        for (let i = 0; i < items.length; i++) {
            if (tab.includes(items[i]))
                items[i].style.opacity = '1';
            else
                items[i].style.opacity = '0.4';
        }
    }


    carousel.addEventListener('scroll', updateOpacity);
    window.addEventListener('resize', updateOpacity);
    updateOpacity();
});
