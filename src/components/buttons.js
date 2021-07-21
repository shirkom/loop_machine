import {Component} from 'react'
import Button from './button'
import './buttons.css'

import Bass from './sounds/bass.mp3'
import BreakBeats from './sounds/breakbeats.mp3'
import ElectricGuitar from './sounds/electricGuitar.mp3'
import Funk from './sounds/funk.mp3'
import Groove from './sounds/groove.mp3'
import MazePolitics from './sounds/mazePolitics.mp3'
import SilentStar from './sounds/silentStar.mp3'
import StompySlosh from './sounds/stompySlosh.mp3'
import Tanggu from './sounds/tanggu.mp3'

import BassImg from './images/bass-guitar.png'
import HeartBeatImg from './images/heart-beat.png'
import AlientImg from './images/alient.png'
import ElectricDrumsImg from './images/electric_drums.png'
import DrumImg from './images/drum.png'
import DjImg from './images/dj.png'
import PipeOrganImg from './images/pipe_organ.png'
import CowboyImg from './images/cowboy.png'
import ClashCymbalsImg from './images/clash_cymbals.png'



class Buttons extends Component {
    state = 
    {
        isPlay: false,
        intervalId: null,
        buttonsStates: [false, false, false, false, false, false, false, false, false],
        images: [
            BassImg, HeartBeatImg, CowboyImg,
            DjImg, ClashCymbalsImg, AlientImg,
            PipeOrganImg, ElectricDrumsImg, DrumImg
        ],
        audioNames: [
            'Bass', 'BreakBeats', 'ElectricGuitar',
            'Funk', 'Groove', 'MazePolitics',
            'SilentStar', 'StompySlosh', 'Tanggu'
        ],
        audios: [
            new Audio(Bass), new Audio(BreakBeats), new Audio(ElectricGuitar),
            new Audio(Funk), new Audio(Groove), new Audio(MazePolitics),
            new Audio(SilentStar), new Audio(StompySlosh), new Audio(Tanggu), 
        ]
    }

    updateButtonStatus(index, status)
    {
        // If status is disabled stop the audio
        if(!status)
        {
            this.state.audios[index].pause();
            this.state.audios[index].currentTime = 0;
        }

        let newButtonsStates = [...this.state.buttonsStates];
        newButtonsStates[index] = status;
        this.setState({buttonsStates: newButtonsStates});
    }

    playOneCycle()
    {
        for(let i = 0; i < this.state.audios.length; ++i)
        {
            // Replay audio if state is true
            if(this.state.buttonsStates[i])
            {
                this.state.audios[i].currentTime = 0;
                this.state.audios[i].play();
            }
            // Else stop the audio
            else
            {
                this.state.audios[i].currentTime = 0;
                this.state.audios[i].pause();
            }
        }
    }

    onPlay()
    {
        if(this.state.isPlay)
        {
            return;
        }

        // if not playing start new cycle
        this.playOneCycle();
        const intervalId = setInterval(() => {
            this.playOneCycle();
        }, 4000)
        this.setState({isPlay: true, intervalId: intervalId});   
    }

    onStop()
    {
        if(!this.state.isPlay)
        {
            return;
        }

        // if playing stop audio
        this.setState({isPlay: false});
        clearInterval(this.state.intervalId);
        for(let i = 0; i < this.state.audios.length; ++i)
        {
            this.state.audios[i].currentTime = 0;
            this.state.audios[i].pause();
        }
    }

    render() {

        return (
            <div className="Container">
                <div className="AllTheButtons">
                    {
                        this.state.audioNames.map((name, index) => {
                            return (
                                <Button 
                                img={this.state.images[index]}
                                key={name}
                                data={name}
                                onClick={
                                    (status) => this.updateButtonStatus(index, status)
                                }/>
                            )
                        })
                    }
                </div>
                <div className="ControlsButtons">

                    <button className="PlayButton" disabled={this.state.isPlay}
                    onClick={() => {this.onPlay()}}>
                        Play
                    </button>

                    <button className="StopButton" disabled={!this.state.isPlay}
                     onClick={() => {this.onStop()}}>
                        Stop
                    </button>

                </div>
                
            </div>
        )
    }
}

export default Buttons

