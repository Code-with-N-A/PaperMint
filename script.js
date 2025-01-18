let currentYear = 2022;
let currentSemester = 1;

function showSemesters(year) {
    currentYear = year;
    const semesterContainer = document.getElementById('semester-container');
    semesterContainer.style.display = 'grid';
    semesterContainer.innerHTML = '';

    // Change the background of active San
    const sanDivs = document.querySelectorAll('.san-row div');
    sanDivs.forEach(div => {
        div.classList.remove('active');
    });

    document.getElementById(`san-${year}`).classList.add('active');

    for (let i = 1; i <= 8; i++) {
        const semesterBox = document.createElement('div');
        semesterBox.classList.add('semester-box');
        semesterBox.innerText = `Semester ${i}`;
        semesterBox.onclick = function() {
            showSubjects(year, i);
            setActiveSemester(semesterBox);
        };
        semesterContainer.appendChild(semesterBox);
    }
}

function showSubjects(year, semester) {
    currentSemester = semester;
    const subjectLinksContainer = document.getElementById('subject-links');
    subjectLinksContainer.style.display = 'block';
    subjectLinksContainer.innerHTML = '';

    const subjects = pdfData[year][semester];
    for (const subject in subjects) {
        const subjectLink = document.createElement('a');
        subjectLink.innerText = subject;
        subjectLink.onclick = function() {
            openPdf(subjects[subject]);
            setActiveLink(subjectLink);
        };
        subjectLinksContainer.appendChild(subjectLink);
    }
}

function openPdf(pdfUrl) {
    const pdfViewer = document.getElementById('pdf-viewer');
    const downloadBtn = document.getElementById('download-btn');

    downloadBtn.href = pdfUrl;
    downloadBtn.style.display = 'inline-block';

    pdfViewer.style.display = 'block';
    pdfjsLib.getDocument(pdfUrl).promise.then(function(pdf) {
        pdfViewer.innerHTML = '';
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            pdf.getPage(pageNum).then(function(page) {
                const viewport = page.getViewport({ scale: 1.5 });
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.width = viewport.width;
                canvas.height = viewport.height;

                page.render({
                    canvasContext: context,
                    viewport: viewport
                }).promise.then(function() {
                    pdfViewer.appendChild(canvas);
                });
            });
        }
    }).catch(function(error) {
        console.error(error);
    });
}

function setActiveSemester(semesterBox) {
    const allSemesterBoxes = document.querySelectorAll('.semester-box');
    allSemesterBoxes.forEach(box => {
        box.classList.remove('active');
    });
    semesterBox.classList.add('active');
}

function setActiveLink(subjectLink) {
    const allLinks = document.querySelectorAll('.subject-links a');
    allLinks.forEach(link => {
        link.classList.remove('active');
    });
    subjectLink.classList.add('active');
}