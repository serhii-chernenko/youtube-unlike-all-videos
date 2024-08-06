const delay = (timeout = 500) => new Promise(proceed => setTimeout(proceed, timeout));

const getLikedVideos = () => document.querySelectorAll('ytd-playlist-video-renderer:not([is-dismissed])');

const scrollUp = async () => {
    window.scrollTo(0, 0);
    await delay(2000);

    if (!getLikedVideos().length) {
        console.log('%cDone!', 'color:green');
        return;
    }

    await youtubeRemoveHundredLikedVideos();
};

const clickMenuButton = async (video) => {
    try {
        const menuBtn = video.querySelector('#menu #button');
        menuBtn.click();
        await delay();
    } catch (error) {
        console.error('Error clicking menu button:', error);
    }
};

const clickUnlikedButton = async () => {
    try {
        const submenuItems = document.querySelectorAll('ytd-menu-service-item-renderer');
        if (submenuItems.length > 0) {
            submenuItems[submenuItems.length - 1].click();
        }
        await delay();
    } catch (error) {
        console.error('Error clicking unliked button:', error);
    }
};

const youtubeRemoveHundredLikedVideos = async () => {
    const likedVideos = getLikedVideos();

    if (!likedVideos.length) {
        console.log('%cList is empty!', 'color:red');
        return;
    }

    let counter = 1;

    for (const video of Array.from(likedVideos)) {
        try {
            const titleLink = video.querySelector('#video-title');
            const title = titleLink ? titleLink.innerText : 'Unknown title';
            const link = titleLink ? titleLink.getAttribute('href') : 'Unknown link';

            await clickMenuButton(video);
            await clickUnlikedButton();

            console.log(`Unliked ${counter}/${likedVideos.length}\n%c${title}\nhttps://youtube.com${link}`, 'color:blue');
            counter++;
            await delay();
        } catch (error) {
            console.error('Error processing video:', error);
        }
    }

    await delay();
    await scrollUp();
};

(async () => {
    await youtubeRemoveHundredLikedVideos();
})();
