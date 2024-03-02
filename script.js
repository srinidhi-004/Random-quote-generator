const Quotetext=document.getElementById("quote");
const authorName=document.getElementById("author");
const quoteButton=document.querySelector("button");
const soundBtn=document.querySelector(".sound");
const copyBtn=document.querySelector(".copy");
const shareBtn=document.querySelector(".share");

const getNewQuote = async () =>
{
    //api for quotes
    var url="https://type.fit/api/quotes";    

    // fetch the data from api
    const response=await fetch(url);
    console.log(typeof response);
    
    //convert response to json and store it in quotes array
    const allQuotes = await response.json();

    // Generates a random number between 0 and the length of the quotes array
    const indx = Math.floor(Math.random()*allQuotes.length);

    //Store the quote present at the randomly generated index
    const quote=allQuotes[indx].text;
    
    //Store the author of the respective quote
    const auth=allQuotes[indx].author;

    if(auth==null)
    {
        auth = "Anonymous";
    }
 
    //function to dynamically display the quote and the author
    Quotetext.innerHTML=quote;
  
    authorName.innerHTML="..."+auth;

}

getNewQuote();

// share button
shareBtn.addEventListener("click", event =>{
    // To check if browser support native share api
    if (navigator.share) {
        navigator.share({
            title: 'Quote of the Day',
            text: Quotetext.innerText + '--' + authorName.innerText,
        }).then(()=>console.log("successful share"))
        .catch((error) => console.log("Error sharing", error));
    } 
    else{
        alert("The current Browser does not support the share function. please, share link manually")
    }
});

// audio reading

soundBtn.addEventListener("click", () =>{
    let utterance = new SpeechSynthesisUtterance(Quotetext.innerText + ' by ' + authorName.innerText);
    speechSynthesis.speak(utterance);});

   
 // copy button
    
    copyBtn.addEventListener("click", () =>{
        navigator.clipboard.writeText(Quotetext.innerText + ' __ ' + authorName.innerText)
    
        alert("Quote copied to clipboard.")
    });