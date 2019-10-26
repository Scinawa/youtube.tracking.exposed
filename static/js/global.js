
function buildApiUrl(apiName, option) {

    // const SERVER = 'https://youtube.tracking.exposed';
    const SERVER = 'http://localhost:9000';
    let rv = null;
    const api_path = "/api/v1/"

    if (window.location.origin.match(/localhost/)) {
        const x = SERVER;
        rv = option ? `${x}${api_path}${apiName}/${option}` : `${x}${api_path}${apiName}`;
        console.log(`Builing URL by hardcoded domains (development) URL composed ${rv}`);
    } else {
        rv = option ? `${api_path}${apiName}/${option}` : `${api_path}/${apiName}`;
        console.log(`Building URL by window...href (production) URL composed ${rv}`);
    }
    return rv;
}
