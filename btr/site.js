var versionData = {};

async function fetchVersions() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/SunkenStudios/BetterThanRelease/refs/heads/main/versions.json');
        if (!response.ok) {
            throw new Error('Failed to fetch versions.json');
        }
        versionData = await response.json();
        if (window.location.href.includes('versions.html')) {
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

        // Title row with version name
        const h2 = document.createElement('h2');
        h2.textContent = `Version ${v.version}`;

        // Description
        const p = document.createElement('p');
        p.textContent = v.description;

        // Download links (side by side, clickable text)
        const downloads = document.createElement('p');
        downloads.innerHTML = `
            <a style="cursor: pointer; margin-right: 20px;" onclick="downloadVersion('${v.version}', 'client')">Download Client</a>
            <a style="cursor: pointer;" onclick="downloadVersion('${v.version}', 'server')">Download Server</a>
        `;

        // Append everything
        section.appendChild(h2);
        section.appendChild(p);
        section.appendChild(downloads);
        mainDiv.appendChild(section);
    });
}

fetchVersions();

function downloadVersion(version, type) {
    for (var i = 0; i < versionData.versions.length; i++) {
        if (versionData.versions[i].version === version) {
            let v = versionData.versions[i];
            let downloadUrl = (type === "client") ? v.download : v.downloadServer;
            if (downloadUrl) {
                window.location.href = downloadUrl;
            } else {
                alert(`No ${type} download available for version ${version}`);
            }
            return;
        }
    }
}

function downloadLatest(type = "client") {
    var latestVersion = versionData.latest;
    downloadVersion(latestVersion, type);
}
