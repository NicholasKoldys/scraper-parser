async function writeToClip(preFormattedString) {
    let clipboardItems = [];
    clipboardItems.push(preFormattedString);
    await navigator.clipboard.writeText(clipboardItems);
}

async function copyFromClip(textAreaToPasteTo) {
    textAreaToPasteTo.value = await navigator.clipboard.readText();
}

String.prototype.replaceAt = function(index, replacement) {
    return this.replace(/./g, (c, i) => i == index ? replacement : c);
    // return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

function specialFormatStringWSpacing(stringInput, stringArrSpecial) {

    //.replace(/[\n\r]+|[\s]{2,}/g, ' ')
    let mainStr = stringInput.trim();

    for(let str of stringArrSpecial) {
        let regex = new RegExp(str);
        let found = mainStr.match(regex);

        for(let match of found) {
            if(match != undefined) {
                /* I like regex but why wouldnt the match contain the index???
                    It took me forever to figure out */
                    mainStr = mainStr.replaceAt(found.index - 1, "\n");
                    // mainStr = mainStr.replaceAt(found.index + 1, "\n\n\n");
            }
        }     
    }

    return "\n\n-----------------------------------------------------\n" 
        + mainStr 
        + "\n\n-----------------------------------------------------\n";
}

//todo add parameter to search for
function pullText() { 
    var headings = document.evaluate("//table[contains(., 'Main Page')]", document, null, XPathResult.ANY_TYPE, null );

    let good;

    while(true) {
        let head = headings.iterateNext();
        if(head == null) {
            break;
        }
        good = head;
        console.log(head);
    }

    //todo replace
    var best = good.nextSibling.nextSibling.nextSibling;

    document.body.innerHTML = "";

    var helperdiv = document.createElement("div");
    document.body.appendChild(helperdiv);
    helperdiv.contentEditable = true;
    helperdiv.appendChild(best);

    try {
        if(navigator.clipboard) {

            writeToClip( 
                specialFormatStringWSpacing( 
                    best.textContent, 
                    ["/?", "Article ID", "Article Created"] 
                )
            );

            var textArea = document.createElement("textarea");
            textArea.rows = "30";
            textArea.cols = "80";

            copyFromClip(textArea);

            document.body.appendChild(textArea);
            textArea.focus;
        }
    } catch(error) {
        console.error("browser unable to utilize copy/paste clipboard.." + error);
    }
}


/* Function Runs */
{
    pullText();
}
