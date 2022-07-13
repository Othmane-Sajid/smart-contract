

function isMetaMaskThere(){
    const {ethereum} = window;
    console.log( Boolean(ethereum && ethereum.isMetaMask));
};


