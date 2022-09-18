const delay = (timeout = 500) => new Promise(proceed => setTimeout(proceed, timeout));

const getLikedVideos = () => document.querySelectorAll('ytd-playlist-video-renderer:not([is-dismissed])');

const scrollUp = async () => {
    window.scrollTo(0, 0);
    await delay(2000);

    if (!getLikedVideos().length) {
        return console.log('%cDone!', 'color:green');
    }

    return youtubeRemoveHundredLikedVideos();
};

const youtubeRemoveHundredLikedVideos = async () => {
    const likedVideos = getLikedVideos();

    if (!likedVideos.length) {
        return console.log('%cList is empty!', 'color:red');
    }

    let counter = 1;

    for (const video of Array.from(likedVideos)) {
        const titleLink = video.$['video-title'];
        const title = titleLink.innerText;
        const link = titleLink.getAttribute('href');
        const menu = video.$.menu;
        const menuBtn = menu.querySelector('#button');

        menuBtn.click();

        await delay();

        const submenuItems = document.querySelectorAll('ytd-menu-service-item-renderer');

        submenuItems[submenuItems.length - 1].click();

        console.log(`Unliked ${counter}/${likedVideos.length}\n%c${title}\nhttps://youtube.com${link}!`, 'color:blue');
        counter++;
        await delay();
    }

    await delay();
    return scrollUp();
};

await youtubeRemoveHundredLikedVideos();
