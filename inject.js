async function writeToClip(content) {
    let clipboardItems = [];
    clipboardItems.push(content);
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

    return "\n-----------------------------------------------------\n" 
        + mainStr 
        + "\n\n-----------------------------------------------------\n\n\n";
}

//todo add parameter to search for
/**
 * 
 * @param {Boolean} isPlainText - if false copy as a HTML element
 */
function pullText(isPlainText) {

    //replace this evaluate with a smart eval
    var headings = document.evaluate("//table[contains(., 'Main Page')]", document, null, XPathResult.ANY_TYPE, null );

    let good;

    if(headings != null) {
        while(true) {
            let head = headings.iterateNext();
            if(head == null) {
                break;
            }
            good = head;
            console.log(head);
        }
    }

    //todo replace, this was just used to find an element without a class
    var best;

    if(good != null) {
        if(good.nextSibling != null) {
            if(good.nextSibling.nextSibling != null) {
                if(good.nextSibling.nextSibling.nextSibling != null) {
                    best = good.nextSibling.nextSibling.nextSibling;
                }
            }
        }
    }

    //Remove html structure and create new div with the "best" element's content
    //This was used for a quick way to see what was copied.

    if(best != null) {
        document.body.innerHTML = "";

        var helperdiv = document.createElement("div");
        document.body.appendChild(helperdiv);
        helperdiv.contentEditable = true;
        helperdiv.appendChild(best);
    }

    try {
        if(navigator.clipboard && best != null) {

            if(isPlainText) {
                writeToClip( 
                    specialFormatStringWSpacing( 
                        best.textContent, 
                        ["/?", "Article ID", "Article Created"] 
                    )
                );
            } else {
                writeToClip(helperdiv.innerHTML);
            }

            
            /*//Create textArea as it can be reliably edited and copied from.
            //Also has the focus action.
            */
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
    pullText(true);
}
