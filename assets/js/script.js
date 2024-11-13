var showChapter = document.getElementById('ShowChapter');
var Download_Pc = document.getElementById('Download_Pc');
var Download_Mobile = document.getElementById('Download_Mobile');

const urlParams = new URLSearchParams(window.location.search);
const userid = urlParams.get('userid');

// Check if 'userid' is not present
if (!userid) {
    // Redirect to another website if 'userid' is not found
    // window.location.href = 'https://google.com';
}

showChapter.addEventListener('click', function handleShowChapterClick() {
    var Video = document.getElementById('Video_input').value;
    var Note = document.getElementById('Note_input').value;
    var Dpp = document.getElementById('Dpp_input').value;

    if (!Video && !Note && !Dpp) {
        alert("At least one field should be filled.");
        return;
    }

    try {
        var chapterName = "";

        if (Video !== "") {
            var VideoData = JSON.parse(Video);
            VideoData.data.slice().reverse().forEach(function (item, index) {
                if (!item.hasOwnProperty('videoDetails')) {
                    var ch_img = "https://www.pw.live/study/assets/banner.png";
                    document.getElementById('chaper-img').style.backgroundImage = 'url("' + ch_img + '")';
                }

                if (item.hasOwnProperty('tags') && Array.isArray(item.tags) && item.tags.length > 0) {
                    chapterName = item.tags[0].name;
                    var cleanedName = chapterName.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ");
                    document.getElementById('Chapter_Name').textContent = cleanedName;
                    document.getElementById('Chapter_Name2').textContent = cleanedName;

                    try {
                        document.getElementById('chaper-img').style.backgroundImage = 'url("' + item.videoDetails.image + '")';
                    } catch (error) {
                        var ch_img = "https://www.pw.live/study/assets/banner.png";
                        document.getElementById('chaper-img').style.backgroundImage = 'url("' + ch_img + '")';
                    }
                    document.getElementById('total_lec').textContent = VideoData.data.length;
                }
            });
        }

        if (Note !== "") {
            var NoteData = JSON.parse(Note);
            NoteData.data.slice().reverse().forEach(function (item, index) {
                if (Video === "") {
                    if (!item.hasOwnProperty('videoDetails')) {
                        var ch_img = "https://www.pw.live/study/assets/banner.png";
                        if (chapterName === "") {
                            chapterName = item.homeworkIds[0].topic.match(/^[^\d:]+/)[0].trim();
                            document.getElementById('Chapter_Name').textContent = chapterName;
                            document.getElementById('Chapter_Name2').textContent = chapterName;
                        }
                        document.getElementById('chaper-img').style.backgroundImage = 'url("' + ch_img + '")';
                    }
                }
            });
            document.getElementById('total_notes').textContent = NoteData.data.length;
        }

        if (Dpp !== "") {
            var DppData = JSON.parse(Dpp);
            DppData.data.slice().reverse().forEach(function (item, index) {
                if (Video === "") {
                    if (!item.hasOwnProperty('videoDetails')) {
                        var ch_img = "https://www.pw.live/study/assets/banner.png";
                        if (chapterName === "") {
                            chapterName = item.homeworkIds[0].topic.match(/^[^\d:]+/)[0].trim();
                            document.getElementById('Chapter_Name').textContent = chapterName;
                            document.getElementById('Chapter_Name2').textContent = chapterName;
                        }
                        document.getElementById('chaper-img').style.backgroundImage = 'url("' + ch_img + '")';
                    }
                }
            });
            document.getElementById('total_dpps').textContent = DppData.data.length;
        }

        if (chapterName == "") {
            chapterName = "chapter"
        }

        const data = {
            id: userid,
            batch: "free",
            resolution: document.getElementById("resolution").value,
            chapter: chapterName.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " "),
            data: {
                videoData: Video,
                noteData: Note,
                dppData: Dpp
            }
        };

        Download_Pc.addEventListener("click", function handleClick() {
            pcDownloadHandler(data);
            //Download_Pc.removeEventListener("click", handleClick); // Remove the event listener after the first click
        });
        

    } catch (error) {
        var warn_img = document.getElementById('chaper-img');
        warn_img.src = 'assets/images/warning.png';
        alert(error.message);
        setTimeout(function () {
            window.location.reload();
        }, 2000);
        var Ch_name = document.getElementById('Chapter_Name');
        var Ch_name2 = document.getElementById('Chapter_Name2');
        Ch_name.textContent = 'Chapter Name';
        Ch_name2.textContent = '';
        document.getElementById('output').innerHTML = '';
    }

    // Remove the click event listener after the first click
    showChapter.removeEventListener('click', handleShowChapterClick);
});

function pcDownloadHandler(data) {

    console.log(data);

    fetch("https://solid-tribble-q77g77g55ww5f69v6-7861.app.github.dev/data", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Success:", data);
	alert("File sended to Bot. Please check Script Maker Bot")
	//window.location.href = './send.html';
    })
    .catch(error => {
        console.error("Error:", error.message);
    });
}
