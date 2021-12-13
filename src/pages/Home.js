import React, { useContext, useEffect, useState } from 'react'
import '../App.css'
import paging from "../img/paging.png"
import settings from "../img/settings.png"
import distances from "../img/lfd-distances.jpg"
import input from "../img/input.jpg"


function Home() {

    const [buttonText, setButtonText] = useState(['>', '>', '>'])
    const [showText, setShowText] = useState([false, false, false])
    const [helpButtonText, setHelpButtonText] = useState(['>', '>', '>'])
    const [helpShowText, setHelpShowText] = useState([false, false, false])


    const buttonClickHandler = (i) => {
        console.log({ showText })
        let temp_bT = ['>', '>', '>']
        let temp_sT = [false, false, false]

        if (buttonText[i] == '>')
            temp_bT[i] = 'v'
        setButtonText(temp_bT)

        if (!showText[i])
            temp_sT[i] = true
        setShowText(temp_sT)

        setHelpShowText([false, false, false])
        setHelpButtonText(['>', '>', '>'])
    }

    const helpButtonClickHandler = (i) => {
        console.log({ showText })
        let temp_bT = ['>', '>', '>']
        let temp_sT = [false, false, false]

        if (helpButtonText[i] == '>')
            temp_bT[i] = 'v'
        setHelpButtonText(temp_bT)

        if (!helpShowText[i])
            temp_sT[i] = true
        setHelpShowText(temp_sT)
    }


    return (

        <div className='explanation container'>
            <p>
                <button onClick={() => buttonClickHandler(0)}>{buttonText[0]}</button> <h2> Worum geht es?</h2>
                <br />&nbsp;
                {showText[0] &&
                    <div className='theory'>
                        <p>Stell dir folgende Situation vor: Du schreibst an einer grösseren Arbeit, und leihst dir dazu Bücher aus der Bibliothek aus. Dabei darfst du maximal fünf Bücher ausleihen. Du brauchst aber deutlich mehr! Falls du ein Buch brauchst, das du nicht zu Hause hast, musst du jedes Mal in die Bibliothek laufen und ein Buch zurückgeben, damit du ein neues bekommst. Es könnte aber durchaus sein, dass du ein Buch, das du heute zurückgibst, nächste Woche wieder brauchst. Denn das ist ein weiteres Problem: Du kennst die Zukunft nicht! Und du weisst nicht, welche Bücher wieder nützlich sein werden. Du musst dir also jedes Mal gut überlegen, welches Buch du zurückgibst, damit du nicht unnötig in die Bibliothek laufen musst. Gibst du jenes zurück, das du am längsten ausgeliehen hast? Oder jenes, das du schon am längsten nicht mehr gebraucht hast? Oder vielleicht das, das du gerade als letztes ausgeliehen hast? Oder wählst du einfach zufällig eines der ausgeliehenen Bücher und gibst es zurück?</p>
                        <p className = 'image' ><img src={paging} alt="paging.png" width='100%' />< br /><span style={{ fontSize: 'small' }}>Bild aus: Dennis Komm, "Eine Einführung in Online-Algorithmen" (Vorlesungsskript)</span></p>
                        <p>Ein ähnliches Problem gibt es auch in der Informatik, wenn es um das Abspeichern und Abrufen von Daten geht. Wenn wir die Situation vereinfacht betrachten, dann ist ein Computer so aufgebaut, dass es einen <strong>Hauptspeicher</strong> hat, der die Information abspeichert, und eine <strong>CPU</strong>, die die Information verarbeitet. Verglichen mit der CPU ist der Hauptspeicher sehr langsam, sodass dieser die CPU abbremst. Deshalb hat es "nahe" bei der CPU den <strong>Cache</strong>. Das ist ein Speicher, der ebenfalls Information abspeichern und liefern kann, sogar viel schneller als der Hauptspeicher. Er ist jedoch teurer und deshalb auch viel kleiner als der Hauptspeicher. </p>
                        <p>Verglichen mit dem Bücherbeispiel ist es also so: Du bist die CPU, die Bibliothek ist der Hauptspeicher, und dein Arbeitstisch ist der Cache. Genauso, wie du bei deiner Arbeit nur die Bücher verwendest, die auf deinem Arbeitstisch liegen, verwendet die CPU die Datenblöcke (wir nennen sie "<strong>Seiten</strong>"), die im Cache liegen. Wenn du ein Buch brauchst, das nicht auf deinem Schreibtisch liegt, musst du in die Bibliothek laufen und verlierst Zeit. So muss auch der Computer eine benötigte Seite, die nicht im Cache ist, neu aus dem Hauptspeicher in den Cache laden und verliert dabei Zeit. Man nennt diesen Vorgang einen "<strong>Seitenfehler</strong>". Und so, wie du das Buch, das du zurückgibst, gut überlegt auswählen musst, muss sich entsprechend auch der Computer entscheiden, welche Seite aus dem Cache überschrieben werden soll. Und um genau dieses Problem geht es. </p>
                        <p>Eine weitere Gemeinsamkeit: So, wie du nicht vorhersagen kannst, welche Bücher du demnächst wieder brauchst, weiss der Computer ebenfalls nicht mit Sicherheit, welche Seiten in Zukunft von der CPU aufgerufen werden. Die Kette von aufgerufenen Seiten bzw. benötigten Büchern (man nennt dies den "<strong>Input</strong>") ist nur bis zum aktuellen Zeitpunkt bekannt. Für die Entscheidungsfindung kann nur die Information verwendet werden, die bis zum Zeitpunkt des Seitenaufrufs verfügbar ist. Man nennt das einen "<strong>Online-Algorithmus</strong>".</p>
                    </div>}
            </p>


            <p>
                <button onClick={() => buttonClickHandler(1)}>{buttonText[1]}</button> <h2>Die verschiedenen Algorithmen</h2>
                <br />&nbsp;
                {showText[1] &&
                    <div className='theory'>
                        <p>Wenn wir den oben genannten Prozess abstrahieren, bekommen wir 3 Schritte, die immer wieder durchgeführt werden:
                            <ol>
                                <li>Es wird eine Seite angefragt.</li>
                                <li>Falls diese Seite nicht im Cache ist: Entscheide, welche Seite aus dem Cache verdrängt bzw. überschrieben werden soll.</li>
                                <li>Falls nötig, überschreibe die Seite, die in Schritt 2 bestimmt wurde.</li>
                            </ol>
                            Es gibt verschiedene Algorithmen, um im Schritt 2 zu entscheiden, welche Seite im Cache ersetzt werden soll. Das sind die wichtigsten:</p>

                        <div className='block'><h3>First-In-First-Out (FIFO):</h3><p>Der Cache verhält sich wie eine Warteschlange: Es wird jene Seite verdrängt, die am längsten im Cache ist.</p></div>
                        <div className='block'><h3>Last-In-First-Out (LIFO):</h3> <p>Der Cache verhält sich wie ein Stapel: Es wird jene Seite verdrängt, die zuletzt in den Cache kam.</p></div>
                        <div className='block'><h3>Least-Recently-Used (LRU):</h3> <p>Es wird jene Seite verdrängt, deren letzter Aufruf am längsten her ist.</p></div>
                        <div className='block'><h3>Longest-Forward-Distance (LFD):</h3> <p>Es wird jene Seite verdrängt, die vom aktuellen Zeitpunkt aus erst möglichst spät (oder gar nicht) wieder angefragt wird.</p></div>

                        <p>Für den <strong>LFD</strong> muss man bereits die "Zukunft" kennen, also den gesamten Input mit allen Seitenaufrufen und deren Reihenfolge. Es ist deshalb ein sogenannter "<strong>Offline-Algorithmus</strong>". Dieser Algorithmus gibt uns die <strong>optimale Lösung</strong>, die möglichst wenig Seitenfehler verursacht.</p>
                        <p>In der Simulation kannst du all diese Algorithmen visualisieren und miteinander vergleichen. Ebenso kannst du jeweils eine <strong>zufällige</strong> Seite verdrängen, oder <strong>selbst auswählen</strong>, welche Seite verdrängt werden soll (also mit deinem eigenen Algorithmus).</p>
                        <p>Es ist so, dass wenn die Seitenanfragen rein zufällig geschehen, diese Online-Algorithmen dann bei langem Input durchschnittlich alle gleich gut (oder schlecht) sind, da es dann stochastisch gesehen nicht mehr darauf ankommt, welche Strategie verfolgt wird. Wenn wir die realistischere Annahme treffen, dass die Anfrage eine Seite aufruft, die in der Nähe der vorhergehenden Seite ist, dann sind FIFO und LRU besser als LIFO. Auch das kannst du in der Visualisierung einstellen und simulieren.</p>
                    </div>}
            </p>


            <p>
                <button onClick={() => buttonClickHandler(2)}>{buttonText[2]}</button> <h2>Wie kannst du die Visualisierung nutzen?</h2>
                <br />&nbsp;
                {showText[2] &&
                    <div className='theory explanation-settings'>

                        <button onClick={() => helpButtonClickHandler(0)}>{helpButtonText[0]}</button> <h3>Vor der Visualisierung kannst du folgende Einstellungen vornehmen: </h3>
                        {helpShowText[0] &&
                            <>  <img className = 'image' src={settings} alt="settings.png" width='50%' />
                                <ul>
                                    <li><strong style={{ color: 'red' }}>Algorithmen: </strong>Welche Algorithmen sollen visualisiert werden? Und in welcher Reihenfolge?
                                        <p style={{ fontSize: 'smaller' }}> Beachte, dass du LFD nicht durchführen kannst, bevor ein anderer Algorithmus ausgeführt wurde. Der Grund ist, dass LFD den Input im Voraus kennen muss (Offline-Algorithmus), und dieser wird bei den anderen Algorithmen (den Online-Algorithmen) definiert.</p>
                                    </li>
                                    <li><strong style={{ color: 'red' }}>Input: </strong> Sollen die Seiten, die aufgerufen werden, rein zufällig verteilt sein? Oder soll eine aufgerufene Seite in der Nähe der zuletzt aufgerufenen Seiten sein? Oder möchtest du einen "fiesen Gegenspieler", der die Seiten so aufruft, dass möglichst viele Seitenfehler entstehen? Oder willst du den Input doch lieber selbst bestimmen?
                                        <p style={{ fontSize: 'smaller' }}>Bei der zweiten Option wird eine Seite aufgerufen, die um die zuletzt aufgerufene Seite normalverteilt ist, wobei die Streuung von der Cache-Grösse und dem Zahlenbereich abhängen. Dadurch bekommt man eine Simulation, die realitätsnäher ist als eine rein zufällig aufgerufene Seite.</p>
                                        <p style={{ fontSize: 'smaller' }}>Der Gegenspieler funktioniert so, dass er genau jene Seite aufruft, die gerade verdrängt wurde und somit sicher nicht mehr im Cache ist.Beachte, dass wenn du mehrere Algorithmen hintereinander ausführst, der Gegenspieler nur für den ersten Algorithmus zum Einsatz kommt. Derselbe Input wird dann für die weiteren Algorithmen übernommen. Indem du die Reihenfolge der Algorithmen änderst, kannst du also den Gegenspieler der verschiedenen Algorithmen beobachten.</p>
                                    </li>
                                    <li><strong style={{ color: 'red' }}>Verarbeitung: </strong> Sämtliche Algorithmen bestehen aus 3 Schritten: Seite anfragen / Cache-Platz finden / Seite ersetzen. Du kannst wählen, ob du diese Teilschritte per Buttonklick ausführen willst, oder sie in einem (von dir bestimmten) Zeitintervall automatisch ausgeführt werden sollen.
                                    </li>
                                    <p></p>
                                    <li><strong style={{ color: 'red' }}>Cache und Zahlenbereich: </strong>Und schliesslich kannst du noch ein paar Details einstellen:
                                        <ul>
                                            <p>Wie gross ist der Cache?</p>
                                            <p>Soll er von Anfang an gefüllt sein, oder möchtest du dessen Initialisierung beobachten?
                                                <p style={{ fontSize: 'smaller', margin: 0 }} >Im ersten Fall füllt er aufsteigend mit den ersten Zahlen, im zweiten Fall füllt er mit Zufallszahlen. </p>
                                            </p>
                                            <p>Wie gross ist der Zahlenbereich, aus dem eine Seite aufgerufen wird? Oder anders ausgedrückt: Wie gross ist der Hauptspeicher?</p>
                                        </ul>
                                        <p>Beachte, dass der Cache natürlich kleiner als der Zahlenbereich bzw. den Hauptspeicher sein muss. (Sonst wäre der Hauptspeicher nicht mehr nötig, da alles in den Cache geladen werden kann!)</p>
                                    </li>
                                </ul>
                            </>
                        }
                        <p>
                            <button onClick={() => helpButtonClickHandler(1)}>{helpButtonText[1]}</button> <h3>Was du während der Visualisierung tun kannst: </h3>
                        </p>
                        {helpShowText[1] &&
                            <><p>Die Visualisierung geschieht gemäss deinen Einstellungen. Überall, wo du selbst aktiv werden kannst (oder musst), wird ein Element gelb, wenn du mit der Maus darüber fährst:
                                <div className = 'arrows' >
                                    <p> &rarr; &nbsp; Wenn du die schrittweise Verarbeitung gewählt hast, kannst du die Schritte durchklicken.</p>
                                    <p> &rarr; &nbsp; Wenn der benutzerdefinierte Algorithmus ausgeführt wird, kannst du, falls eine Seite aus dem Cache verdrängt werden muss, die Seite im Cache auswählen.</p>
                                    <p> &rarr; &nbsp;Wenn du einen benutzerdefinierten Input gewählt hast, kannst du die nächste Seite auswählen, die aufgerufen werden soll.</p>
                                </div>
                            </p>
                                <br />
                                <p>Je nach Situation hast du folgenden Buttons, die du drücken kannst: </p>
                                <div className='explaining-buttons'>
                                    <p><button>Seite anfragen</button>  <button>Cache-Platz finden</button>  <button>Seite ersetzen</button> &nbsp; &nbsp; Falls du bei den Einstellungen die schrittweise Verarbeitung gewählt hast, kannst du mit diesem Button die Schritte durchklicken.</p>
                                    <p><button>Pause</button> <button>Weiter</button> &nbsp; &nbsp;  Im automatischen Modus kannst du den Algorithmus anhalten, und dann wieder weiterlaufen lassen.</p>
                                    <p><button>Reset</button>  &nbsp; &nbsp;  Der aktuelle Algorithmus wird neu gestartet, der Input wird neu erzeugt.</p>
                                    <p><button>Input beenden</button>  &nbsp; &nbsp;  Damit kannst du den Input beenden abschliessen. Dieser Button erscheint nur beim ersten Algorithmus.</p>
                                    <p><button>Nächster Algorithmus</button>  &nbsp; &nbsp; Sobald ein Algorithmus den gesamten Input verarbeitet hat, kannst du den Input hiermit auf dem nächsten gewählten Algorithmus laufen lassen.</p>
                                    <p><button>Alles neu starten</button>  &nbsp; &nbsp;  Die gewählten Algorithmen werden wieder neu gestartet, der Input wird neu erzeugt.</p>
                                    <p><button>Beenden</button>  &nbsp; &nbsp; Sobald alle Algorithmen ausgeführt wurden, erscheint eine Übersicht mit den Seitenfehlern und dem Input.</p>
                                </div>
                                <p style={{ marginTop: 30 }}>Falls der LFD-Algorithmus ebenfalls ausgeführt wurde, wird ganz am Schluss bei der Zusammenfassung auch die <strong>Performance</strong> berechnet. Diese ist das Verhältnis der Seitenfehler und gibt an, wie gut der Algorithmus im Vergleich zur optimalen Lösung (LFD) ist. Je kleiner die Performance-Zahl, desto besser.</p>
                                <br />
                            </>}

                        <button onClick={() => helpButtonClickHandler(2)}>{helpButtonText[2]}</button> <h3>Hilfestellungen: </h3>
                        {helpShowText[2] &&
                            <> <p>Je nach Algorithmus erscheint beim Cache eine kleine Hilfe (in hellblauer Farbe), um den Algorithmus besser nachvollziehen zu können:
                                <img className = 'image' style={{ float: 'right', padding: 0, margin: 30, marginRight: 0, boxShadow: '10px 10px 20px #aaa' }} src={distances} alt="lfd-distances.jpg" width='50%' />
                                <div style={{ paddingLeft: 30 }}>
                                    <p>Bei FIFO wird die Seite markiert, die am längsten im Cache ist. Diese sollte beim nächsten Seitenfehler verdrängt werden.</p>
                                    <p>Bei LRU wird die Reihenfolge angezeigt, wie die Seiten in den Cache kamen. Diejenige, die als erste reinkam, sollte beim nächsten Seitenfehler verdrängt werden.</p>
                                    <p>Bei LFD wird die Distanz zum nächsten Aufruf dieser Seite gezeigt (siehe Bild). Falls die Seite nie mehr gebraucht wird, erscheint ein Unendlich-Symbol. Diese Seite sollte als nächste verdrängt werden. Sonst wird jene Seite verdrängt, die die grösste Distanz hat.</p>
                                </div>
                            </p>
                                <img className = 'image' style={{ float: 'right', padding: 0, margin: 0, marginLeft: 30, boxShadow: '10px 10px 20px #aaa' }} src={input} alt="input.jpg" width='20%' />
                                <br/> &nbsp;
                                <p style ={{  display: 'block'}}>Beim Input siehst du ein Protokoll: Die hellroten Zahlen wurden für das Auffüllen des Caches verwendet. Die grünen Zahlen waren bereits im Cache und mussten nicht ersetzt werden, die roten Zahlen erzeugten Seitenfehler. Bei den Seitenfehlern wird unterhalb der Zahl vermerkt, welche Seite aus dem Cache verdrängt wurde.</p>
                                <br /> &nbsp;

                            </>
                        }


                    </div >}

            </p >
        </div >
    )
}

export default Home
