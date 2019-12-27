import ReactDOM from "react-dom";
import React from "react";
import Output from "editorjs-react-renderer";

const Post = () => {
  const data = {
    time: 1564767102436,
    blocks: [
      {
        type: "header",
        data: {
          level: 4,
          text: "Editor.js React Renderer"
        }
      },
      {
        type: "image",
        data: {
          file: {
            url:
              "https://cdn1.imggmi.com/uploads/2019/8/24/fdbf3465641e401ebe0ec58d278656d1-full.jpg"
          },
          caption: "Test Caption",
          withBorder: false,
          stretched: false,
          withBackground: false
        }
      },
      {
        type: "paragraph",
        data: {
          text:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque accusantium veritatis dolorum cum amet! Ipsa ullam nisi, dolor explicabo ut nobis repudiandae saepe illo error facilis consectetur, quisquam assumenda dolorum."
        }
      },
      {
        type: "quote",
        data: {
          text:
            '&nbsp;<b>Lorem</b>&nbsp; ipsum dolor sit amet <mark class="cdx-marker">consectetur</mark> adipisicing elit. Doloremque accusantium veritatis dolorum cum amet! Ipsa ullam nisi, dolor explicabo ut nobis repudiandae saepe illo error facilis consectetur, quisquam assumenda dolorum.',
          caption: "Anonymous",
          alignment: "left"
        }
      },
      {
        type: "table",
        data: {
          content: [
            ["Name", "Age", "Position", "SSN"],
            [
              "Jack&nbsp;",
              "<strong>51</strong>",
              "All trades",
              "654654414131333"
            ],
            [
              "John Doe",
              "<strong>32</strong>",
              "Senior Consultant",
              "0002145465145641"
            ]
          ]
        }
      },
      {
        type: "warning",
        data: {
          message: "This is a warning!",
          title: ""
        }
      },
      {
        type: "list",
        data: {
          items: ["<i>Item one</i>", "Another item", "<strong>Item 3</strong>"],
          style: "ordered"
        }
      }
    ],
    version: "2.14.0"
  };
  return <section>{Output(data)}</section>;
};

ReactDOM.render(<Post />, document.getElementById("root"));
