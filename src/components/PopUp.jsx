import React from "react";
import CancelPresentationOutlinedIcon from "@material-ui/icons/CancelPresentationOutlined";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useDispatch, useSelector } from "react-redux";
import {
  changePopUpInfoTitle,
  changePopUpInfoDescription,
} from "../actions/changePopUpInfo";

function PopUp(props) {
  const newText = useSelector((state) => state.popUpInfo);
  const dispatch = useDispatch();

  function handleInputChange(event) {
    const newInputText = event.target.value;

    dispatch(changePopUpInfoTitle(newInputText));
  }

  function handleCKEditorChange(event, ckEditor) {
    const newDescription = ckEditor.getData();

    dispatch(changePopUpInfoDescription(newDescription));
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
          <input
            id="title-input"
            type="text"
            value={newText.title}
            placeholder="Add title"
            style={{ width: "50%" }}
            onChange={handleInputChange}
            category="title"
          ></input>
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
