import React, { useState } from "react";
import CancelPresentationOutlinedIcon from "@material-ui/icons/CancelPresentationOutlined";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import InputBox from "./InputBox";

function PopUp(props) {
  const [newText, setNewText] = useState({
    title: props.title,
    description: props.description,
  });

  function handleInputChange(event) {
    const newInputText = event.target.value;
    setNewText((prevValue) => {
      return { title: newInputText, description: prevValue.description };
    });
  }

  function handleCKEditorChange(event, ckEditor) {
    const newDescription = ckEditor.getData();
    setNewText((prevValue) => {
      return { title: prevValue.title, description: newDescription };
    });
  }

  function handleCancelClick() {
    props.toHide();
  }

  function handleSaveClick() {
    props.toEdit(props.id, newText);
    props.toHide();
  }

  return (
    <div id="popup-container">
      <div id="popup-subcontainer">
        <CancelPresentationOutlinedIcon
          id="cancel-button"
          onClick={handleCancelClick}
        />
        <div className="input-container">
          <InputBox
            id="title-input"
            type="text"
            value={newText.title}
            placeholder="Add title"
            style={{ width: "50%" }}
            onChange={handleInputChange}
            category="title"
          ></InputBox>
          <div style={{ width: "97%" }}>
            <CKEditor
              editor={ClassicEditor}
              data={newText.description}
              onChange={handleCKEditorChange}
            />
          </div>
        </div>
        <SaveOutlinedIcon
          onClick={handleSaveClick}
          style={{ fontSize: "38px" }}
          id="save-button"
        />
      </div>
    </div>
  );
}

export default PopUp;
