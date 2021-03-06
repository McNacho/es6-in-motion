import * as li from "./listItems";
import Input from "./input";
import {TextSpan} from "./span";

const flavorList = new UnorderedList();
const flavors = ["Chocolate", "Vanilla", "Strawberry", "Banana", "Coconut"];
for (const flavor of flavors) {
  const item = new li.ListItem()
    .addChild(new Input().setType("checkbox"))
    .addChild(new TextSpan(flavor));

  flavorList.addListItem(item);
}

const availability = new UnorderedList();
const slots = ["Monday at 5PM", "Tuesday at 10PM", "Friday at 8AM"];
for (const slot of slots) {
  const item = new li.TextListItem(slot);
  availability.addListItem(item);
}
const container = new Div()
  .addChild(TextSpan.from("Welcome to the annual employee survey!"))
  .addChild(new Div()
    .addClass("question")
    .addChild(new TextSpan("What is your favorite flavor?"))
    .addChild(flavorList))
  .addChild(new TextSpan("Please print and return this survey to the office at one of the following times:"))
  .addChild(new Div()
    .addChild(availability));

const content = document.getElementById("content");
content.innerHTML = container
  .render();

function Div() {
  this.children = [];
  this.classes = [];

  this.addChild = function (element) {
    this.children.push(element);
    return this;
  };

  this.addClass = function (cssClass) {
    this.classes.push(cssClass);
    return this;
  };

  this.render = function () {
    const childrenHtml = this.children
      .map(c => c.render())
      .join("");

    const cssClasses = this.classes.join(" ");

    return `<div class="${cssClasses}">${childrenHtml}</div>`
  };
}

function UnorderedList() {
  const listItems = [];

  this.addListItem = function (listItem) {
    listItems.push(listItem);
    return this;
  };

  this.render = function () {
    const items = listItems
      .map(i => i.render())
      .join("");
    return `
<ul>
   ${items}
</ul>
`;
  };
}

