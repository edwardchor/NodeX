/**
 * Created by EdwardChor on 30/11/2016.
 */
angular.module('NodeX').controller('FunkUController',function(){
    var audioCtx = new (window.AudioContext || window.webkitAudioContext || window.WebkitAudioContext)();
    var timeDomainAnalyser = audioCtx.createAnalyser();

    var myAudio = document.querySelector("#music"); //Define the audio
    var source = audioCtx.createMediaElementSource(myAudio);
    // var frequencyDomainAnalyser = audioCtx.createAnalyser();

    var timeDomainCanvas = document.querySelector("#cvs1");
    var timeDomainCanvasCtx = timeDomainCanvas.getContext("2d");

    // var frequencyDomainCanvas = document.querySelector("#cvs2");
    // var frequencyDomainCanvasCtx = frequencyDomainCanvas.getContext("2d");


    source.connect(timeDomainAnalyser);
    timeDomainAnalyser.connect(audioCtx.destination);
    // frequencyDomainAnalyser.connect(audioCtx.destination);

    // var freqWidth = timeDomainCanvas.width;
    // var freqHeight = timeDomainCanvas.height;
    var timeWidth = timeDomainCanvas.width;
    var timeHeight = timeDomainCanvas.height;

    timeDomainAnalyser.fftSize = 2048;
    // frequencyDomainAnalyser.fftSize = 2048;

    var timeBufferLength = timeDomainAnalyser.fftSize;
    // var freqBufferLength = frequencyDomainAnalyser.frequencyBinCount;

    var timeDataArray = new Float32Array(timeBufferLength);
    // var freqDataArray = new Float32Array(freqBufferLength);

    timeDomainCanvasCtx.clearRect(0, 0, timeWidth, timeHeight);
    // frequencyDomainCanvasCtx.clearRect(0, 0, timeWidth, timeHeight);

    function timeDomainDraw() {
        drawVisual = requestAnimationFrame(timeDomainDraw);
        timeDomainAnalyser.getFloatTimeDomainData(timeDataArray);

        timeDomainCanvasCtx.fillStyle = 'rgb(255, 255, 255)';
        timeDomainCanvasCtx.fillRect(0, 0, timeWidth, timeHeight);
        timeDomainCanvasCtx.lineWidth = 1;
        timeDomainCanvasCtx.strokeStyle = 'rgb(0, 0, 0)';
        timeDomainCanvasCtx.beginPath();

        var sliceWidth = Math.PI*2.0 / timeBufferLength;
        var theta = 0;

        for (var i = 0; i < timeBufferLength; i++) {
            var r = timeHeight/3+timeDataArray[i] * 250.0;
            timeDomainCanvasCtx.strokeStyle = 'rgb('+255*0.1.toString()+'0, 0, 0)';
            timeDomainCanvasCtx.arc(timeWidth/2.0, timeHeight/2.0, r, theta, theta+sliceWidth,false);
            // if (i == timeBufferLength-1) {
            //     timeDomainCanvasCtx.close();
            // } else {
            //     continue;
            // }
            theta += sliceWidth;
        }
        timeDomainCanvasCtx.stroke();
    }


    // function frequencyDomainDraw() {
    //     drawVisual = requestAnimationFrame(frequencyDomainDraw);
    //     frequencyDomainAnalyser.getFloatFrequencyData(freqDataArray);
    //     frequencyDomainCanvasCtx.fillStyle = 'rgb(255,255, 255)';
    //     frequencyDomainCanvasCtx.fillRect(0, 0, timeWidth, timeHeight);
    //
    //     var barWidth = (timeWidth / freqBufferLength) * 2.5;
    //     var barHeight;
    //     var x = 0;
    //     for (var i = 0; i < freqBufferLength; i++) {
    //         barHeight = (freqDataArray[i] + 200) * 3;
    //         frequencyDomainCanvasCtx.fillStyle = 'rgb(' + Math.floor(barHeight + 100) + ',50,50)';
    //         frequencyDomainCanvasCtx.fillRect(x, freqHeight - barHeight / 2, barWidth, barHeight / 2);
    //         x += barWidth + 1;
    //     }
    // }

    timeDomainDraw();
    // frequencyDomainDraw();
});