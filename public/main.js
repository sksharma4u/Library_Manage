console.log("haa ma he hoon")

function getOption() {
    console.log("haa ma he hoon")
    element = document.querySelector('#mybooks');
    output = element.value;
    console.log(output);
    localStorage.setItem("output", Fantasy);
    document.querySelector('.display').textContent = output;
}