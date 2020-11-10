import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import MainContentButton from "../editorButtons/mainContent";

let nTimer;
class ControlledEditor extends Component {
  constructor(props) {
    super(props);
    const html = this.props.htmlIns;
    const contentBlock = htmlToDraft(html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      this.state = {
        editorState,
      };
    }
  }

  onEditorStateChange: Function = (editorState) => {
    this.setState({
      editorState,
    });
    if(nTimer){clearTimeout(nTimer);}
    nTimer = setTimeout(async () => {
      const content = draftToHtml(convertToRaw(editorState.getCurrentContent()));
      const count = EditorState.createWithContent(ContentState.createFromBlockArray(htmlToDraft(content.replace( /<blockquote>(.*)<\/blockquote>/g , "" )).contentBlocks)).getCurrentContent().getPlainText().length
      this.props.change(content, count)
    }, 500);
  };

  render() {
    const { editorState } = this.state;
    return (
      <>
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={this.onEditorStateChange}
          toolbarCustomButtons={[<MainContentButton musicName={this.props.musicName} artist={this.props.artist}/>]}
        />
      </>
    )
  }
}


export default ControlledEditor;