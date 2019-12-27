import ReactDOM from "react-dom";
import React, { useState, useEffect } from "react";
import rangy from "rangy/lib/rangy-serializer";
import ReactHtmlParser from "react-html-parser";
import "./index.css";
import { article } from "./article";
import { ToolTip } from "./tooltip";
import {
  getCurrentScrollPosition,
  getSafeRanges,
  positionToolTip
} from "./scrollposition";

function Random() {
  const [activeElement, setActiveElement] = useState(null);
  const [lastSelection, setLastSelection] = useState({});
  const [selectedRanges, setSelectedRanges] = useState([]);
  const [toolTip, setToolTip] = useState({ opacity: 0 });
  // const [commentBox, setCommentBox] = useState({ opacity: 0 });

  useEffect(() => {
    window.addEventListener("beforeunload", storeStateToStorage);
  }, []);

  useEffect(() => {
    setTimeout(restoreStateFromStorage, 20);
  }, []);

  
  const onHighlight = () => {
    highlightSelection();
    setToolTip({
      opacity: 0,
      display: "none"
    });
  };

  const onHighlightSelect = e => {
    if (e.target.className === "highlight") {
      setActiveElement(e.target);
      setToolTip(positionToolTip(document.getElementById(e.target.id)));
    }
  };

  const highlightSelection = selection => {
    const userSelectedRanges = selectedRanges;
    if (activeElement) {
      const id = activeElement.id;
      while (document.getElementById(id) != null) {
        const newNode = document.createTextNode(
          document.getElementById(id).innerText
        );
        document
          .getElementById(id)
          .parentNode.replaceChild(newNode, document.getElementById(id));
      }

      let updatedSelectedRanges;

      updatedSelectedRanges = userSelectedRanges.filter(
        range =>
          range.title === article.title &&
          range.id !== parseInt(activeElement.id, 10)
      );

      setToolTip({
        opacity: 0,
        display: "none"
      });
      setSelectedRanges([...updatedSelectedRanges]);
      localStorage.removeItem("CurrentSelectedRanges");
      localStorage.setItem(
        "CurrentSelectedRanges",
        JSON.stringify(selectedRanges)
      );
      console.log(selectedRanges, "sle")
      setActiveElement(null);
    } else {
      let userSelection =
        selection == null ? window.getSelection().getRangeAt(0) : selection;
      let maxId = 1;
      console.log("ysee", userSelectedRanges);
      if (userSelectedRanges.length > 0) {
        let articleRanges = userSelectedRanges.filter(
          i => i.title === article.title
        );
        if (articleRanges.length > 0) {
          articleRanges = articleRanges.sort(i => i.id);
          maxId = articleRanges[0].id + Math.random();
        }
      }

      const serializedSelection = rangy.serializeRange(userSelection, true);
      const safeRanges = getSafeRanges(userSelection);

      for (let safeRange of safeRanges) {
        highlightRange(safeRange, maxId);
      }

      userSelectedRanges.push({
        title: article.title,
        id: maxId,
        range: serializedSelection
      });

      setSelectedRanges(userSelectedRanges);

      return maxId;
    }
  };

  const handleMouseUp = e => {
    if (e.target.className !== "highlight") {
      setTimeout(showToolTip(), 2);
    }
  };

  const showToolTip = () => {
    // let lastSelection = null;

    if (document.getSelection() && document.getSelection().toString() !== "") {
      setLastSelection(document.getSelection().getRangeAt(0));
      setToolTip(positionToolTip(document.getSelection()));
    }
  };

  const highlightRange = (range, id) => {
    const newNode = document.createElement("span");
    newNode.setAttribute("class", "highlight");
    newNode.setAttribute("id", id);
    range.surroundContents(newNode);
  };

  const storeStateToStorage = () => {
    localStorage.setItem(
      "CurrentSelectedRanges",
      JSON.stringify(selectedRanges)
    );
  };

  const restoreStateFromStorage = () => {
    const userSelectedRanges = JSON.parse(
      localStorage.getItem("CurrentSelectedRanges")
    );
    if (userSelectedRanges !== null) {
      const articleRanges = userSelectedRanges.filter(
        i => i.title === article.title
      );
      console.log(articleRanges);
      if (articleRanges !== null) {
        for (let articleRange of articleRanges) {
          articleRange.range = rangy.deserializeRange(articleRange.range);
          highlightSelection(articleRange.range);
        }
      }
    }
  };

  return (
    <div>
      <ToolTip
        toolTipLocStyle={toolTip}
        onHighLight={() => onHighlight()}
        setToolTip={setToolTip}
      />

      <div
        onMouseUp={e => handleMouseUp(e)}
        onClick={e => onHighlightSelect(e)}
      >
        {ReactHtmlParser(article.extract)}
      </div>
    </div>
  );
}

ReactDOM.render(<Random />, document.getElementById("root"));
