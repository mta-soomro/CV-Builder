function addEdu() {
    var div = document.createElement('div');
    div.className = "edu-item";
    div.innerHTML = '<input type="text" placeholder="Degree, School (Year)" class="edu-val" oninput="updatePreview()"><button onclick="this.parentElement.remove(); updatePreview()">Remove</button>';
    document.getElementById('edu-list').appendChild(div);
}

function addExp() {
    var div = document.createElement('div');
    div.className = "exp-item";
    div.innerHTML = '<input type="text" placeholder="Role, Company (Dates)" class="exp-val" oninput="updatePreview()"><button onclick="this.parentElement.remove(); updatePreview()">Remove</button>';
    document.getElementById('exp-list').appendChild(div);
}

function updatePreview() {
    var name = document.getElementById('fullName').value;
    if (name === "") {
        name = "YOUR FULL NAME";
    }
    var job = document.getElementById('jobTitle').value;
    if (job === "") {
        job = "Professional Title";
    }
    var email = document.getElementById('email').value;
    if (email === "") {
        email = "email@example.com";
    }
    var loc = document.getElementById('location').value;
    if (loc === "") {
        loc = "City, Country";
    }
    var about = document.getElementById('about').value;
    var languages = document.getElementById('langs').value;
    var references = document.getElementById('refs').value;

    var skillsInput = document.getElementById('skills').value;
    var skillsArray = skillsInput.split(',');
    var skillsHTML = '';
    for (var i = 0; i < skillsArray.length; i++) {
        var skill = skillsArray[i].trim();
        if (skill !== "") {
            skillsHTML += '<span class="skill-pill">' + skill + '</span>';
        }
    }

    var eduHTML = '';
    var eduInputs = document.querySelectorAll('.edu-val');
    for (var i = 0; i < eduInputs.length; i++) {
        var value = eduInputs[i].value;
        if (value !== "") {
            eduHTML += '<p>● ' + value + '</p>';
        }
    }

    var expHTML = '';
    var expInputs = document.querySelectorAll('.exp-val');
    for (var i = 0; i < expInputs.length; i++) {
        var value = expInputs[i].value;
        if (value !== "") {
            expHTML += '<p>● ' + value + '</p>';
        }
    }

    var previewHTML = '<div class="header-section"><div class="name-section"><h1>' + name.toUpperCase() + '</h1><p class="job-title">' + job + '</p></div><div class="contact-section"><p>Location: ' + loc + '</p><p>Email: ' + email + '</p></div></div>';

    if (about !== "") {
        previewHTML += '<h3>Executive Summary</h3><p>' + about + '</p>';
    }

    previewHTML += '<div class="main-content"><div class="left-column"><h3>Work Experience</h3>';
    if (expHTML === '') {
        previewHTML += '<p>No experience added yet</p>';
    } else {
        previewHTML += expHTML;
    }
    previewHTML += '<h3>Education</h3>';
    if (eduHTML === '') {
        previewHTML += '<p>No education added yet</p>';
    } else {
        previewHTML += eduHTML;
    }
    previewHTML += '</div><div class="right-column"><h3>Technical Skills</h3><div class="skills-container">';
    if (skillsHTML === '') {
        previewHTML += '<p>...</p>';
    } else {
        previewHTML += skillsHTML;
    }
    previewHTML += '</div><h3>Languages</h3><p>';
    if (languages === '') {
        previewHTML += 'Not specified';
    } else {
        previewHTML += languages;
    }
    previewHTML += '</p>';
    if (references !== "") {
        previewHTML += '<h3>References</h3><p>' + references + '</p>';
    }
    previewHTML += '</div></div>';

    document.getElementById('cv-preview').innerHTML = previewHTML;
}

function downloadPDF() {
    var element = document.getElementById('cv-preview');
    var name = document.getElementById('fullName').value;
    if (name === "") {
        name = "My_CV";
    }

    var noPrintElements = document.querySelectorAll('.no-print');
    noPrintElements.forEach(function(el) {
        el.style.display = 'none';
    });

    var opt = {
        margin: 0.2,
        filename: name + '_CV.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save().then(function() {
        noPrintElements.forEach(function(el) {
            el.style.display = 'block';
        });
    });
}

window.onload = function() {
    addEdu();
    addExp();
    updatePreview();
};
