/* functions used in 'personal' visualization */

function getPubKey() {
    const t = window.location.href.split('/#').pop();
    if(t.length < 40 ) console.log("Wrong token length in the URL");
    return t;
}

function personal() {
    const pk = getPubKey();
    const url = buildApiUrl(`/personal/${pk}/`);

    $.getJSON(url, (data) => {
        console.log("personal API, retrieved", _.size(data));
        let lastTimed = "";

        _.each(data.metadata, function(video) {
            if(lastTimed != video.relative) {
                addTimeHeader(video.relative);
                lastTimed = video.relative;
            }
            buildTable(video);
        });
    });
}

function downloadCSV() {
    const pk = getPubKey();
    const csvurl = `/api/v1/personal/${pk}/csv`;
    console.log("downloadCSV from: ", csvurl);
    window.open(csvurl);
}


function buildTable(video) {
    let tbody = "<tr>";
    _.each(video.related, function(r) {
        tbody += `
    <td>
        <small>${r.index}</small>
        ${r.title}
    </td>
`;
        if((r.index % 4) == 0)
            tbody += "</tr><tr>";
    });

    const h=`
<table class="table videoblock">
    <thead>
        <tr>
            <td>
                ${video.title}
                <a class="compareLink" href="/compare/${video.videoId}">
                    compare
                </a>
            </td>
            <td>
                ${video.authorName}
                <br>
            </td>
            <td>${video.viewInfo.viewStr}</td>
            <td>Related: #${video.relatedN}</td>
    </thead>
    ${tbody}
</table>
`;
    /*
     <a class="compareLink" href="/author/${video.videoId}">
     Search by author
     </a>
     */
    $("#report").append(h);
};

function addTimeHeader(timestring) {
    const h =`<p class="timeheader">${timestring}</p>`;
    $("#report").append(h);
}
