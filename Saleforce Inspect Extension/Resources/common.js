const PREFIX = "SF Inspect";

const root = this;

function print(messge) {
    console.log(PREFIX + ": ", messge);
}

function error(message) {
    console.error(PREFIX + ": ", messge);
}

function isSandbox() {
    try {
        return window.location.href.matches(/.*(\.sandbox\.).*/) != null;
    } catch(err) {
        console.error(err);
    }
    return false;
}

print('Loaded common.js');
