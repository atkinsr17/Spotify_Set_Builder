import * as $ from "jquery";
const fs = require('fs');


getAudioAnalysis = (token, id) => {
    $.ajax({
        url: "https://api.spotify.com/v1/audio-analysis/" + id,
        type: "GET",
        beforeSend: (xhr) => {
            xhr.setRequestHeader("Authorization", "Bearer " + token);
        },
        success: (data) => {
            const payload = JSON.stringify(data);
            fs.writeFileSync('../../data.json', payload);
        }
    });
};

export default getAudioAnalysis();

