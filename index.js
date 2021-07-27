var TelegramBot = require('node-telegram-bot-api'),
// Be sure to replace YOUR_BOT_TOKEN with your actual bot token on this line.
telegram = new TelegramBot("YOUR_BOT_TOKEN", { polling: true });

var whiteSpace = '😐';
var encodedFlag = '👆👇👈👉';

var alpha = {
	'0': '☹️☹️☹️☹️☹️☹️☹️☹️',
	'1': '☹️☹️☹️☹️☹️☹️☹️😊',
	'2': '☹️☹️☹️☹️☹️☹️😊☹️',
	'3': '☹️☹️☹️☹️☹️☹️😊😊',
	'4': '☹️☹️☹️☹️☹️😊☹️☹️',
	'5': '☹️☹️☹️☹️☹️😊☹️😊',
	'6': '☹️☹️☹️☹️☹️😊😊☹️',
	'7': '☹️☹️☹️☹️☹️😊😊😊',
	'8': '☹️☹️☹️☹️😊☹️☹️☹️',
	'9': '☹️☹️☹️☹️😊☹️☹️😊',
	'A': '☹️😊☹️☹️☹️☹️☹️😊',
	'B': '☹️😊☹️☹️☹️☹️😊☹️',
	'C': '☹️😊☹️☹️☹️☹️😊😊',
	'D': '☹️😊☹️☹️☹️😊☹️☹️',
	'E': '☹️😊☹️☹️☹️😊☹️😊',
	'F': '☹️😊☹️☹️☹️😊😊☹️',
	'G': '☹️😊☹️☹️☹️😊😊😊',
	'H': '☹️😊☹️☹️😊☹️☹️☹️',
	'I': '☹️😊☹️☹️😊☹️☹️😊',
	'J': '☹️😊☹️☹️😊☹️😊☹️',
	'K': '☹️😊☹️☹️😊☹️😊😊',
	'L': '☹️😊☹️☹️😊😊☹️☹️',
	'M': '☹️😊☹️☹️😊😊☹️😊',
	'N': '☹️😊☹️☹️😊😊😊☹️',
	'O': '☹️😊☹️☹️😊😊😊😊',
	'P': '☹️😊☹️😊☹️☹️☹️☹️',
	'Q': '☹️😊☹️😊☹️☹️☹️😊',
	'R': '☹️😊☹️😊☹️☹️😊☹️',
	'S': '☹️😊☹️😊☹️☹️😊😊',
	'T': '☹️😊☹️😊☹️😊☹️☹️',
	'U': '☹️😊☹️😊☹️😊☹️😊',
	'V': '☹️😊☹️😊☹️😊😊☹️',
	'W': '☹️😊☹️😊☹️😊😊😊',
	'X': '☹️😊☹️😊😊☹️☹️☹️',
	'Y': '☹️😊☹️😊😊☹️☹️😊',
	'Z': '☹️😊☹️😊😊☹️😊☹️',
	'a': '☹️😊😊☹️☹️☹️☹️😊',
	'b': '☹️😊😊☹️☹️☹️😊☹️',
	'c': '☹️😊😊☹️☹️☹️😊😊',
	'd': '☹️😊😊☹️☹️😊☹️☹️',
	'e': '☹️😊😊☹️☹️😊☹️😊',
	'f': '☹️😊😊☹️☹️😊😊☹️',
	'g': '☹️😊😊☹️☹️😊😊😊',
	'h': '☹️😊😊☹️😊☹️☹️☹️',
	'i': '☹️😊😊☹️😊☹️☹️😊',
	'j': '☹️😊😊☹️😊☹️😊☹️',
	'k': '☹️😊😊☹️😊☹️😊😊',
	'l': '☹️😊😊☹️😊😊☹️☹️',
	'm': '☹️😊😊☹️😊😊☹️😊',
	'n': '☹️😊😊☹️😊😊😊☹️',
	'o': '☹️😊😊☹️😊😊😊😊',
	'p': '☹️😊😊😊☹️☹️☹️☹️',
	'q': '☹️😊😊😊☹️☹️☹️😊',
	'r': '☹️😊😊😊☹️☹️😊☹️',
	's': '☹️😊😊😊☹️☹️😊😊',
	't': '☹️😊😊😊☹️😊☹️☹️',
	'u': '☹️😊😊😊☹️😊☹️😊',
	'v': '☹️😊😊😊☹️😊😊☹️',
	'w': '☹️😊😊😊☹️😊😊😊',
	'x': '☹️😊😊😊😊☹️☹️☹️',
	'y': '☹️😊😊😊😊☹️☹️😊',
	'z': '☹️😊😊😊😊☹️😊☹️'
};



telegram.on("text", (message) => {
    
    var bin;

    if(!isEncoded(message.text))
        bin = encode(message.text);
    else 
        bin = decode(message.text);

    telegram.sendMessage(message.chat.id, bin);


});

function isEncoded(text){
    var flag = "";
    for(var i=0; i<encodedFlag.length; i++)
        flag += text[i%text.length];
    
    return flag == encodedFlag;
}

function encode(texts){
    var encoded = encodedFlag;
    for(text of texts){
        if(alpha[text] != null )
            encoded += alpha[text]+' ';
        else if(text == ' ')
            encoded += whiteSpace+' ';
        else 
            encoded += text+' ';
    }
        

    return encoded;
}



function decode(texts){
	texts = removeFlag(texts);
	var splits = texts.split(' ');
	splits.pop();//remoiving last null
	

	var decoded = "";

	for(split of splits)
		if(split == whiteSpace && split.length == 2)
			decoded += ' ';
		else if(split.length == 1)
			decoded += split;
		else 
			decoded += getKey(split);
	
	
	return decoded;
}


function getKey(text){
    return Object.keys(alpha).find(key => alpha[key] === text);
}

function removeFlag(text){
	var noFLag = "";
	for(var i = 8; i<text.length; i++)
		noFLag+= text[i];
	return noFLag;

}
