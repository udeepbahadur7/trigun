const mySpy = sinon.spy()

function alert(message, callback) {
    callback(message);
}

alert("I'm watching a Sinon course on Pluralsight", mySpy);
expect(mySpy.called).to.be.true;

// // spying on existing function
// const WishList = {
//     addItem: (item) => {
//         return append(item, items);
//     },
//     removeItem: (item) => {
//         return reject(item, items);
//     }
// }

// const addItemSpy = sinon.spy(WishList, 'addItem');