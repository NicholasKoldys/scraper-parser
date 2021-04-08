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

function simplifiedContentFormat(textContent) {

    let testStr = new String;
    let formattedContent = new String;
    let stringLineArray = new Array;

    let mark = 0;
    while(mark <= textContent.length - 1) {
        let i = textContent.substring(mark, textContent.length - 1).indexOf('\n') + 1;
        if(i == 0) {
            break;
        }
        stringLineArray.push( textContent.substring( mark, mark + i ).trim() ); //i is up to but not including so to include + 1;
        mark += i;
    }

    let newLineCount = 0;
    
    for(ele of stringLineArray) {
        //.replace(/[\n\r]+|[\s]{2,}/g, ' ')        
        if(ele.indexOf('\n') != 0) {
            if(ele != '') {
                formattedContent += ele + '\n';
                newLineCount = 0;
            } else if( newLineCount < 2) { // only allow 2 newlines between text packages.
                formattedContent += '\n';
                newLineCount++;
            }
        }
    }

    return formattedContent;
}

//todo add parameter to search for
/**
 * @param {String} searchString - must supply value if searching byClass or byId.
 * @param {Boolean} isSearchableByClass - if true use searchString for classSearch
 * @param {Boolean} isSearchableById - if true use searchString for idSearch
 * @param {Boolean} isSearchableByTerms - if false copy as a HTML element
 */
function pullText(searchString, isSearchableByClass, isSearchableById, isSearchableByTerms, enableHtmlOutput, enableSearchDisplay) {

    // replace this evaluate with a smart eval
    // var headings = document.evaluate(
    //     ".//table[contains(., 'Main Page')]", // ".//" starts from indicated node stated below, "//" will just search from the root
    //     document.body, //Just search the body
    //     null, 
    //     XPathResult.ANY_TYPE, 
    //     null 
    // );
    var headings;

    if(isSearchableByClass) {
        headings = document.getElementsByClassName(searchString);
    }

    let good;

    if(headings != null) {

        good = headings[0];

        // USED IN DOCUMENT XPATH EVALUATION
        // while(true) {
        //     let head = headings.iterateNext();
        //     if(head == null) {
        //         break;
        //     }
        //     good = head;
        //     console.log(head);
        // }
    }

    //todo replace, this was just used to find an element without a class
    var best;

    if(good != null) {

        best = good;

        // USED IN DOCUMENT XPATH EVALUATION
        // if(good.nextSibling != null) {
        //     if(good.nextSibling.nextSibling != null) {
        //         if(good.nextSibling.nextSibling.nextSibling != null) {
        //             best = good.nextSibling.nextSibling.nextSibling;
        //         }
        //     }
        // }
    }

    //Remove html structure and create new div with the "best" element's content (structure intact)
    //This was used for a quick way to see what was copied.
    if(best != null) {
        if(enableSearchDisplay) {
            document.body.innerHTML = "";
        }
        var helperdiv = document.createElement("div");
        document.body.appendChild(helperdiv);
        helperdiv.contentEditable = true;
        helperdiv.appendChild(best.cloneNode(true)); //must clone to avoid cutting element from document.
    
        try {
            if(navigator.clipboard && best != null) {

                if(isSearchableByTerms) {
                    writeToClip( 
                        specialFormatStringWSpacing( 
                            best.textContent, 
                            ["/?", "Article ID", "Article Created"] 
                        )
                    );
                } else if(enableHtmlOutput) {
                    writeToClip(helperdiv.innerHTML);
                } else {
                    writeToClip(
                        simplifiedContentFormat( best.textContent )
                    );
                }

                
                /*//Create textArea as it can be reliably edited and copied from.
                //Also has the focus action.
                */
                var textArea = document.createElement("textarea");
                textArea.rows = "30";
                textArea.cols = "80";

                copyFromClip(textArea);

                document.body.appendChild(textArea);

                if(!enableSearchDisplay) {
                    helperdiv.hidden = true;
                    textArea.hidden = true;
                }
            }
        } catch(error) {
            console.error("browser unable to utilize copy/paste clipboard.." + error);
        }
    }
}


/* Function Runs */
{
    pullText( "BackTexto", true, false, false, false, false);
}
