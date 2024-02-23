isPlaying = false;
document.addEventListener('click', function() {
    if (isPlaying) return;
    isPlaying = true;
    // Create audio element
    var audio = document.createElement('audio');
    audio.id = 'ambienceAudio';
    audio.src = '/ambience.ogg';
    audio.loop = true;
    audio.autoplay = true;

    // Append audio element to the body
    document.body.appendChild(audio);
    audio.play();
});