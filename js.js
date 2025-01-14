const HtmlElement = function (type, textContent) {
    this.id = HtmlElement.prototype.count++;
    this.type = type
    this.textContent = textContent
    if(new.target)
        throw new Error("error");
        
}

HtmlElement.prototype.count = 0;

HtmlElement.prototype.render = function () {

    const htmlElement = document.createElement(this.type)
    htmlElement.textContent = this.textContent
    htmlElement.id = "elem" + this.id
    return htmlElement
}


const ImageElement = function (src, alt) {
    HtmlElement.call(this, "img", "")
    this.src = src
    this.alt = alt
}

ImageElement.prototype = Object.create(HtmlElement.prototype)

ImageElement.prototype.constructor = ImageElement

ImageElement.prototype.render = function () {
    const imageElement = HtmlElement.prototype.render.call(this);
    imageElement.src = this.src
    imageElement.alt = this.alt
    return imageElement
}

const SelectElement = function (myOption) {
    HtmlElement.call(this, "select", "")
    this.myOption = myOption
}
SelectElement.prototype = Object.create(HtmlElement.prototype)

SelectElement.prototype.constructor = ImageElement

SelectElement.prototype.render = function () {
    const selectElement = HtmlElement.prototype.render.call(this);
    let options = ""
    for (let i = 0; i < this.myOption.length; i++) {
        options += "<option>" + this.myOption[i] + "</option>"
    }
    selectElement.innerHTML = options
    return selectElement
}
function addElement() {
    let type = document.querySelector(".type").value
    let text = document.querySelector(".text").value
    if (!type) {
        alert("אנא השלם סוג.");
        return;
    }
    try {
       const elementHtml = new HtmlElement(type, text)
       let elem = elementHtml.render()
       document.body.appendChild(elem) 
    } catch (Error) {
        alert(Error.message)
    }
    
}
function addImage() {
    let src = document.querySelector(".src").value
    let alt = document.querySelector(".alt").value
    const elementImage = new ImageElement(src, alt)
    let elem = elementImage.render()
    document.body.appendChild(elem)
}
function addSelect() {
    debugger
    let list = document.querySelector(".list").value.split(",")
    const elementSelect = new SelectElement(list)
    let elem=elementSelect.render()
    document.body.appendChild(elem)
}

