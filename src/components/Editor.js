import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState, insertNewBlock } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import MainContentButton from "./editorButtons/mainContent";

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
    this.props.change(draftToHtml(convertToRaw(editorState.getCurrentContent())))
  };

  myBlockRenderer = (contentBlock) =>{
    const type = contentBlock.getType();
    switch (type) {
      case 'Interpretation':
        return {
          component: this.InterpretationBlock,
        };
    }
  }

  InterpretationBlock= () => {
    return (
      <div class="box1"><span class="box1-title">解釈</span><p>ここに解釈を執筆</p></div>
    );
  }

  render() {
    return (
      <>
        {<Editor
          editorState={this.state.editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={this.onEditorStateChange}
          toolbarCustomButtons={[<MainContentButton musicName={this.props.musicName} artist={this.props.artist}/>]}
          blockRendererFn={this.myBlockRenderer}
        />}
      </>
    )
  }
}


export default ControlledEditor;