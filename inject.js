async function writeToClip(htmlElement) {
    let clipboardItems = [];
    clipboardItems.push(htmlElement.textContent);
    await navigator.clipboard.writeText(clipboardItems);
}

async function copyFromClip(pasteToTextArea) {
    pasteToTextArea.value = await navigator.clipboard.readText();
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
            writeToClip(best);

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
