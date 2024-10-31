import insta from '../images/instagram_50.png'
import facebook from '../images/facebook_50.png'
import bandcamp from '../images/bandcamp_50.jpg'

export default function Footer(){
    return(
        <div className="App-footer">
            <footer>
                <a target="_blank" href="https://www.instagram.com/samholladayofficial/"><img class="social" id="insta" src={insta} /></a>
                <a target="_blank" href="https://www.facebook.com/samholladayofficial/"><img class="social" id="fb" src={facebook} /></a>
                <a target="_blank" href="https://samholladay.bandcamp.com/"><img class="social" src={bandcamp} /></a>
            </footer>
        </div>
    );
}