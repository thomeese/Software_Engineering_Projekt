# Installation

Für das Frontend wird das Framework Ionic unter Zuhilfenahme von Angular verwendet, diese müssen vor der Verwendung installiert werden.


## NodeJs

Für eine einfache Installation der Frameworks und ggf. weiterer Plugins, für die Entwicklung, bietet es sich an Node.js zu verwenden.<br />
Falls das Tool noch nicht vorhanden ist, kann es unter folgendem Link heruntergeladen werden: <br />
https://nodejs.org/de

## Angular

Instalation von Angular über die Konsole.<br />
Vorher Node.js installieren. 

Befehl: 
```
npm install -g @angular/core
```

## Ionic

Instalation von Angular über die Konsole.<br />
Vorher Node.js installieren.

Befehl: 
```
npm install -g @ionic/cli
```

## Entwicklungsumgebung
Für die Entwicklung können Umgebungen wie IDEA, Webstorm oder VS Code verwendet werden.<br />
Empfohlen ist die Verwendung von Webstorm, da diese Umgebung für die Webentwicklung optiert ist.<br />
Falls sie noch noch nicht vorhanden sein sollte kann sie über folgenden Link installiert werden:<br />
https://www.jetbrains.com/webstorm/download/#section=windows <br />
Falls die Jetbrains Toolbox vorhanden sein sollte kann es auch darüber installiert werden.<br />
Man kann auch andere Tools benutzen.

# Verwendung

Das Repository kann einfach via clone lokal hinzugefügt und das Projekt anschließend in Webstorm geöffnet<br />
werden. Ggf. müssen noch einige Plugins nach installiert werden. In Webstorm geschieht das in der Regel<br />
automatisch, falls das jedoch nicht funktionieren sollte müssen sie manuell installiert werden. Die <br />
verwendeten Dependencies können in der *package.json*-Datei eingesehen werden. Dort werden auch die fehlenden .<br />
Plugins markiert (wenn in der IDE geöffnet). Druch ein schnelles googeln der Zeile erhält man das benötigte.<br />
Kommando für die Installation.<br />

# Starten des lokalen Webservers

Um das Frontend während des Entwicklungsprozesses auch visuell sehen zu können, bietet Ionic einen lokalen Websever.<br />
Dieser kann via Konsole oder direkt in der IDE im Terminal-Tab durch `ionic serve` gestartet werden. Die Änderungen<br /> 
im Quellcode werden nach dem Speichern (Strg+S) live im Server visualisiert.

# Befehle für die Console

Nach dem man sich das Repository geklont hat einmal diesen Befehl ausführen.
```
npm i
```

Ausführen im Ionic Projekt */frontend_lademanagement* um das Frontend zu starten.
```
ionic serve
```
Falls **Probleme** auftreten.
```
ionic repair
```