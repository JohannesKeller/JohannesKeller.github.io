window.addEventListener("load", function () {
    var level = 0;
    var weiblich = true;
    var alter = 0;
    var preisspanneMin = 0;
    var preisspanneMax = 0;
    var person = "unknown";
    var artyom = new Artyom();

    var commands = [
        {
            indexes: ["Ja","Ja, bitte"],
            smart: false,
            action: function()
            {
                if(level == 15)
                {
                    artyom.say("Deine Bestellung wird verarbeitet und vorraussichtlich in 2 Tagen bei dir eintreffen.");
                    level = 0;
                    document.getElementById("level").innerHTML = "Ende";
                    document.getElementById("antworten").innerHTML = "";
                }
                if(level == 14)
                {
                    artyom.say("Möchtest du deine übliche Lieferadresse in Furtwangen und PayPal als Zahlungsmittel verwenden?");
                    level = 15;
                    document.getElementById("level").innerHTML = "Level: 15";
                    document.getElementById("antworten").innerHTML = "</div>Ja<div></div>Nein<div>";
                }
                if(level == 13)
                {
                    artyom.say("Okay, für wen ist das nächste Geschenk bestimmt?");
                    level = 2;
                    document.getElementById("level").innerHTML = "Level: 2";
                    document.getElementById("antworten").innerHTML = "</div>Für meine/meinen...<div>";
                }
                if(level == 10)
                {
                    artyom.say("Das freut mich! Welcher Artikel hat dir am meisten zugesagt?");
                    level = 12;
                    document.getElementById("level").innerHTML = "Level: 12";
                    document.getElementById("antworten").innerHTML = "</div>Artikel...<div>";
                }
                if(level == 11)
                {
                    artyom.say("Hier drei weitere Artikel. Artikel 1, Artikel 2 und Artikel 3 . War etwas für deine " + person + " dabei?");
                    level = 10;
                    document.getElementById("level").innerHTML = "Level: 10";
                    document.getElementById("antworten").innerHTML = "</div>Ja<div></div>Nein<div>";
                }
                if(level == 8)
                {
                    artyom.say("An dieser Stelle würden nun weitere Fragen folgen um die Geschenke weiter zu filtern. Stattdessen werden nun direkt 3 Artikel präsentiert.");
                    artyom.say("Ich habe einige Artikel gefunden und werde dir die drei passendsten nun Präsentieren. Artikel 1, Artikel 2 und Artikel 3 . War etwas für deine " + person + " dabei?");
                    level = 10;
                    document.getElementById("level").innerHTML = "Level: 10";
                    document.getElementById("antworten").innerHTML = "</div>Ja<div></div>Nein<div>";
                }
                if(level == 7)
                {
                    if (weiblich){
                        artyom.say("Hört sie gerne Musik?");
                    }else{
                        artyom.say("Hört er gerne Musik?");
                    }
                    level = 8;
                    document.getElementById("level").innerHTML = "Level: 8";
                    document.getElementById("antworten").innerHTML = "<div>Ja</div><div>Nein</div><div>Weiß nicht</div>";
                }
                if(level == 6)
                {
                    if (weiblich){
                        artyom.say("Treibt sie gerne Sport?");
                    }else{
                        artyom.say("Treibt er gerne Sport?");
                    }
                    level = 7;
                    document.getElementById("level").innerHTML = "Level: 7";
                    document.getElementById("antworten").innerHTML = "<div>Ja</div><div>Nein</div><div>Weiß nicht</div>";
                }
                if(level == 1)
                {
                    artyom.say("Dann lass uns mit dem ersten Geschenk beginnen. Für wen ist dieses bestimmt?");
                    level = 2;
                    document.getElementById("level").innerHTML = "Level: 2";
        document.getElementById("antworten").innerHTML = "<div>Für meine/meinen...</div>";
                }
                
            }
        },
        {
            indexes: ["Nein", "Weiß nicht"],
            smart: false,
            action: function()
            {
                if(level == 15)
                {
                    artyom.say("Für diesen Fall wurde ich leider noch nicht eingelernt. Daher schicke ich dich zurück und Frage erneut: Möchtest du deine übliche Lieferadresse in Furtwangen und PayPal als Zahlungsmittel verwenden?");
                    level = 15;
                    document.getElementById("level").innerHTML = "Level: 15";
                    document.getElementById("antworten").innerHTML = "</div>Ja<div></div>Nein<div>";
                }
                if(level == 14)
                {
                    artyom.say("Okay, die Geschenke liegen in deinem Warenkorb, wo du sie selbst einsehen und bei Bedarf bestellen kannst");
                    level = 0;
                    document.getElementById("level").innerHTML = "Ende";
                    document.getElementById("antworten").innerHTML = "";
                }
                if(level == 13)
                {
                    artyom.say("Darf ich dir die Bestellung dann direkt zusenden?");
                    level = 14;
                    document.getElementById("level").innerHTML = "Level: 14";
                    document.getElementById("antworten").innerHTML = "</div>Ja<div></div>Nein<div>";
                }
                if(level == 11)
                {
                    artyom.say("Alles klar, melde dich falls ich etwas für dich tun kann");
                    level = 0;
                    document.getElementById("level").innerHTML = "Ende";
                    document.getElementById("antworten").innerHTML = "";
                }
                if(level == 10)
                {
                    artyom.say("Möchtest du weitere Vorschläge?");
                    level = 11;
                    document.getElementById("level").innerHTML = "Level: 11";
                    document.getElementById("antworten").innerHTML = "</div>Ja<div></div>Nein<div>";
                }
                if(level == 8)
                {
                    artyom.say("An dieser Stelle würden nun weitere Fragen folgen, um die Geschenke weiter zu filtern. Stattdessen werden nun direkt 3 Artikel präsentiert.");
                    artyom.say("Ich habe einige Artikel gefunden und werde dir die drei passendsten nun Präsentieren. Artikel 1, Artikel 2 und Artikel 3 . War etwas für deine " + person + " dabei?");
                    level = 10;
                    document.getElementById("level").innerHTML = "Level: 10";
                    document.getElementById("antworten").innerHTML = "</div>Ja<div></div>Nein<div>";
                }
                if(level == 7)
                {
                    if (weiblich){
                        artyom.say("Hört sie gerne Musik?");
                    }else{
                        artyom.say("Hört er gerne Musik?");
                    }
                    level = 8;
                    document.getElementById("level").innerHTML = "Level: 8";
                    document.getElementById("antworten").innerHTML = "<div>Ja</div><div>Nein</div><div>Weiß nicht</div>";
                }
                if(level == 6)
                {
                    if (weiblich){
                        artyom.say("Treibt sie gerne Sport?");
                    }else{
                        artyom.say("Treibt er gerne Sport?");
                    }
                    level = 7;
                    document.getElementById("level").innerHTML = "Level: 7";
                    document.getElementById("antworten").innerHTML = "<div>Ja</div><div>Nein</div><div>Weiß nicht</div>";
                }
                if(level == 1)
                {
                    artyom.say("Alles klar, melde dich falls ich etwas für dich tun kann");
                    level = 0;
                    document.getElementById("level").innerHTML = "Ende";
                    document.getElementById("antworten").innerHTML = "";
                }
            }
        },
        {
            indexes: ["Für meine *"],
            smart: true,
            action: function(i, wildcard)
            {
                if(level == 2)
                {
                    weiblich = true;
                    person = wildcard;
                    artyom.say("Okay, wie alt ist deine " + wildcard + "?");
                    document.getElementById("level").innerHTML = "Level: 3";
                    document.getElementById("antworten").innerHTML = "</div>Sie/Er ist...<div>";
                    level = 3;
                }
            }
        },
        {
            indexes: ["Für meinen *", "Für mein *"],
            smart: true,
            action: function(i, wildcard)
            {
                if(level == 2)
                {
                    weiblich = false;
                    person = wildcard;
                    artyom.say("Okay, wie alt ist dein " + wildcard + "?");
                    document.getElementById("level").innerHTML = "Level: 3";
                    document.getElementById("antworten").innerHTML = "</div>Sie/Er ist...<div>";
                    level = 3;
                }
            }
        },
        {
            indexes: ["Sie ist *", "Er ist *", "Sie ist * Jahre alt", "Er ist * Jahre alt"],
            smart: true,
            action: function(i, wildcard)
            {
                if(level == 3)
                {
                    alter = wildcard;
                    if(weiblich){
                        artyom.say(alter +" ,wow, dafür hat sie sich aber gut gehalten. Ich werde die Suche dementsprechend anpassen! Wie viel soll das Geschenk mindestens kosten?");
                    }else{
                        artyom.say(alter +" ,wow, dafür hat er sich aber gut gehalten. Ich werde die Suche dementsprechend anpassen! Wie viel soll das Geschenk mindestens kosten?");
                    }
                    document.getElementById("level").innerHTML = "Level: 4";
                    document.getElementById("antworten").innerHTML = "</div>...€<div>";
                    level = 4;
                }
            }
        },
        {
            indexes: ["* €"],
            smart: true,
            action: function(i, wildcard)
            {
                if(level == 5)
                {
                    preisspanneMax = wildcard;
                    if(weiblich){
                        artyom.say("Ich passe die Suche an. Es werden Geschenke zwischen "+preisspanneMin+" und " + preisspanneMax + " Euro gesucht. Nun zur nächsten Frage. Liest deine " + person + "gerne?")
                    }else{
                        artyom.say("Ich passe die Suche an. Es werden Geschenke zwischen "+preisspanneMin+" und " + preisspanneMax + " Euro gesucht. Nun zur nächsten Frage. Liest dein " + person + "gerne?")
                    }
                    document.getElementById("level").innerHTML = "Level: 6";
                    document.getElementById("antworten").innerHTML = "<div>Ja</div><div>Nein</div><div>Weiß nicht</div>";
                    level = 6;
                }
                if(level == 4)
                {
                    preisspanneMin = wildcard;
                    artyom.say("Und wie viel darf es maximal kosten?")
                    level = 5;
                    document.getElementById("level").innerHTML = "Level: 5";
                    document.getElementById("antworten").innerHTML = "</div>...€<div>";
                }
            }
        },
        {
            indexes: ["Artikel *"],
            smart: true,
            action: function(i, wildcard)
            {
                if(level == 12)
                {
                    artyom.say("Alles klar, ich packe Artikel " + wildcard + " in deinen Warenkorb. Benötigst du noch weitere Geschenke?");
                    level = 13;
                    document.getElementById("level").innerHTML = "Level: 13";
                    document.getElementById("antworten").innerHTML = "</div>Ja<div></div>Nein<div>";
                }
            }
        }
    ];

    function startContinuousArtyom() 
    {
        artyom.fatality();
        setTimeout(function () 
        {
            artyom.initialize(
            {
                lang: "de-DE",
                continuous: true,
                listen: true,
                interimResults: true,
                debug: true
            }).then(function () 
            {
                console.log("Readyy!");  // loader einbauen
                document.getElementById("button").innerHTML = '<input id="start" type="button" value="Starten"/>';
                document.getElementById("start").onclick = greeting;
            });
        }, 5000);
    }
    startContinuousArtyom();

    function greeting() 
    {
        artyom.say("Hallo, darf ich dir bei deiner Geschenksuche behilflich sein?");
        level = 1;
        document.getElementById("level").innerHTML = "Level: 1";
        document.getElementById("antworten").innerHTML = "</div>Ja<div></div>Nein<div>";
    }

    artyom.addCommands(commands);  

});
//# sourceMappingURL=playgroud-artyom-script.js.map