var versionData = {};

async function fetchVersions() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/SunkenStudios/BetterThanRelease/refs/heads/main/versions.json');
        if (!response.ok) {
            throw new Error('Failed to fetch versions.json');
        }
        versionData = await response.json();
        if (window.location.href.includes('versions.html')){
            createVersionSections(versionData.versions);
        }
    } catch (error) {
        console.error('Error fetching versions:', error);
        versionData = {};
    }
}

function createVersionSections(versions) {
    const mainDiv = document.getElementById('main');
    
    versions.forEach(v => {
        // Create the section element
        const section = document.createElement('section');
        section.className = 'mid three_col social version';
        section.id = 'version';

        // Title row with version and download button
        const h2 = document.createElement('h2');
        const h3 = document.createElement('h1');

        const versionLink = document.createElement('a');
        versionLink.textContent = `Version ${v.version}`;

        const downloadLink = document.createElement('a');
        downloadLink.className = 'button button_download_version';
        downloadLink.textContent = 'Download now';
        downloadLink.onclick = () => downloadVersion(v.version);

        h2.appendChild(versionLink);
        h3.appendChild(downloadLink);
        h2.appendChild(h3);

        // Description
        const p = document.createElement('p');
        p.textContent = v.description;
        
        // Append everything
        section.appendChild(h2);
        section.appendChild(p);
        mainDiv.appendChild(section);
    });
}

fetchVersions();

function downloadVersion(version) {
    for (var i = 0; i < versionData.versions.length; i++) {
        if (versionData.versions[i].version === version) {
            var downloadUrl = versionData.versions[i].download;
            window.location.href = downloadUrl;
            return;
        }
    }
}

function downloadLatest() {
    var latestVersion = versionData.latest;
    downloadVersion(latestVersion);
}